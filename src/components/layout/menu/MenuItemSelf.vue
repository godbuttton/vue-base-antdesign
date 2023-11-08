<template>
  <a-sub-menu :key="submenu.path" :title="submenu.meta && submenu.meta.title">
    <template #icon>
      <span class="icon-pre iconfont" :class="submenu?.meta?.icon"></span>
    </template>

    <template :key="item.path + 'index'" v-for="item in list">
      <template v-if="!item.children || item.children.length === 0">
        <a-menu-item @click="jump(item)" :key="item.name">
          {{ item.meta.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <menu-item-self :key="item.name" :submenu="item"></menu-item-self>
      </template>
    </template>
  </a-sub-menu>
</template>
<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import * as AntdIcons from '@ant-design/icons-vue'
import { camelToDash } from '@/utils/string'
const AllAntdIcons = { ...AntdIcons }
Object.keys(AntdIcons).forEach((key) => {
  AllAntdIcons[camelToDash(key)] = AntdIcons[key]
})

export default defineComponent({
  name: 'menu-item-self',
  props: ['submenu'],
  components: {
    ...AntdIcons
  },
  setup(props) {
    const router = useRouter()
    const list = computed(() => props.submenu.children)
    const jump = (item) => {
      debugger
      router.push({
        name: item.name
      })
    }
    return {
      jump,
      list
    }
  }
})
</script>
<style scoped>
.icon-pre {
  margin-right: 4px;
  font-weight: 500;
  font-size: 18px;
}
</style>
