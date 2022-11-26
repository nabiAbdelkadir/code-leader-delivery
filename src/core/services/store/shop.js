import {
    getItems,
    updateItem,
    setItem,
    insertItem
} from "@/core/services/store/functions";

const state = {
    shops: [],
    shop: {}
};
const getters = {
    shops(state) {
        return state.shops;
    },
    shop(state) {
        return state.shop;
    },
};

const actions = {
    async getShops({commit}, payload) {
        return await getItems(commit, 'shops/my-shop', payload, 'setShops')
    },
    async getShopById({commit}, payload) {
        return await getItems(commit, '/shops/' + payload, {}, 'setShop')
    },
    async updateShop({commit}, payload) {
        await updateItem(commit, '/shops', payload, 'updateShop2')
    },
    async insertShop({commit}, payload) {
        await insertItem(commit, '/shops', payload, 'insertShop')
    },
};


const mutations = {
    setShops(state, payload) {
        state.shops = [payload];
    },
    setShop(state, payload) {
        state.shop = payload;
    },
    updateShop2(state, payload) {
        setItem(state, payload, 'shops')
    },
    insertShop(state, payload) {
        state.shops.unshift(payload)
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};










