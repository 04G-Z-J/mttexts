<template>
  <div class="register">
    <h4>新用户注册</h4>
    <van-form @submit="onSubmit">
      <van-field v-model="mobile" name="mobile" placeholder="手机号码" :rules="[
      { pattern, message: '请输入正确内容' },
      ]" />
      <van-field v-model="pwd" type="password" name="pwd" placeholder="密码" right-icon="closed-eye"
        :rules="[{ required: true, message: '请填写密码' }]" />
      <van-field v-model="c_pwd" type="password" name="c_pwd" placeholder="确认密码" right-icon="closed-eye"
        :rules="[{ required: true, message: '请填写密码' }]" />
      <van-field v-model="nick" name="nick" placeholder="用户名" :rules="[{ required: true, message: '请输入用户名' }]" />
      <van-field v-model="piccode" placeholder="图像验证">
        <template #button>
          <img :src="`https://api.it120.cc/small4/verification/pic/get?key=`+key" alt=""
            @click="key=new Date().getTime()">
        </template>
      </van-field>
      <van-field v-model="code" center clearable name="code" label="短信验证码" placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small" type="primary" v-if="kong" @click="home">发送验证码</van-button>
          <van-count-down :time="time" format="sss" v-else @finish="finish" />
        </template>
      </van-field>
      <van-field v-model="city" :rules="[{ required: true, message: '请填写城市' }]" @click="show=!show" name="city" />
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-area title="城市" :area-list="areaList" :columns-num="2" @confirm="as" />
      </van-popup>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import { areaList } from '@vant/area-data';
export default {
  data() {
    return {
      kong: true,
      time: 10 * 90 * 10,
      mobile: '',
      pwd: '',
      c_pwd: "",
      nick: "",
      code: "",
      pattern: /1\d{10}/,
      piccode: '',
      key: new Date().getTime(),
      city: '',
      show: false,
      areaList,
      province: ""
    };
  },
  methods: {
    as(a) {
      a.forEach(item => {
        this.city += item.name + " "
      })
      this.show = !this.show
      console.log(this.city);
      let a1 = this.city.split(' ')
      this.province = a1[0]
    },
    home() {
      this.kong = !this.kong

    },
    async finish() {
      this.kong = true
      let res = await this.$axios.get(
        `verification/sms/get?mobile=${this.mobile}&key=${this.key}&picCode=${this.piccode}`
      )
      console.log(res)
    },
  async  onSubmit(values) {
      if (values.pwd != values.c_pwd) {
        return this.$toast.fail('密码不一致')
      }
      /*
    FormData 对象用以将数据编译成键值对，其主要用于发送表单数据，
    可以发送上传的图片文件
    */
      //  创建formData对象  把表单元素添加到formData对象中  发送请求
      var f = new FormData()
      
      for (let key in values) {
        f.append(key, values[key])
      }
      let res = await this.$axios.post('user/m/register', f)
      console.log(res)
      if (res.code === 0) {
        this.$toast.success('注册成功')
        this.$router.push('/login')
      } else {
        this.$toast.fail(res.msg)
      
    }
    },
  },
};

</script>

<style lang="scss" >
.register {
  margin: auto 20px;
}
</style>
