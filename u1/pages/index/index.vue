<template>
	<view>
		{{slides}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				slides: []
			}
		},
		onShow() {
			console.log(2)
			uni.request({
				url:"https://api.shop.eduwork.cn/api/index",
				success:(res)=>{
					
					this.slides=res.data.slides
					console.log(this.slides)
				}
			})
		},
		methods: {

		}
	}
</script>

<style>

</style>
