import ApiService from "@/core/services/api.service";
import {
    deleteItem,
    deleteItemById,
    getItemById,
    getItems,
    insertItem,
    updateItem,
    setItem
} from "@/core/services/store/functions";

import Vue from "vue";


const state = {
    products: [],
    product: [],
    productOptionsType: [],
    productOptionsItems: []
};

const getters = {
    products(state) {
        return state.products;
    },
    product(state) {
        return state.product;
    },
    productOptionsType(state) {
        return state.productOptionsType;
    },
    productOptionsItems(state) {
        return state.productOptionsItems;
    },
};

const actions = {
    async insertProductOptionsType({commit}, payload) {
        await insertItem(commit, '/product-options-type', payload, 'insertProductOptionsType')
    },

    async getProductOptionsType({commit}, payload) {
        await getItems(commit, '/product-options-type', payload, 'setProductOptionsType')
    },
    async updateProductOptionsType({commit}, payload) {
        await updateItem(commit, '/product-options-type', payload, 'updateProductOptionsType')
    },

    async deleteProductOptionsType({commit}, payload) {
        Vue.prototype.$sweet.deleteItems().then(async (res) => {
            await deleteItemById(commit, '/product-options-type', payload, 'deleteProductOptionsType')
        })
    },
    /*Start productOptionsItems*/

    async insertProductOptionsItems({commit}, payload) {
        await insertItem(commit, '/product-options-item', payload, 'insertProductOptionsItems')
    },

    async getProductOptionsItems({commit}, payload) {
        await getItems(commit, '/product-options-item', payload, 'setProductOptionsItems')
    },
    async updateProductOptionsItems({commit}, payload) {
        await updateItem(commit, '/product-options-item', payload, 'updateProductOptionsItems')
    },

    async deleteProductOptionsItems({commit}, payload) {
        Vue.prototype.$sweet.deleteItems().then(async (res) => {
            await deleteItemById(commit, '/product-options-item', payload, 'deleteProductOptionsItems')
        })
    },

    /*End  productOptionsItems*/

    /*Start product*/
    async getProducts({commit}, payload) {
        try {
            const products = await ApiService.get("/products", payload)
            if (products.rows.length > 350)
                products.rows.length = 10

            commit("setProducts", products.rows)
            return state.products
        } catch (e) {
            console.log("error products" + e)
            console.log("error.response " + JSON.stringify(e.response))
        }
    },

    async getProduct({commit}, payload) {// url : items/:id payload {params}
        return await getItemById(commit, '/products/' + payload, {}, 'setProduct')
        /*
        * try {
            const product = await ApiService.get("/products/" + payload)
            commit("setProduct", product)
            return state.products
        } catch (e) {
            console.log("error product" + e)
            console.log("error.product " + JSON.stringify(e.response))
        }
        * */
    },

    async deleteProductById({commit}, payload) {
        await deleteItemById(commit, '/products', payload, 'deleteProductById')
    }

};


const mutations = {
    setProductOptionsType(state, payload) {
        state.productOptionsType = payload;
    },
    insertProductOptionsType(state, payload) {
        state.productOptionsType.unshift(payload)
    },
    updateProductOptionsType(state, payload) {
        setItem(state, payload, 'productOptionsType')
    },
    deleteProductOptionsType(state, payload) {
        deleteItem(state, payload, 'productOptionsType')
    },

    //ProductOptionsItems
    insertProductOptionsItems(state, payload) {
        state.productOptionsItems.unshift(payload)
    },
    setProductOptionsItems(state, payload) {
        state.productOptionsItems = payload;
    },
    updateProductOptionsItems(state, payload) {
        setItem(state, payload, 'productOptionsItems')
    },
    deleteProductOptionsItems(state, payload) {
        deleteItem(state, payload, 'productOptionsItems')
    },
    /*Start products*/
    setProducts(state, payload) {
        state.products = payload;
    },
    setProduct(state, payload) {
        state.product = payload;
    },
    deleteProductById(state, payload) {
        const index = state.products.findIndex(item => item.id === payload)
        if (index !== -1)
            state.products.splice(index, 1)
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};










