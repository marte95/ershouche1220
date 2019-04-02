<template>
    <div>
        <h3>当前列顺序（您可以自由拖拽调整顺序哦）：</h3>
        <ul>
            <draggable v-model="arr1" :options="options" class="drag">
                <li v-for="item in arr1" :key="item">{{item}}</li>
            </draggable>
        </ul>

        <h3>可选的状态（您可以自由的添加需要显示的列）↑：</h3>
        <ul>
            <draggable v-model="arr2" :options="options" class="drag">
                <li v-for="item in arr2" :key="item">{{item}}</li>
            </draggable>
        </ul>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    export default {
        data(){
            return {
                arr1: ['A', 'B', 'C', 'D'],
                arr2: ['E', 'F', 'G', 'H'],
                options: {
                    animation: 200,
                    group:'haha'
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