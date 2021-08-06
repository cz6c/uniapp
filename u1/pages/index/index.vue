<template>
	<view class="home">
		<swiper indicator-dots autoplay>
			<swiper-item v-for="item in slides">
				<image :src="item.img_url" ></image>
			</swiper-item>
		</swiper>
			<h2>推荐书籍</h2>
		<view class="goods">
				<view class="goods-item" v-for="item in goods.slice(0,8)">
					<image :src="item.cover_url" ></image>
					<text>{{item.title}}</text>
				</view>
		</view>
		<h2>书籍列表</h2>
		<view class="list">
				<view class="list-item" v-for="item in list" @click="itemClick(item.id)">
					<image :src="item.cover_url" ></image>
					<text>{{item.title}}</text>
				</view>
		</view>
		<view class="bottom" v-if="flag">- - - - - 我是有底线的 - - - - -</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				slides: [],
				goods: [],
				list: [],
				page: 1,
				flag: false
			}
		},
		//页面加载
		onLoad() {
			this.$myRequest({
				url:'/api/index'
			}).then((res)=>{
				this.slides=res.data.slides
				this.goods=res.data.goods.data
			})
			this.getList()
		},
		//页面触底
		onReachBottom() {
			this.page++
			this.getList()
		},
		methods: {
		//商品列表数据
			getList() {
				this.$myRequest({
					url:'/api/goods?page='+this.page,
				}).then((res)=>{
					this.list=this.list.concat(res.data.goods.data)
					if(this.list.length<this.page*10){
						this.flag=true
					}
				})
			},
			//跳转详情页
			itemClick(id){
				uni.navigateTo({
					url:'../detail/detail1?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
.home {
	swiper {
		width: 750rpx;
		image {
			width: 100%;
		}
	}
}

h2 {
	margin: 30rpx 0;
	text-align: center;
}

.goods {
	width: 750rpx;
	display: flex;
	flex-wrap: wrap;
	
	.goods-item {
		flex: 1;
		
		image {
			width: 170rpx;
			height: 170rpx;
		}
		text {
			font-size: $uni-font-size-sm;
		}
	}
}

.list {
	width: 750rpx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	background-color: #e6e6e6;
	
	.list-item {
		box-sizing: border-box;
		margin: 15rpx ;
		width: 345rpx;
		background-color: #fff;
		
		image {
			width: 80%;
			height: 260rpx;
			display: block;
			margin: auto;
		}
		text {
			font-size: $uni-font-size-sm;
			text-align: center;
		}
	}
}

.bottom {
	height: 66rpx;
	line-height: 60rpx;
	text-align: center;
	background-color: #e6e6e6;
	font-size: $uni-font-size-base;
}
</style>
