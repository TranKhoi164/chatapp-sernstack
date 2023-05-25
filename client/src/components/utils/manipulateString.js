export const queryUrlServer = (queryObj = {}) => {
  let res = '?'
  let temp = {...queryObj}
  for (let el in temp) {
    if (temp[el]) {
      res += `${el}=${temp[el]}&`
    }
  }
  return res
}

export const cutString = (str, num) => {
  return String(str).length > num ? str.substring(0, num)  + '...' : str
}