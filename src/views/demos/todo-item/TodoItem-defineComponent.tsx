
import { defineComponent } from "vue";

const TodoItem = defineComponent({
    setup(props,context) {
        const del=()=> {
            // 删除数据
            console.log("点击事件触发了")
            context.emit('del', props.item)
        }
        return  ()=> (
            <div class="to-do-item">
                代办名称
                { props.item.title }  <span class="del-icon" onClick={del}>X</span>
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
})
export default TodoItem