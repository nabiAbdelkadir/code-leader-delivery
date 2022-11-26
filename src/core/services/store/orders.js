import ApiService from "@/core/services/api.service";
import {deleteItemById, deleteItemsByIds, deleteItem, deleteItems} from "@/core/services/store/functions";
import Vue from "vue";

const state = {
    orders: [],
    order: [],
};
const getters = {
    orders(state) {
        return state.orders;
    },
    order(state) {
        return state.order;
    },
};
const actions = {
    async getOrders({commit}, payload) {
        try {
            const orders = await ApiService.get("/orders", payload)
            commit("setOrders", orders.rows)
            //console.log(`response getOrders ${JSON.stringify(state.orders)}`)
            //console.log(`rows  ${JSON.stringify(orders.count)}`)
            return state.orders
        } catch (e) {
            console.log("error getOrders" + e)
            console.log("error.response " + JSON.stringify(e.response))
        }
    },

    async getOrder({commit}, payload) {
        try {
            const order = await ApiService.get("/orders/" + payload)
            //console.log("get order id :: " + payload)
            //console.log("get order " + JSON.stringify(order))
            commit("setOrder", order)
            return state.order
        } catch (e) {
            console.log("error getOrders" + e)
            console.log("error.response " + JSON.stringify(e.response))
        }
    },

    async deleteOrderById({commit}, payload) {
        Vue.prototype.$sweet.deleteItems().then(async () => {
            if (!Array.isArray(payload))
                return await deleteItemById(commit, `/orders`, payload.id, 'deleteOrderById')
            await deleteItemsByIds(commit, '/orders', payload.map(({id}) => id), 'deleteOrdersByIds')
        })
    }
};

const mutations = {
    setOrders(state, payload) {
        state.orders = payload;
    },
    setOrder(state, payload) {
        state.order = payload;
    },
    deleteOrderById(state, payload) {
        deleteItem(state, payload, 'orders')
    },
    //deleteItemsByIds(state, payload) {
    deleteOrdersByIds(state, payload) {
        deleteItems(state, payload, 'orders')
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};










