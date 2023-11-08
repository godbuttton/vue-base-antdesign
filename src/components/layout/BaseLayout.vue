<template>
  <a-layout>
    <a-layout-header class="header-container"> 表头 </a-layout-header>
    <a-layout-content>
      <a-layout>
        <a-layout-sider
          theme="light"
          class="sider-container"
          v-model:collapsed="collapsed"
          :trigger="null"
          collapsible
        >
          <div class="logo" />
          <MenuIndex></MenuIndex>
        </a-layout-sider>
        <a-layout>
          <a-layout-content
            :style="{
              margin: '8px 8px',
              background: '#fff',
              minHeight: '280px'
            }"
          >
            <div class="content-box">
              <suspense>
                <router-view></router-view>
              </suspense>
            </div>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts">
import MenuIndex from './menu/MenuIndex.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'
const collapsed = ref<boolean>(false)
</script>

<style lang="css" scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
.header-container {
  background: #0f998d;
  color: white;
  height: 48px;
  line-height: 48px;
}
.sider-container {
  min-height: calc(100vh - 48px);
}
.content-box {
  padding: 16px;
  background: #fff;
  min-height: 280px;
}
</style>
