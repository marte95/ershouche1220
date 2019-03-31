<template>
	<div>
		<!-- 一级路由的小电视-IndexLayout -->
		<router-view></router-view>

		<!-- 下面是所有弹出层、抽屉等公共租界的聚集地 -->
		<CarpicLayer v-if="isShowCarpicLayer" :carpiclayerId="carpiclayerId"></CarpicLayer>
	</div>
</template>

<script>
	import CarpicLayer from "./components/carpic_layer/Index.vue"
	export default {
		data(){
			return {
				isShowCarpicLayer: false,  //汽车图片弹出层是否显示
				carpiclayerId: 1000088
			}
		},
		mounted () {
			// 上树即用on监听ShowCarpicLayer事件，等待emit()触发我并传递id参数
			this.$bus.on('showShowCarpicLayer', (id)=>{
				this.isShowCarpicLayer =  true;
				this.carpiclayerId = id  //改变当前显示的汽车编号
			})

			// 监听，通过bus隐藏弹出层
			this.$bus.on('hideShowCarpicLayer', ()=>{
				this.isShowCarpicLayer =  false;
			})
		},
		components: {
			CarpicLayer
		}
	}
</script>

<style scoped>

</style>