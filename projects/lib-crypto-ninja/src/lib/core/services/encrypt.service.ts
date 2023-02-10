import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncryptService {

  secretKey: string;
  secretSalt: string;
  encryptionSeparator = '<encryption_seperator>';
  constructor(
    @Inject('env') private env: any
    ) {
    this.secretKey = this.env.secretKey;
    this.secretSalt = this.env.secretSalt;
  }


  encryptData(input: any) {
    console.info(input, this.secretKey, this.secretSalt);
  }

  ecryptData(input: any) {
    console.error(input, this.secretKey, this.secretSalt);
  }

  getRandomString() {
    const size = 15;
    const randomBytes = new Uint8Array(size);
    crypto.getRandomValues(randomBytes);
    let randomString = '';
    for (let i = 0; i < size; i++) {
      let randomInt;
      if (randomBytes[i] % 2 === 0) {
        randomInt =
          (randomBytes[i] % ('z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1)) +
          'a'.charCodeAt(0);
      } else {
        randomInt =
          (randomBytes[i] % ('Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1)) +
          'A'.charCodeAt(0);
      }
      randomString += String.fromCharCode(randomInt);
    }
    return randomString;
  }
}
