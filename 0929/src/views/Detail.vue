<template>
  <div class="detail">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in pics" :key="item.id"><img :src="item.pic" style="width:100%"
          @click="onChange(index)"></van-swipe-item>
    </van-swipe>
    <div>
      <h6>{{basicInfo.name}}</h6>
      <p>{{basicInfo.dateEndCountDown}}</p>
      <div class="certn">
        <div class="your">
          <div>
            <font>低价：￥{{basicInfo.minScore}}</font>
            <font> 原价：￥{{basicInfo.minPrice}}</font>
          </div>
          <div>
            库存：{{basicInfo.stores}}
          </div>
        </div>
      </div>
    </div>

    <van-tabs v-model="active">
      <van-tab title="商品介绍" ><div v-html="content" class="content"></div> </van-tab>
      <van-tab title="商品评价">内容 2</van-tab>
    </van-tabs>
    <van-goods-action>
  <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
  <van-goods-action-icon icon="cart-o" text="购物车" @click="$router.push('/cart')" />
  <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
  <van-goods-action-button type="warning" text="加入购物车" @click="addCart"/>
  <van-goods-action-button type="danger" text="立即购买" />
</van-goods-action>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      basicInfo: [],
      //  基本信息
      content: "",
      //  商品介绍
      pics: {},
      active: 0
      // 轮播图

    };
  },
  async mounted() {
    let id = this.$route.query.id
    let { data: res } = await this.$axios.get('/shop/goods/detail?id=' + id)
    let { basicInfo, content, pics } = res
    this.pics = res.pics
    this.basicInfo = res.basicInfo
    this.content = res.content
    console.log(this.basicInfo);
  },
  methods: {
    ...mapMutations(['setCart']),
    onChange(index) {
      ImagePreview({
        images: this.pics.map(item => item.pic),
        startPosition: index
      });

    },
    addCart() {

if(!this.token){
  this.$toast.fail('请先登录')
  return this.$router.push('/login')
}

      // 创建加入购物车数据
      var obj = {
        id: this.basicInfo.id,
        name: this.basicInfo.name,
        minPrice: this.basicInfo.minPrice,
        pic: this.basicInfo.pic,
        num: 1,
        checked: false,
      }
      // 调用mutations方法
      this.setCart(obj)
      // 提示
      this.$toast.success('加入成功')
    },
  },
  computed:{
    ...mapState(['token'])
  }

}
</script>

<style lang="scss" >
.detail {
 .content {
  font-size: 20px;
  margin-bottom: 30px;
  img {
    width: 100% !important;
  }
  
}
  .certn {
    display: flex;
    flex-direction: column;
    height: 80px;
    font-size: 18px;
    justify-content: space-around;

    .your {
      display: flex;
      margin-right: 30px;
      justify-content: space-around;
    }
  }
  
  h6,
  p {
    font-size: 20px;
  }
  
}
</style>