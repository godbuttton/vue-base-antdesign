<script lang="tsx">
import { reactive } from 'vue'
export default {
    setup(props,context) {

        const proxy = reactive({})
            const raw = {}  
            // 把数据放到raw中
            proxy.prop=raw
            proxy.prop.title='aaaa'
        const del=()=> {
            // 删除数据

            context.emit('del', props.item)
        }
        const testReactive = ()=>{
            // 测试响应式
            console.log(proxy.prop.title)
            proxy.prop.title='bbbb'
        }
        return  ()=> (
            <div class="to-do-item">
                代办名称  {proxy.prop.title}  
                { props.item.title }  <span class="del-icon" onClick={del}>X</span>
                <span onClick={testReactive}> 改变数据</span>
            </div>
        )
    },
    name: 'ToDoItem',
    props: {
        // 父组件传递过来的数据
        item: {
            type: Object,
            default: () => {
                return {}
            }
        }
    }
}
</script>
<style scoped>
.del-icon {
    margin-left: 20px;
}
</style>