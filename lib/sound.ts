let ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// Call once on first user interaction to pre-warm the AudioContext
// so there's no initialization delay on the first playTick()
export function warmSound() {
  try {
    const c = getCtx()
    // Play a silent buffer to unlock and warm the context
    const buf = c.createBuffer(1, 1, c.sampleRate)
    const src = c.createBufferSource()
    src.buffer = buf
    src.connect(c.destination)
    src.start()
  } catch {}
}

export function playTick() {
  try {
    const c = getCtx()
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.connect(gain)
    gain.connect(c.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(920, c.currentTime)
    osc.frequency.exponentialRampToValueAtTime(680, c.currentTime + 0.055)
    gain.gain.setValueAtTime(0.055, c.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.055)
    osc.start(c.currentTime)
    osc.stop(c.currentTime + 0.06)
  } catch {}
}

export function playWhoosh() {
  try {
    const c = getCtx()
    const duration = 0.55
    const sampleRate = c.sampleRate
    const bufferSize = Math.floor(sampleRate * duration)
    const buffer = c.createBuffer(1, bufferSize, sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 1.5)
    }
    const source = c.createBufferSource()
    source.buffer = buffer
    const filter = c.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(3200, c.currentTime)
    filter.frequency.exponentialRampToValueAtTime(280, c.currentTime + duration)
    filter.Q.setValueAtTime(0.8, c.currentTime)
    const gain = c.createGain()
    gain.gain.setValueAtTime(0.12, c.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration)
    source.connect(filter)
    filter.connect(gain)
    gain.connect(c.destination)
    source.start()
    source.stop(c.currentTime + duration + 0.05)
  } catch {}
}
