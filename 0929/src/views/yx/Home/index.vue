<template>
  <div id="home" >
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in list" :key="item.id"><img :src="item.picUrl" style="width:100%"></van-swipe-item>
    </van-swipe>
    <div style="width:100%;height:20px;background: rgb(201, 199, 199);"></div>
    <div class="hear" style="width:100%;height:40px;">
      <h4>精选标题</h4>
      <font>></font>
    </div>
    <section class="box">
      <ul class="All">
        <li v-for="item in jpg" :key="item.id"><img :src="item.pic" alt="">
          <h5 v-html="item.title"></h5>
          <font v-html="item.descript"></font>
        </li>
      </ul>
    </section>
    <div class="hear" style="width:100%;height:40px;">
      <h4>人气推荐</h4>
      <font>></font>
    </div>
    <ul class="list">
      <li v-for="item in arr" :key="item.id" @click="$router.push('/detail?id='+item.id)">
        <div>
          <img :src="item.pic">
        </div>
        <h6>{{item.characteristic}}</h6>
        <p>{{item.name}}</p>
        <p>￥{{item.weight}}</p>
      </li>
    </ul>
    <div class="totop" v-show="isShow" @click="toTop()">返回顶部</div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      list: [],
      jpg: [],
      arr: [],
    }
  },
  mounted() {
    this.auto()
    this.imgs()
    this.add()
    let home=document.querySelector('#home')
    home.addEventListener("scroll", () => {

      let html = document.documentElement||document.documentElement;
      
      if (home.scrollTop > html.clientHeight) {
        
        this.isShow = true
        console.log(this.isShow);
      } else {
        this.isShow = false
      }
    })
  },
  methods: {
    toTop() {
      let home=document.querySelector('#home')
      home.scrollTop = 0
    },
    async auto() {
      let { data: res } = await this.$axios.get('/banner/list')
      this.list = res
    },
    async imgs() {
      let { data: res } = await this.$axios.get('/cms/news/list')
      this.jpg = res
    },
    async add() {
      let { data: res } = await this.$axios.get('/shop/goods/list')
      this.arr = res.slice(-8)
    }
  },
}
</script>

<style lang="scss" scoped>
#home {
  

  overflow: auto;
  height: 100%;
  width: 100%;

  .hear {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    h4 {
      margin-right: 10px;
    }
  }

  .box {
    width: 100%;
    height: 300px;
    overflow-y: auto;

    .All {
      width: 400%;
      display: flex;

      li {
        flex: 1;
        display: flex;
        flex-direction: column;

        img {
          flex: 1;
          width: 95%;
          border-radius: 20px;
          height: 240px;
        }

        h5 {
          width: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 20px;
        }

        font {
          width: 90px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 16px;
        }
      }
    }


  }

  .list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;

    // height: 300px;
    li {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
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
  .totop {
    font-size: 18px;
    position: fixed;
    bottom: 60px;
    right: 0;
    width: 50px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: chartreuse;
  }
 
}
</style>