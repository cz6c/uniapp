const BASE_URL='https://api.shop.eduwork.cn'
export const myRequest=(options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method:options.method || 'get',
			data:options.data || {},
			header:{
				Authorization: "Bearer"+uni.getStorageSync("token")
			},
			success(res) {
				resolve(res)
				console.log(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}