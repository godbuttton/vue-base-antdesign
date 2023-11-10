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

// 注册
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
