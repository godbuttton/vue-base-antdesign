<template>
  <div class="login-page">
    <div class="login-box">
      <h2 class="text-lg font-semibold mb-30px">{{ $t('login.login') }}</h2>
      <a-form
        ref="formRef"
        :model="formState"
        name="normal_login"
        class="login-form"
        :label-col="labelCol"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          :label="$t('login.userName')"
          name="username"
          :rules="[{ required: true, message: $t('login.validName') }]"
        >
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          :label="$t('login.password')"
          name="password"
          :rules="[{ required: true, message: $t('login.validPwd') }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item
          label=""
          name="code"
          :rules="[{ required: true, message: $t('login.validPwd') }]"
        >
          <div style="margin-left: 100px">
            <div class="flex flex-row">
              <a-input class="w-2/3" v-model:value="formState.code" placeHolder="验证码"> </a-input>
              <div class="w-1/3 ml-2">
                <img :src="valiCode" class="w-full h-full" alt="" />
              </div>
            </div>
          </div>
        </a-form-item>
        <a-form-item name="remember" label="">
          <div class="ml-20px" style="margin-left: 100px">
            <a-checkbox v-model:checked="formState.remember">{{ $t('login.remember') }}</a-checkbox>
            <a class="login-form-forgot" href="">{{ $t('login.forget') }}</a>
          </div>
        </a-form-item>
        <a-form-item>
          <div class="center">
            <a-button type="primary" @click="handleLogin" :loading="state.loading"
              >{{ $t('login.login') }}
            </a-button>
            <a class="register-now" href="">{{ $t('login.registerNow') }}</a>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed, toRaw } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { getCodeImg } from '@/api/login/login'
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import useUserStore from '@/stores/module/user'
import { useRouter } from 'vue-router'
import _ from 'lodash'

const userStore = useUserStore()
const router = useRouter()
interface FormState {
  username: string
  password: string
  remember: boolean
  uuid: string
}
const captchaEnabled = ref(true)
const labelCol = { style: { width: '100px' } }
const valiCode = ref()
const formRef = ref()
const state = reactive({
  loading: false
})
const formState = reactive<FormState>({
  code: '', //验证码
  username: '',
  password: '',
  remember: true,
  uuid: ''
})
const init = () => {
  drawCodeImg()
  getCookie()
}
const drawCodeImg = () => {
  getCodeImg().then((res) => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled
    if (captchaEnabled.value) {
      valiCode.value = 'data:image/gif;base64,' + res.img
      formState.uuid = res.uuid
    }
  })
}
const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const handleLogin = () => {
  formRef.value
    .validate()
    .then(() => {
      if (formState.remember) {
        Cookies.set('username', formState.username, { expires: 30 })
        Cookies.set('password', encrypt(formState.password), { expires: 30 })
        Cookies.set('remember', formState.remember, { expires: 30 })
      } else {
        // 否则移除
        Cookies.remove('username')
        Cookies.remove('password')
        Cookies.remove('remember')
      }
      const loginParams = toRaw(formState)
      // 调用action的登录方法
      userStore
        .login(_.omit(loginParams, 'remember'))
        .then(() => {
          router.push({ path: '/' })
        })
        .catch(() => {
          state.loading = false
          // 重新获取验证码
          if (captchaEnabled.value) {
            drawCodeImg()
          }
        })
    })
    .catch((error) => {
      state.loading = false
      console.log('error', error)
    })
}
const disabled = computed(() => {
  return !(formState.username && formState.password)
})
const getCookie = () => {
  const username = Cookies.get('username')
  const password = Cookies.get('password')
  const remember = Cookies.get('remember')
  formState.username = username === undefined ? formState.username : username
  formState.password = username === undefined ? formState.password : decrypt(password)
  formState.remember = username === undefined ? formState.remember : remember
}
init()
</script>
<style lang="less" scoped>
.login-page {
  background: #eee;
  display: flex;
  flex: 1;
  height: 100vh;
  align-items: center;
}
.mb-30px {
  margin-bottom: 30px;
}
.login-form {
  width: 85%;
}
.login-box {
  background: #dedede;
  backdrop-filter: blur(10px);
  border-radius: 8px;
  margin: 0 auto;
  width: 500px;
  height: 350px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.center {
  text-align: center;
}
.register-now {
  margin-left: 12px;
}
</style>
