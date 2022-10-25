import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import axios from './utils/request'

Vue.use(Vant)

// 把axios挂载到Vue的原型上   让每一个vue文件都可以使用axios
Vue.prototype.$axios = axios

function rem() {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'
}
rem()
window.onresize = rem
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')