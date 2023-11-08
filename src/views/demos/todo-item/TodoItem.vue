<script setup>
import {ref} from 'vue'
const props= defineProps({
    item:{
        type:Object,
        default:()=>({})
    }
})
const  val= ref({
    a: 'dwdw'
})
const emit=defineEmits(['del'])
const del=()=> {
            // 删除数据
            console.log(val)
            emit('del', props.item)
        }
</script>
<template>
    <div class="to-do-item">
        {{ item.title }}  <span class="del-icon" @click="del">X</span>
    </div>
</template>
<style scoped>
.del-icon {
    margin-left: 20px;
}
</style>