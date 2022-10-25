<template>
    <div class="searc">
        <van-search @search="search" v-model="keyword" shape="round" background="#4fc08d" placeholder="请输入搜索关键词" />
        <div class="long">
            <font>搜索历史</font>
            <van-icon name="delete-o" />
        </div>
       <div class="nout">
        <van-tag type="primary" v-for="(item,index) in arr" :key="index">{{item}}</van-tag>
           
       </div>
          
     
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            keyword: '',
        }
    },
    methods:{
        ...mapMutations(['addHis']),
        search(val){
            
          this.addHis(val)
          this.$router.push('/searchlist?keyword='+val)

        }
    },
    computed:{
        ...mapState(['arr'])
    }
}
</script>

<style lang="scss" scoped>
.long {
    margin: 0 30px;
    display: flex;
    height: 40px;
    border-bottom: 1px solid #000;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
}
.nout{
    margin: 0 30px;
    .van-tag{
        margin-right: 5px;
    }
}
</style>