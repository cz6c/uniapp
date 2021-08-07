export function checkLogin(redirect_to) {
	//判断用户是否登录
	if(!uni.getStorageSync("token")){
		//缓存来源页
		uni.setStorageSync("redirect_to",redirect_to)
		//清除当前页面跳转登录页
		uni.redirectTo({
			url:'/pages/profile/login'
		})
	}
}