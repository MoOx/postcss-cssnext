const updateRequestedMap = {}
const updateRequestedList = []

function update(cb) {
  // index should be defined from the requestUpdate()
  updateRequestedMap[updateRequestedList.indexOf(cb)] = !cb()
}

export default function requestUpdate(cb) {
  let index = updateRequestedList.indexOf(cb)
  if (index === -1) {
    updateRequestedList.push(cb)
    index = updateRequestedList.indexOf(cb) // === length - 1, I know...
  }

  if (!updateRequestedMap[index]) {
    updateRequestedMap[index] = true
    requestAnimationFrame(() => update(cb))
  }
}
