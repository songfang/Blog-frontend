import CryptoJS from 'crypto-js'
import md5 from 'js-md5';

export function get_sign(token, timestamp) {
    const token_md5 = md5.hex(token)
    const sign = CryptoJS.AES.encrypt(timestamp, CryptoJS.enc.Utf8.parse(token_md5), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString()
    return sign
}