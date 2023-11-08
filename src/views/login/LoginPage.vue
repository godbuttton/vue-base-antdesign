<template>
  <div class="login-page">
    <div class="login-box">
      <h2 class="text-lg font-semibold mb-30px">{{ $t('login.login') }}</h2>
      <a-form
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
          name="password"
          :rules="[{ required: true, message: $t('login.validPwd') }]"
        >
          <div class="flex flex-row">
            <a-input v-model:value="formState.password" placeHolder="验证码"> </a-input>
            <div>
              <img :src="valiCode" alt="" />
            </div>
          </div>
        </a-form-item>
        <a-form-item name="remember" label="">
          <div class="ml-20px" style="margin-left: 100px">
            <a-checkbox v-model:checked="formState.remember">{{ $t('login.remember') }}</a-checkbox>
            <a class="login-form-forgot" href="">{{ $t('login.forget') }}</a>
          </div>
        </a-form-item>
        <a-form-item name="remember">
          <div class="center">
            <a-button type="primary">{{ $t('login.login') }} </a-button>
            <a class="register-now" href="">{{ $t('login.registerNow') }}</a>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { getCodeImg } from '@/api/login/login'
interface FormState {
  username: string
  password: string
  remember: boolean
  uuid: string
}
const labelCol = { style: { width: '100px' } }
const valiCode = ref()
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
  uuid: ''
})
const init = () => {
  drawCodeImg()
}
const drawCodeImg = () => {
  getCodeImg().then((res) => {
    valiCode.value = res.img
    formState.uuid = res.uuid
  })
}
const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.username && formState.password)
})
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
