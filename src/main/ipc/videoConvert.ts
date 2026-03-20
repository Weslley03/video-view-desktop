import { spawn } from 'child_process'
import { ipcMain } from 'electron'
import ffmpeg from 'ffmpeg-static'
import ffprobe from 'ffprobe-static'
import { ConversionOptionsType } from '../../shared/ConversionOptionsType.js'
import { fileURLToPath } from 'url'

const ffmpegPath = (ffmpeg as unknown as string)
  .replace('app.asar', 'app.asar.unpacked')

const ffprobePath = ffprobe.path
  .replace('app.asar', 'app.asar.unpacked')

function timeToSeconds(time: string) {
  const [h, m, s] = time.split(':')
  return (+h * 3600) + (+m * 60) + parseFloat(s)
}

function getVideoDuration(inputPath: string): Promise<number> {
  return new Promise((resolve, reject) => {

    const probe = spawn(ffprobePath as string, [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1',
      inputPath
    ])

    let output = ''

    probe.stdout.on('data', (data) => {
      output += data.toString()
    })

    probe.on('error', (err) => {
      console.error('[ffprobe error]', err)
      reject(err)
    })

    probe.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`ffprobe exited with code ${code}`))
      }

      const duration = parseFloat(output)
      if (Number.isNaN(duration)) {
        return reject(new Error(`invalid duration output: ${output}`))
      }

      resolve(duration)
    })
  })
}

type FormatConfig = {
  buildArgs: (opts: ConversionOptionsType) => string[]
}

export const formatStrategies: Record<string, FormatConfig> = {
  mp4: {
    buildArgs: (opts) => {
      const args = ['-c:v', 'libx264', '-crf', '23', '-preset', 'medium']

      if (opts.includeAudio) {
        args.push('-c:a', 'aac', '-b:a', '128k')
      } else {
        args.push('-an')
      }

      return args
    }
  },

  webm: {
    buildArgs: (opts) => {
      const args = ['-c:v', 'libvpx-vp9', '-crf', '30', '-b:v', '0']

      if (opts.includeAudio) {
        args.push('-c:a', 'libopus', '-b:a', '128k')
      } else {
        args.push('-an')
      }

      return args
    }
  },

  mov: {
    buildArgs: (opts) => {
      const args = ['-c:v', 'prores_ks', '-profile:v', '3']

      if (opts.includeAudio) {
        args.push('-c:a', 'pcm_s16le')
      } else {
        args.push('-an')
      }

      return args
    }
  },

  avi: {
    buildArgs: (opts) => {
      const args = ['-c:v', 'mpeg4']

      if (opts.includeAudio) {
        args.push('-c:a', 'mp3')
      } else {
        args.push('-an')
      }

      return args
    }
  },

  gif: {
    buildArgs: () => {
      return [
        '-vf',
        'fps=10,scale=320:-1:flags=lanczos',
        '-loop',
        '0'
      ]
    }
  },

  wav: {
    buildArgs: () => {
      return [
        '-vn',
        '-c:a',
        'pcm_s16le'
      ]
    }
  },
}

let currentProcess: ReturnType<typeof spawn> | null = null

export function registerConvertHandlers() {
  ipcMain.handle('convert:start', async (event, opts: ConversionOptionsType) => {
    const inputPath = opts.inputPath.startsWith('file://')
      ? fileURLToPath(opts.inputPath)
      : opts.inputPath

    const outputPath = opts.outputPath.startsWith('file://')
      ? fileURLToPath(opts.outputPath)
      : opts.outputPath
  
    const duration = await getVideoDuration(inputPath)

    const args: string[] = ['-y', '-i', inputPath]

    const strategy = formatStrategies[opts.target]

    if (!strategy) {
      throw new Error(`unsupported format: ${opts.target}`)
    }

    args.push(...strategy.buildArgs(opts))

    args.push(opts.outputPath)

    const proc = spawn(ffmpegPath, args)
    currentProcess = proc

    proc.on('error', (err) => {
      currentProcess = null
      console.error('[ffmpeg spawn error]', err)
    })

    proc.stderr.on('data', (data) => {
      const str = data.toString()

      const match = str.match(/time=(\d+:\d+:\d+\.\d+)/)

      if (match) {
        const current = timeToSeconds(match[1])
        const percent = Math.min((current / duration) * 100, 100)

        event.sender.send('convert:progress', {
          percent,
          current,
          duration
        })
      }
    })

    return new Promise((resolve, reject) => {
      proc.on('close', (code) => {
        currentProcess = null
        if (code === 0) resolve(true)
        else reject(new Error('conversion failed or cancelled'))
      })
    })
  })

  ipcMain.handle('convert:cancel', () => {
    if (currentProcess) {
      currentProcess.kill('SIGKILL')
      currentProcess = null
      return true
    }
    return false
  })
}
