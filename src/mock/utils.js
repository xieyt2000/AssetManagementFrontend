export function getReturnFunc (message) {
  return function () {
    return {
      data: message
    }
  }
}
