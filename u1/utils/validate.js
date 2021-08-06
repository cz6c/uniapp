//表单验证方法

//最短
export const min=(str,len) => {
	if (str.length < len) {
		return false
	} else {
		return true
	}
}
//邮箱验证
export const email=(email)=>{
	const reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
	if(reg.test(email)){
		return true
	} else {
		return false
	}
}