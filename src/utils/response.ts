export const codeMap={
    '401': '认证失败，无法访问系统资源',
    '403': '当前操作没有权限',
    '404': '资源不存在',
    'default': '系统错误，请稍后再试'
}

// 下载方法
export function blobValidate(data) {
    return data.type !== 'application/json'
}
  