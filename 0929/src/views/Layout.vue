<template>
  <div class="la">
    <router-view class="one"></router-view>
     <footer class="footer">
     </footer>
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" @change="change">
      <van-tabbar-item icon="home-o" to="/home" >首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/cate" >分类</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    data() {
    return {
      active:0
    };
   },
    methods: {
      change(a){
          console.log(a);
          this.active=a
          localStorage.ax=a
      }
    },
    mounted() {
      // console.log(localStorage.ax);
      this.active=Number(localStorage.ax) || 0
    },
  }
</script>

<style lang="scss" scoped>
.la{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .footer{
    height: 50px;
    width: 100%;
  }
  .one{
    flex: 1;
  }
}

</style>