let updateRequested = false

function update(cb) {
  updateRequested = !cb()
}

export default function requestUpdate(cb) {
  if (!updateRequested) {
    updateRequested = true
    requestAnimationFrame(() => update(cb))
  }
}
