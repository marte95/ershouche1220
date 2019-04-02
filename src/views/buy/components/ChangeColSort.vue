<template>
    <div>
        <h3>当前列顺序（您可以自由拖拽调整顺序哦）：</h3>
        <ul>
            <draggable v-model="arr1" :options="options" class="drag">
                <li v-for="item in arr1" :key="item">{{getCbyE(item)}}</li>
            </draggable>
        </ul>

        <h3>可选的状态（您可以自由的添加需要显示的列）↑：</h3>
        <ul>
            <draggable v-model="arr2" :options="options" class="drag">
                <li v-for="item in arr2" :key="item">{{getCbyE(item)}}</li>
            </draggable>
        </ul>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import dictionary from '../utils/dictionary.js'
    export default {
        data(){
            return {
                arr1: [],
                arr2: [],
                options: {
                    animation: 200,
                    group:'haha'
                }
            }
        },
        created(){
            // 读取本地存储
            let storageArr = JSON.parse(localStorage.getItem('colSort'))
            console.log(storageArr)

            // 根据本地存储的键名，存储到arr1数组中
            for(let i = 0; i < storageArr.length;i++){
                this.arr1.push(storageArr[i])
            }

            // 遍历字典(dictionary)，在字典里面查找对应的中文名称，放入数组2
            for(let k in dictionary){
                if(!storageArr.includes(k)){
                    this.arr2.push(k)
                }
            }
        },
        methods: {
            // 传入英文名称返回对应的中文名称
            getCbyE(e){
                for(let k in dictionary){
                    if(k === e){
                        return dictionary[k]
                    }
                }
            }
        },
        components: {
            draggable,
        }
    }
</script>

<style scoped>
    ul{
        list-style:none;
        overflow: hidden;
        min-height: 50px;
        border-bottom: 1px solid #ccc;
        margin:10px;
    }
    ul .drag{
        overflow: hidden;
    }

    li{
        float: left;
        padding:5px 15px ;
        border: 1px solid #ccc;
        height: 30px;
        text-align: center;
        margin:0 4px 4px 0; 
        border-radius:5px;
        background: skyblue;
        color:#fff;
        cursor: pointer;
    }
</style>