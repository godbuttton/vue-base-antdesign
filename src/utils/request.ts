import axios,{ type AxiosRequestConfig } from 'axios'
import { message, notification } from "ant-design-vue"
import { getToken } from '@/utils/auth'
import { tansParams, blobValidate,codeMap } from '@/utils/response'
import { saveAs as any } from 'file-saver'
import  useUserStore  from '@/stores/module/user'
import qs from 'qs'

export const reLogin = { show: false };
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 30000
})

message.config({
    duration: 2,
    maxCount: 1,
});

notification.config({
    duration: 4,
    maxCount: 1,
});


// request拦截器
service.interceptors.request.use(config => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
    if (getToken() && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + qs.stringify(config.params)
      config.params = {};
      config.url = url;
    }
    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
      const requestObj = {
        url: config.url,
        data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
        time: new Date().getTime()
      }
    }
    return config
  }, (error:any) => {
      console.log(error)
      Promise.reject(error)
  })


// 响应
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = codeMap[code] || res.data.msg || codeMap['default']
    // 二进制数据则直接返回
    if (res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer') {
      return res.data
    }
    if (code === 401) {
      if (!reLogin.show) {
        reLogin.show = true;
        message.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', { confirmButtonText: '重新登录', cancelButtonText: '取消', type: 'warning' }).then(() => {
            reLogin.show = false;
          useUserStore().logOut().then(() => {
            location.href = '/index';
          })
      }).catch(() => {
        reLogin.show = false;
      });
    }
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
      message.error(msg)
      return Promise.reject(new Error(msg))
    } else if (code === 601) {
      message.warning(msg)
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      message.error(msg)
      return Promise.reject('error')
    } else {
      return  Promise.resolve(res.data)
    }
  },
  error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    notification({ message: message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  }
)


// 通用下载方法
export function download(url, params, filename, config) {
    let downloadLoadingInstance = config?.autoLoading??message.loading('正在下载中...')
    return service.post(url, params, {
      transformRequest: [(params) => { return tansParams(params) }],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
      ...config
    }).then(async (data) => {
      const isBlob = blobValidate(data);
      if (isBlob) {
        const blob = new Blob([data])
        saveAs(blob, filename)
      } else {
        const resText = await data.text();
        const rspObj = JSON.parse(resText);
        // code => msg=>'系统错误'
        const errMsg = codeMap[rspObj.code] || rspObj.msg || codeMap['default']
        message.error(errMsg);
      }
      downloadLoadingInstance?.close();
    }).catch((err:any) => {
      console.error(err)
      message.error('下载文件出现错误，请联系管理员！')
      downloadLoadingInstance?.close();
    })
  }
  
  export default service