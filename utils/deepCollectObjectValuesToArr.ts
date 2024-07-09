export default function deepCollectObjectValuesToArr(obj: object) {
  const resultArr: Array<string> = []

  const checkTypeValueAndPushArr = (value: unknown) => {
    if (typeof value === 'string') {
      resultArr.push(value)
    }
  }

  for (const key in obj) {
    const value = obj[key]
    if (Array.isArray(value)) {
      for (const itemValue of value) {
        checkTypeValueAndPushArr(itemValue)
      }
    } else if (typeof value === 'object') {
      const objValue: object = value
      resultArr.push(...deepCollectObjectValuesToArr(objValue))
    } else {
      checkTypeValueAndPushArr(value)
    }
  }
  return resultArr
}