<template>
	<view class="category">
			<scroll-view class="left" scroll-y="true" >
				<view v-for="item in category"
				@click="itemClick(item.id)"
				:class="{active:id==item.id}"
				>
				{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="right" scroll-y="true" >
				<view v-for="item in goods">
					<image :src="item.cover_url" mode=""></image>
				  <text>{{item.title}}</text>
				</view>
				<text v-if="goods.length===0">暂无数据</text>
			</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				category:[],
				goods:[],
				id:2,
			}
		},
		methods:{
			getLeftList() {
				this.$myRequest({
					url:'/api/goods',
				}).then((res)=>{
					res.data.categories.forEach(item => {
					const arr=item.children.map(item => {
							return {id : item.id,
										name : item.name}
						})
						this.category=this.category.concat(arr)	
					})
				})
			},
			itemClick(id){
				this.id=id
				this.isActive=true
				this.getRightList(id)
			},
			getRightList(id) {
				this.$myRequest({
					url:'/api/goods?category_id='+id,
				}).then((res)=>{
					this.goods=res.data.goods.data
				})
			},
		},
		onLoad() {
			this.getLeftList()
			this.getRightList(this.id)
		}
		
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.category {
		display: flex;
		height: 100%;
		
		.left {
			width: 30%;
			height: 100%;
			view {
				height: 50px;
				width: 96%;
				line-height: 50px;
				text-align: center;
			}
		}
		.right {
			width: 70%;
			height: 100%;
			view {
				height: 36%;
				width: 100%;
				text-align: center;
				image {
					display: block;
					width: 60%;
					height:60%;
				}
			}
		}
	}
	.active {
		background-color:#d81e06 ;
	}
	
</style>
