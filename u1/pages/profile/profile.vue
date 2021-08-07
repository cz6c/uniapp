<template>
	<view class="profile">
		<view class="my">
			<image :src="userinfo.avatar_url" mode=""></image>
			<text class="name">昵称：{{userinfo.name}}</text>
			<text class="email">邮箱：{{userinfo.email}}</text>
		</view>
		<button @click="removeWX">解绑微信</button>
	</view>
</template>

<script>
	import {
		checkLogin
	} from '../../utils/checkLogin.js'
	export default {
		data() {
			return {
				userinfo: {}
			}
		},
		onLoad() {
			//判断用户是否登录
			checkLogin("/pages/profile/profile")
			this.userinfo = uni.getStorageSync('user')
		},
		methods: {
			removeWX() {
				this.$myRequest({
					url: '/api/auth/wx/bind',
					method: 'post',
					data: {
						type: 'unbind',
						openid: uni.getStorageSync('openid')
					}
				}).then(res => {
					uni.showToast({
						title: '解绑成功',
						icon: 'success',
						duration: 2000
					})
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
		border-radius: 20rpx;
		margin: 20rpx;

		image {
			position: absolute;
			left: 60rpx;
			top: 50%;
			margin-top: -80rpx;
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			background-color: #333;
		}

		text {
			position: absolute;
			left: 136px;
			color: $cc-text-color;
		}

		.name {
			top: 66px;
		}

		.email {
			bottom: 66px;
		}
	}
</style>
