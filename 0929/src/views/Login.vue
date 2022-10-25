<template>
  <div class="login">

    <van-form @submit="onSubmit">
      <van-field v-model="mobile" name="mobile" placeholder="手机号码" right-icon="phone-o" :rules="[
      { pattern, message: '请输入正确内容' },
      ]" />
      <van-field v-model="pwd" :type="flag ?'text' : 'password'" name="pwd" :right-icon="flag?  'eye-o':'closed-eye'"
        @click-right-icon="flag=!flag" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      mobile: '',
      pwd: '',
      flag: false,
      pattern: /1\d{10}/,
    };
  },
  methods: {
    ...mapMutations(['tk']),
    async onSubmit(valus) {
      let f = new FormData();
      f.append('mobile', valus.mobile);
      f.append('pwd', valus.pwd);
      let { data, code, msg } = await this.$axios.post("/user/m/login?deviceId=007&deviceName=monkey", f)
      if (code == 0) {
        this.$toast.success('登录成功')
        this.tk(data.token)
        this.$router.go(-1)
      } else {
        this.$toast.fail('登录失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  margin: 30px 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
