<template>
   <ul class="box-but">
      <li v-for="item in arr" :key="item.id" @click="jump(item.id)">
        <img :src="item.pic">
        <h4>{{item.name}}</h4>
        <p>{{item.statusStr}}</p>
        <p>${{item.fxType}}</p>
      </li>
    </ul>
</template>
<script>
export default {
props:['arr'],
methods:{
    jump(id){
      this.$router.push(`/detail/${id}`)
    }
}
}
</script>

<style lang="scss">
.box-but{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
justify-content: space-between;
  li{
    margin-top: 20px;
    background-color: rgb(122, 123, 122);
    display: flex;
   
    flex-direction: column;
    justify-content: space-around;
    width: 46%;
    img{
      width: 100%;
    }

  }
}
</style>