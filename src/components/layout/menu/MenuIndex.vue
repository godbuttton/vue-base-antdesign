<template>
  <a-menu :selectedKeys="current" mode="inline">
    <template v-for="menu in menuData">
      <a-menu-item
        :key="menu.path"
        @click="jump(menu)"
        v-if="!menu.children || !menu.children.length"
      >
        <span class="icon-pre iconfont" :class="menu.meta.icon"> </span>
        <span> {{ menu.meta.title }}</span>
      </a-menu-item>
      <template v-else>
        <menu-item-self :key="menu.name" :submenu="menu"></menu-item-self>
      </template>
    </template>
  </a-menu>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import MenuItemSelf from './menuItemSelf.vue'
import menuData from '@/router/workStation'
const current = ref<string>('')
const router = useRouter()
const jump = (item: any) => {
  debugger
  router.push({
    path: item.path
  })
}
</script>
<style scoped>
.icon-pre {
  margin-right: 10px;
  font-weight: 500;
  font-size: 18px;
}
</style>
