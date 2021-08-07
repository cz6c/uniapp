<script>
	export default {
		onLaunch: function() {
			const that = this
			//获取code
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					const code = loginRes.code
					//获取成功发送请求获取openid
					if (loginRes) {
						that.$myRequest({
							url: '/api/auth/wx/code',
							method: 'post',
							data: {
								appid: 'wx11779f329c74d4b2',
								secret: '28585e8cb89dd92a3a933a8faf9dd97f',
								js_code: code
							}
						}).then(res => {
							//如果微信未绑定，只能返回openid,先缓存起来，后面用
							uni.setStorageSync('openid', res.data.openid)
							//如果绑定过，会返回token和用户信息,缓存token自动登录
							if (res.access_token != '') {
								uni.setStorageSync('token', res.data.access_token)
							}
						})
					}
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	uni-forms {
		height: 600rpx;
		width: 750rpx;
	}
</style>
