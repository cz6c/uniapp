<template>
	<view class="login">
		<form @submit="formSubmit">
			<view class="uni-form-item">
				<input type="text" v-model="email" placeholder="账号" />
			</view>
			<view class="uni-form-item">
				<input type="password" v-model="password" placeholder="密码" />
			</view>
			<view class="register" @click="register">前往注册 ></view>
			<view class="uni-btn-v">
				<button form-type="submit">login</button>
			</view>
			<view class="divider">- - - - - - - -微 信 登 录- - - - - - - -</view>
		</form>
		<view class="wx" @click="wxLogin"></view>
	</view>
</template>


<script>
	import {
		min,
		email
	} from "../../utils/validate"

	export default {
		data() {
			return {
				email: '123123@a.com',
				password: '123123'
			}
		},
		methods: {
			formSubmit() {
				if (min(this.password, 6)) {
					console.log(1)
				}
				if (email(this.email)) {
					console.log(2)
				}
				const form = {
					email: this.email,
					password: this.password,
				}
				if (!min(this.password, 6) || !email(this.email)) return
				//发起登录请求
				this.$myRequest({
					url: '/api/auth/login',
					method: 'post',
					data: form
				}).then(res => {
					//缓存token
					uni.setStorageSync('token', res.data.access_token)
					//获取用户信息
					this.$myRequest({
						url: '/api/user',
						method: 'get',
					}).then(res => {
						//缓存user
						uni.setStorageSync('user', res.data)
						//如果用户没有openid，跳转到绑定页面
						if (!res.data.openid) {
							uni.redirectTo({
								url: '/pages/profile/bind'
							})
						} else {
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
						}

					})
				})
			},
			//注册
			register() {
				uni.navigateTo({
					url: './register'
				})
			},
		}
	}
</script>

<style lang="scss">
	.login {
		position: relative;
		height: 768px;
		width: 375px;

		form {
			position: absolute;
			top: 20%;
			height: 300px;
			width: 100%;

			.uni-form-item {
				input {
					border: 1px solid #000000;
					height: 40px;
					width: 80%;
					margin: 20px auto;
				}
			}

			.register {
				margin: 0 36px 20px;
				color: $cc-text-color;
			}

			.divider {
				width: 80%;
				margin: 30px auto;
				color: #999;
				text-align: center;
			}
		}

		.wx {
			position: absolute;
			top: 60%;
			left: 50%;
			margin-left: -25px;
			height: 50px;
			width: 50px;
			background-color: #007AFF;

		}
	}
</style>
