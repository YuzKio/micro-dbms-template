/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
const valid_map = {
  'admin': '111111',
  'editor': '123456'
}
export function validUsername(str) {
  return Object.hasOwnProperty.call(valid_map, str)
}

export function validPassword(usn, psw) {
  return valid_map[usn] === psw
}

export const isNum = (rule, value, callback) => {
  const len = /^\d*$/
  if (!len.test(value)) {
    callback(new Error('长度只能为数字'))
  } else {
    callback()
  }
}
