import {ServiceKeys as keys} from "../keys/service-keys";
const CryptoJS = require('crypto-js');

export class EncryptDecrypt {

  type: string;

  constructor(type: string) {
    this.type = type;
  }

  Encrypt(text: string) {
    switch (text) {
      case keys.MD5:
        return CryptoJS.MD5(text).toString();
      case keys.AES:
        return CryptoJS.AES.encrypt(text, keys.AES_SECRET_KEY).toString();
      case keys.SHAT_512:
        break;
      default:
        return "this type of  crypt not supported."
    }
  }

}
