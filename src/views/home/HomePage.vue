<template>
  <div>Home页面</div>
  <div> 当前用户：{{ state.userInfo.userName }}</div>
  <div>登录状态</div>
  <div><a-button @click="logout"> 注销</a-button></div>
</template>
<script lang="tsx" setup>
import { reactive } from 'vue'
import useUserStore from '@/stores/module/user'

const userStore = useUserStore()
const state = reactive({
  userInfo: userStore.userInfo
})
const logout = () => {
  userStore.logOut()
}
</script>
<style lang="scss" scoped></style>
