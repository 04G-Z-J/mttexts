31去·   <template>
    <div class="searchlist">
      <van-nav-bar title="搜索列表" left-arrow @click-left="$router.go(-1)" />
      <ul v-if="list.length > 0">
        <li
          v-for="item in list"
          :key="item.id"
          @click="$router.push('/detail/' + item.id)">
          <img :src="item.pic" alt="" />
          <p>{{ item.name }}</p>
        </li>
      </ul>
      <van-empty v-else description="暂无数据"/>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        list: [],
      }
    },
    async mounted() {
      let keyword = this.$route.query.keyword
      let { data: res } = await this.$axios.get('shop/goods/list')
      this.list = res.filter((item) => {
        return item.name.indexOf(keyword) > -1
      })
    },
  }
  </script>
  <style lang="scss" scoped>
  .searchlist {
    ul {
        font-size: 18px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      li {
        width: 48%;
        margin-top: 10px;
        img {
          width: 100%;
          height: 170px;
        }
        p {
          text-align: center;
        }
      }
    }
  }
  </style>
  