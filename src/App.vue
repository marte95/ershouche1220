<template>
	<div>
		<!-- 一级路由的小电视-IndexLayout -->
		<router-view></router-view>

		<!-- 下面是所有弹出层、抽屉等公共租界的聚集地 -->
		<CarpicLayer v-if="isShowCarpicLayer" :carpiclayerId="carpiclayerId"></CarpicLayer>
		<UserInfoDrawser :isShowUserInfoDrawser="isShowUserInfoDrawser"></UserInfoDrawser>
	</div>
</template>

<script>
	import CarpicLayer from "./components/carpic_layer/Index.vue"
	import UserInfoDrawser from "./components/userinfo_drawer/Index.vue"
	export default {
		data(){
			return {
				isShowCarpicLayer: false,  //汽车图片弹出层是否显示
				isShowUserInfoDrawser: false,  //抽屉的弹出层
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

			// 监听抽屉的显示和隐藏
			this.$bus.on('ShowUserInfoDrawer', (id)=>{
				this.isShowUserInfoDrawser =  true;
			})

			// 监听，通过bus隐藏弹出层
			this.$bus.on('HideUserInfoDrawer', ()=>{
				this.isShowUserInfoDrawser =  false;
			})
		},
		components: {
			CarpicLayer,
			UserInfoDrawser
		}
	}
</script>

<style scoped>

</style>