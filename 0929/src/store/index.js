import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        carts: [],
        token: null,
        arr: []
    },
    getters: {
        allPrice(state) {
            return state.carts.reduce((sum, item) => {
                if (item.checked) {
                    sum += item.minPrice * item.num
                }
                return sum
            }, 0)
        },
    },
    mutations: {
        addHis(state, val) {
            // 查找类似于indexof
            if (state.arr.includes(val)) {
                return
            }
            if (state.arr.length >= 5) {
                // 尾部删除
                state.arr.pop()
            }
            // 头部添加
            state.arr.unshift(val)
        },
        tk(minstate, token) {
            minstate.token = token;
        },
        changeCarts(state, o) {
            state.carts = o
        },
        changeCheck(state, v) {
            state.carts.forEach((item) => {
                item.checked = v
            })
        },
        delCart(state, ind) {
            state.carts.splice(ind, 1)
        },
        // 加入购物车
        setCart(state, o) {
            let index = state.carts.findIndex((item) => {
                return item.id == o.id
            })
            if (index === -1) {
                state.carts.push(o)
            } else {
                state.carts[index].num++
            }
        },
    },
    actions: {},
    modules: {},
    plugins: [createPersistedState()],
})