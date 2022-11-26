import ApiService from "@/core/services/api.service";
import Vue from "vue";

const state = {
    statusOrder: [],
};
const getters = {
    statusOrder(state) {
        /*remove items if (!role)*/
        state.statusOrder.forEach(({nameFr: name}, index) => {
            // console.log("check item " + name + ' index ' + index)
            const role = Vue.prototype.$api.checkRole(name)
            //console.log("role   " + role)
            if (!role)
                state.statusOrder.splice(index, 1)
        })

        return state.statusOrder.map(item => {
            return {
                ...item,
                class: ''
            }
        })
    },
};
const actions = {
    async getStatusOrder({commit}, payload) {
        try {
            const response = await ApiService.get("/statues-order")
            commit("setStatusOrder", response)
            //console.log(`response getOrders ${JSON.stringify(state.statusOrder)}`)
            return state.statusOrder
        } catch (e) {
            console.log("error getStatusOrder" + e)
            console.log("error.response " + JSON.stringify(e.response))
        }
    },
};

const mutations = {
    setStatusOrder(state, payload) {
        state.statusOrder = payload;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};










