<template>
	<view class="detail">
		<image :src="detail.cover_url" mode=""></image>
		<view class="goods">
			<text>{{detail.title}}</text>
			<text>{{detail.description}}</text>
			<text>{{detail.price}}</text>
		</view>
		<rich-text :nodes='detail.details'></rich-text>
		<uni-goods-nav :fill="true"  
		:options="options" 
		:buttonGroup="buttonGroup"  
		@click="onClick" 
		@buttonClick="buttonClick" />
	</view>
</template>

<script>
	export default{
		data(){
			return {
				detail:{},
				 options: [{
				            icon: 'headphones',
				            text: '客服'
				        }, 
								{
				            icon: 'cart',
				            text: '购物车',
				            info: 2
				        }],
				        buttonGroup: [{
				          text: '加入购物车',
				          backgroundColor: '#ff0000',
				          color: '#fff'
				        },
				        {
				          text: '立即购买',
				          backgroundColor: '#ffa200',
				          color: '#fff'
				        }
				        ]
			}
		},
		 methods: {
		      onClick (e) {
		        uni.showToast({
		          title: `点击${e.content.text}`,
		          icon: 'none'
		        })
		      },
		      buttonClick (e) {
		        console.log(e)
		        this.options[1].info++
		      }
		    },
				
		onLoad(options) {
			this.$myRequest({
				url:'/api/goods/'+options.id,
			}).then(res=>{
				console.log(res)
				this.detail=res.data.goods
			})
		}
	}
</script>

<style lang="scss">
.uni-goods-nav{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
}
rich-text{
	width: 750rpx;
}
</style>
