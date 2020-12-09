export namespace ServiceKeys {
  export const MD5 = "md5";
  export const AES = "aes";
  export const SHAT_512 = "shat512";
  export const AES_SECRET_KEY = "AES@SecretKey*";
  export const LOGIN_CRYPT_METHOD = MD5;
  export const JWT_SECRET_KEY = "JWT@SecretKey*";
  export const TOKEN_EXPIRATIONS_TIME = Math.floor(Date.now() / 1000) * 3600;
}
