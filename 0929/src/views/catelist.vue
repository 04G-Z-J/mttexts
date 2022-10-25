<template>
  <div class="catelist">
    <van-nav-bar title="商品分类" left-arrow @click-left="$router.go(-1)" />
    <ul class="list">
      <li v-for="item in list" :key="item.id" @click="$router.push('/detail?id='+item.id)">

          <img :src="item.pic">
        <h6>{{item.characteristic}}</h6>
        <p>{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
 return{
  list:[]
 }
  },
  methods: {

  },
async  mounted() {
let {data:res}=await this.$axios.get('/shop/goods/list')
let id=this.$route.query.id
this.list=res.filter(item=>item.categoryId==id)
  }
}
</script>

<style lang="scss" scoped>
 .list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;

    // height: 300px;
    li {
      display: flex;
      flex-direction: column;
      // justify-content: space-around;
      width: 45%;

      div {
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 200px;
        }
      }

      h6 {
        width: 100%;
        font-size: 20px;
      }

      p {
        width: 100%;
        font-size: 15px;
      }
    }

  }
</style>