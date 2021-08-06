<template>
	<view class="profile">
		<view class="my">
			<image src="../../static/fonts/-add-cart.png" mode=""></image>
			<!-- <text>用户名</text> -->
			<view class="login" @click="tologin">
				未登录 去登录 >
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{}
		},
		methods:{
			tologin(){
				uni.navigateTo({
					url:'./login'
				})
			}
		}
	}
</script>

<style lang="scss">
	.my {
		position: relative;
		height: 360rpx;
		background-color: $cc-bgc-color;
		border-radius:20rpx ;
		margin: 20rpx;
		image {
			position: absolute;
			left: 60rpx;
			top: 50%;
			margin-top: -80rpx;
			width: 160rpx;
			height: 160rpx;
			border-radius: 50% ;
			background-color: #333;
		}
		.login {
			position: absolute;
			right: 60rpx;
			height: 100%;
			line-height: 360rpx;
			color: $cc-text-color;
		}
	}
</style>
