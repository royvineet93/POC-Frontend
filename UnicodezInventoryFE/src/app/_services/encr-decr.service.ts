import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { cryptoEncrKey } from '../common/config'

@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {

  constructor() { }

  encryptPassword(password) {
    return CryptoJS.AES.encrypt(password.trim(), cryptoEncrKey).toString();
  }

  decryptPassword(password) {
    return CryptoJS.AES.decrypt(password.trim(), cryptoEncrKey).toString(CryptoJS.enc.Utf8);
  }
}
