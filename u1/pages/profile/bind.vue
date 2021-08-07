<template>
	<view>
		bind
		bind
		bind
		<button @click="bind">绑定微信</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			bind() {
				const _this = this
				//请求获取用户微信信息
				uni.getUserProfile({
					desc: '用于测试登录',
					success(userInfo) {
						//把获取的用户微信信息更新到服务器,因为这个借口没有更新用户信息的功能，暂时把要更新的信息写到本地缓存的user中
						const name = userInfo.userInfo.nickName
						const avatar_url = userInfo.userInfo.avatarUrl
						//获取缓存中的openid，请求绑定
						const openid = uni.getStorageSync('openid')
						_this.$myRequest({
							url: '/api/auth/wx/bind',
							method: 'post',
							data: {
								type: 'bind',
								openid
							}
						}).then(res => {
							//绑定成功后，更新缓存的用户信息中的opengid
							const user = uni.getStorageSync('user')
							uni.setStorageSync('user', {
								...user,
								openid,
								name,
								avatar_url
							})
							//提示绑定成功
							uni.showToast({
								title: '绑定成功',
								icon: 'success',
								duration: 2000
							})
							//重定向到来源页	一定要加/
							const redirect_to = uni.getStorageSync('redirect_to') || '/pages/index/index'
							//判断是不是tabar页面
							const tabbar = [
								"/pages/index/index",
								"/pages/category/category",
								"/pages/car/car",
								"/pages/profile/profile",
							]
							if (tabbar.includes(redirect_to)) {
								uni.switchTab({
									url: redirect_to
								})
							} else {
								uni.redirectTo({
									url: redirect_to
								})
							}
						})
					}
				})

			}
		}
	}
</script>

<style>

</style>
