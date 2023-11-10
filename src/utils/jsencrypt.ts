import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = `MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOEIM2QaR6RUfUC3jJYJlhCYq5QIxgxZ
ftKsr6gaVe0Vix+/NJDQ/lX7JPwwjTyoiTPhNlplzVwyHwHpISuGItUCAwEAAQ==`

const privateKey = `MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEA4QgzZBpHpFR9QLeM
lgmWEJirlAjGDFl+0qyvqBpV7RWLH780kND+Vfsk/DCNPKiJM+E2WmXNXDIfAekh
K4Yi1QIDAQABAkA53FTycTtoinzmLgvM7EwUmlzLpHHf7QcJ/nLwA02CtuLowPk+
nDr6oWtyS6R+w8axV188LEMkNNaqSCiUsbjhAiEA9TOM4sjMoyTLDe2hNtb5szN2
n4qX2Kgc3rlD+y7ve90CIQDq8UHcYlCQvvfweTyTJMs87OyQGpJmB0oukW67mXiv
WQIhAN1P+gl3U7ysqNmZcbkdr6KfAKJfZU6X7fbZIRLF+kHBAiAMl/wYzShWafYu
bMFDffBrBqQzoUkBsRhX4LHX2oUumQIgMKyNz3SlGjVHp7gBO7cum2/jGXEYX7aE
NBDxHdQ+w0U=`
// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}

