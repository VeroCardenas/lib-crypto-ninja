import { Inject, Injectable } from '@angular/core';
import { cipher, util, pkcs5 } from "node-forge";

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
    if (input === null || input === undefined) {
      return input;
    }
    const dataStr = String(input)
    const iv = this.getRandomString();

    try {
      const keyForge = pkcs5.pbkdf2(this.secretKey, this.secretSalt, 256, 32, 'sha256');
      const aesGcm = cipher.createCipher("AES-GCM", keyForge);
      aesGcm.start({
        iv: iv,
        tagLength: 128
      });
      aesGcm.update(util.createBuffer(dataStr, 'utf8'));
      aesGcm.finish();
      const data = aesGcm.output.data;
      const tag = aesGcm.mode.tag.data
      const encodedB64 = util.encode64(data + tag);
      return iv + this.encryptionSeparator + encodedB64;
    } catch (e) {
      console.error(e);
      return input;
    }
  }

  decryptData(input: any) {
    if (input === null || input === undefined || input === '') {
      return input;
    }
    input = String(input)
    const data = input.split(this.encryptionSeparator)[1]
    const iv = input.split(this.encryptionSeparator)[0]

    try {
      const inputDecoded = util.decode64(data)
      const param = inputDecoded.substring(0, inputDecoded.length - 16)
      const tag = inputDecoded.substring(inputDecoded.length - 16)

      const keyForge = pkcs5.pbkdf2(this.secretKey, this.secretSalt, 256, 32, 'sha256');
      const aesGcm = cipher.createCipher("AES-GCM", keyForge);
      aesGcm.start({
        iv: iv,
        tag: util.createBuffer(tag)
      });
      aesGcm.update(util.createBuffer(param));
      aesGcm.finish();
      return aesGcm.output.data;

    } catch (e) {
      console.error(e);
      return null;
    }
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
