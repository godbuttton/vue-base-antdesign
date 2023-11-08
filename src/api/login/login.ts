import request from '@/utils/request'

type LoginParams = {
    username: string;
    password: string;
    code: number;
    uuid: string;
}
// 注册方法
export function login(data:LoginParams) {
    return request({
        url: '/login',
        method: 'post',
        data: data
    })
}
 
// 获取验证码
export function getCodeImg() {
    return request({
      url: '/captchaImage',
      headers: {
        isToken: false
      },
      method: 'get',
      timeout: 20000
    })
  }