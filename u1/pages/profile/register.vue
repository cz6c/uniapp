<template>
	<view class="register">
	    <form @submit="formSubmit">
				<view class="uni-form-item">
				    <input type="text" v-model="name"  placeholder="昵称" />
				</view>
	        <view class="uni-form-item">				
	            <input type="text" v-model="email"  placeholder="邮箱" />
	        </view>
					<view class="uni-form-item">
					    <input type="password" v-model="password" placeholder="密码" />
					</view>
					<view class="uni-form-item">
					    <input type="password" v-model="password_confirmation" placeholder="确认密码" />
					</view>
	        <view class="uni-btn-v">
	            <button form-type="submit">register</button>
	        </view>
			</form>
	</view>
</template>

<script>
	
	import { min,email } from "../../utils/validate"
	
	export default {
		data() {
			return {
				name:'123123',
				email : '123123@a.com',
				password:'123123',
				password_confirmation:'123123'
			}
		},
		onLoad() {

		},
		methods: {
			formSubmit(){
				if (!min(this.name,6)) {
					console.log(1)
				}
				if (!min(this.password,6)) {
					console.log(2)
				}
				if (!email(this.email)) {
					console.log(3)
				}
				if (this.password!==this.password_confirmation){
					console.log(4)
				}
				const form={
					name:this.name,
					email:this.email,
					password:this.password,
					password_confirmation:this.password_confirmation
				}
				if(!min(this.name,6) || !min(this.password,6) || !email(this.email) || !(this.password==this.password_confirmation)) return
				this.$myRequest({
					url:'/api/auth/register',
					method:'post',
					data:form
				}).then(res=>{
					uni.redirectTo({
							url:'./login'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
.register{
	position: relative;
	height: 768px;
	width: 375px;
	form {
		position: absolute;
		top: 20%;
		height: 300px;
		width: 100%;
		.uni-form-item{
			input{
				border: 1px solid #000000;
				height: 40px;
				width: 80%;
				margin: 20px auto;
			}
		}
	}
}
</style>                                                                                                                                                                                                 
