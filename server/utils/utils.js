const createMessage = (name, message) => {
  return {
    name,
    message,
    timestamp: new Date().getTime()
  }
}

module.exports = {
  createMessage
}