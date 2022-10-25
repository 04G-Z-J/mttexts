<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="标题"
      :left-text="isShow ? '编辑' : '完成'"
      @click-left="isShow = !isShow"
    />

    <div v-if="carts.length > 0">
      <!-- 滑动单元格 -->
      <van-swipe-cell v-for="(item, index) in carts" :key="item.id">
        <van-card :price="item.minPrice" :title="item.name">
          <template #thumb>
            <div class="left">
              <van-checkbox v-model="item.checked"></van-checkbox>
              <img class="imgurl" :src="item.pic" alt="" />
            </div>
          </template>
          <template #num>
            <van-stepper v-model="item.num" />
          </template>
        </van-card>
        <template #right>
          <van-button
            @click="del(index)"
            square
            text="删除"
            type="danger"
            class="delete-button"
          />
        </template>
      </van-swipe-cell>
    </div>

    <!-- 空状态 -->
    <van-empty v-else description="暂无购物车数据" />
    <!-- 提交订单兰 -->
    <van-submit-bar
      v-if="isShow"
      :price="allPrice * 100"
      style="bottom: 50px"
      button-text="下单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="allcheck">全选</van-checkbox>
    </van-submit-bar>

    <van-submit-bar
      v-else
      :price="allPrice * 100"
      style="bottom: 50px"
      button-text="删除"
      @submit="delSubmit"
    >
      <van-checkbox v-model="allcheck">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      isShow: false,
    }
  },
  watch: {
    carts: {
      deep: true,
      handler(newArr) {
        this.changeCarts(newArr)
      },
    },
  },
  computed: {
    ...mapState(['carts']),
    ...mapGetters(['allPrice']),
    allcheck: {
      get() {
        return this.carts.every((item) => {
          return item.checked == true
        })
      },
      set(v) {
        this.changeCheck(v)
      },
    },
  },
  methods: {
    ...mapMutations(['changeCheck', 'delCart', 'changeCarts']),
    onClickLeft() {
      //点击左侧编辑
    },
    delSubmit() {
      //  删除
    },
    onSubmit() {
      // 下单
    },
    del(index) {
      // this.delCart(index)

      Dialog.confirm({
        title: '',
        message: '确定要删除吗',
      })
        .then(() => {
          // on confirm
          this.delCart(index)
        })
        .catch(() => {
          // on cancel
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.left {
  display: flex;
  align-items: center;
  height: 100%;
  .imgurl {
    width: 75%;
  }
}
.goods-card {
  margin: 0;
  background-color: #fff;
}

.delete-button {
  height: 100%;
}
</style>
