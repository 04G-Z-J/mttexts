<template>
  <div class="Cate">
    <van-search shape="round" placeholder="请输入搜索关键词" @focus="$router.push('/search')" />
    <div class="box">
      <div class="box-list">
        <van-sidebar v-model="activeKey" @change="key">
          <van-sidebar-item title="所有分类" />
          <van-sidebar-item :title="item.name" v-for="item in list" :key="item.id" />
        </van-sidebar>
      </div>
      <div class="box1">
        <div class="box-right">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in list" :key="item.id"><img :src="item.icon" style="width:100%">
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="box-right1">

          <van-grid :column-num="3">
            <van-grid-item v-for="item in right" :key="item.id" :icon="item.icon" :text="item.name" @click="$router.push('/catelist?id='+item.id)" />
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
      // 全部数据
      arr: [],
      // 左边数据
      list: [],
      // 右边数据
      right: []

    }
  },
  methods: {
    key(index) {
      this.activeKey = index
      if (index == 0) {
        this.right = this.arr
      } else {
        let id = this.list[index - 1].id
        console.log(id)
        // 表达 redurn不加
        this.right = this.arr.filter(item => item.pid == id
        )
      }
    },
    async add() {
      let { data: res } = await this.$axios.get('/shop/goods/category/all')
      this.list = res.filter(item => item.pid == 0)
      this.arr = this.right = res.filter(item => item.level == 2)
    }
  },
  mounted() {
    this.add()
  }
}
</script>

<style lang="scss" scoped>
.Cate {
  overflow-x: auto;
  width: 100%;
  height: 100%;
}

.box {
  display: flex;

  .box1 {
    width: 70%;
  }

  img {
    width: 100%;
    height: 200px;
  }
}
</style>
