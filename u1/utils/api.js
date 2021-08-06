const BASE_URL='https://api.shop.eduwork.cn'
const token=uni.getStorageSync("token")
export const myRequest=(options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method:options.method || 'get',
			data:options.data || {},
			header:{
				Authorization: "Bearer"+token
			},
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}