import STATUS from '../../../utils/asset'
export function getStatusArr () {
  const statusArr = []
  for (const key in STATUS) {
    statusArr.push({ label: STATUS[key], value: STATUS[key] })
  }
  return statusArr
}
