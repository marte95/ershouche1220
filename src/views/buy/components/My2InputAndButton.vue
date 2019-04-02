<template>
    <div>
        <InputNumber :max="max" :min="min" size="small" :value="value[0]" @on-change="changeV0">
        </InputNumber>
            ~ 
        <InputNumber :max="max" :min="min" size="small" :value="value[1]" @on-change="changeV1">
        </InputNumber>
        {{"  "}}
        <Button type="primary" size="small" @click="_clickHandle">确定</Button>
    </div>
</template>
<script>
    export default {
        props:['max', 'min', 'value'],
        data(){
            return {
                v0: this.value[0],
                v1: this.value[1]
            }
        },
        methods: {
            _clickHandle(){
                this.$emit('click', [this.v0, this.v1])
            },
            changeV0(v){
                this.v0 = v
                this.$emit('click', [this.v0, this.v1])
            },
            changeV1(v){
                this.v1 = v
                this.$emit('click', [this.v0, this.v1])
            }
        }
    }
</script>

<style scoped>

</style>