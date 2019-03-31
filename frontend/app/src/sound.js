const audioContext = new AudioContext()
const pitchRatio = 1.2,
  overlapRatio = 0.5,
  grainSize = 512

let pitchShifterProcessor

const linearInterpolation = function(a, b, t) {
  return a + (b - a) * t
}

const hannWindow = function(length) {
  const window = new Float32Array(length)
  for (let i = 0; i < length; i++) {
    window[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (length - 1)))
  }
  return window
}

export const initAudio = function(stream) {
  const source = audioContext.createMediaStreamSource(stream)
  // audioContext.decodeAudioData(
  //   stream, // TODO
  //   (buffer) => {
  //     if (!buffer) {
  //       console.error('Error decoding file data')
  //       return
  //     }

  //     const x = audioContext.createBufferSource()
  //     x.buffer = buffer
  //     x.loop = true
  //     x.connect(pitchShifterProcessor)
  //     x.start(0)
  //   },
  //   (error) => {
  //     console.error('decodeAudioData error', error)
  //   }
  // )
  source.connect(pitchShifterProcessor)

  if (pitchShifterProcessor) {
    pitchShifterProcessor.disconnect()
  }

  if (audioContext.createScriptProcessor) {
    pitchShifterProcessor = audioContext.createScriptProcessor(grainSize, 1, 1)
  } else if (audioContext.createJavaScriptNode) {
    pitchShifterProcessor = audioContext.createJavaScriptNode(grainSize, 1, 1)
  }

  pitchShifterProcessor.buffer = new Float32Array(grainSize * 2)
  pitchShifterProcessor.grainWindow = hannWindow(grainSize)
  pitchShifterProcessor.onaudioprocess = function(event) {
    const inputData = event.inputBuffer.getChannelData(0)
    const outputData = event.outputBuffer.getChannelData(0)

    for (let i = 0; i < inputData.length; i++) {
      // Apply the window to the input buffer
      inputData[i] *= this.grainWindow[i]

      // Shift half of the buffer
      this.buffer[i] = this.buffer[i + grainSize]

      // Empty the buffer tail
      this.buffer[i + grainSize] = 0.0
    }

    // Calculate the pitch shifted grain re-sampling and looping the input
    const grainData = new Float32Array(grainSize * 2)
    for (let i = 0, j = 0.0; i < grainSize; i++, j += pitchRatio) {
      const index = Math.floor(j) % grainSize
      const a = inputData[index]
      const b = inputData[(index + 1) % grainSize]
      grainData[i] += linearInterpolation(a, b, j % 1.0) * this.grainWindow[i]
    }

    // Copy the grain multiple times overlapping it
    for (let i = 0; i < grainSize; i += Math.round(grainSize * (1 - overlapRatio))) {
      for (let j = 0; j <= grainSize; j++) {
        this.buffer[i + j] += grainData[j]
      }
    }

    // Output the first half of the buffer
    for (let i = 0; i < grainSize; i++) {
      outputData[i] = this.buffer[i]
    }
  }

  // pitchShifterProcessor.connect(spectrumAudioAnalyser);
  // pitchShifterProcessor.connect(sonogramAudioAnalyser);
  pitchShifterProcessor.connect(audioContext.destination)
}
