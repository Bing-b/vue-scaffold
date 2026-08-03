import JSEncrypt from 'jsencrypt';

export const encrypt = (publicKey: string, txt: string): string | false => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);
  return encryptor.encrypt(txt);
};

export const decrypt = (privateKey: string, txt: string): string | false => {
  const decryptor = new JSEncrypt();
  decryptor.setPrivateKey(privateKey);
  return decryptor.decrypt(txt);
};
