<template>
    <view class="login">
        <form @submit="formSubmit">
            <view class="uni-form-item">				
                <input type="text" v-model="email"  placeholder="账号" />
            </view>
						<view class="uni-form-item">
						    <input type="password" v-model="password" placeholder="密码" />
						</view>
            <view class="uni-btn-v">
                <button form-type="submit">login</button>
            </view>
				</form>
    </view>
</template>


<script>
import { min,email } from "../../utils/validate"
	
export default {
    data() {
        return {
					email : 'test@a.com',
					password:'123123'
          }
    },
		methods:{
			formSubmit(){
				if (min(this.password,6)) {
					console.log(1)
				}
				if (email(this.email)) {
					console.log(2)
				}
				const form={
					email:this.email,
					password:this.password,
				}
					console.log(form)
					this.$myRequest({
						url:'/api/auth/login',
						method:'post',
						data:form
					}).then(res=>{
						console.log(res)
						uni.setStorageSync('token',res.data.access_token)
						uni.navigateTo({
							url:'./profile'
						})
					})
			}
		}
}
</script>

<style lang="scss">
.login{
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
