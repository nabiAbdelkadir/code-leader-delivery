import Vue from "vue";
import {deleteItem, deleteItemById, getItemById, getItems, insertItem} from "@/core/services/store/functions";

const state = {
    resources: [],
    resource: {},
};
const getters = {
    resources(state) {
        return state.resources;
    },
    resource(state) {
        return state.resource;
    },
};
const actions = {
    async getResources({commit}, payload) {
        return await getItems(commit, '/sources', payload, 'setResources')
    },
    async getResource({commit}, payload) {// url : items/:id payload {params}
        return await getItemById(commit, '/sources/' + payload, {}, 'setResource')
    },

    async insertResource({commit}, payload) {
        return await insertItem(commit, '/sources', payload, null)

    },

    async updateResource({commit}, payload) {
        return await Vue.prototype.$api.putItem(`/sources/${payload.id}`, payload)
    },

    async deleteResourceById({commit}, payload) {
        return Vue.prototype.$sweet.deleteItems().then(async () => {
            //await deleteItemById(commit, '/sources', payload, 'deleteResourceById')
            await deleteItemById(commit, '/sources', payload, null)
        })
    }
};

const mutations = {
    setResources(state, payload) {
        state.resources = payload;
    },
    insertResources(state, payload) {
        state.resources.unshift(payload)
    },
    updateResource(state, payload) {
        const findIndex = state.resources.findIndex(({id}) => id === payload.id)
        if (findIndex !== -1)
            state.resources.splice(findIndex, 1, payload)
    },

    deleteResourceById(state, payload) {
        deleteItem(state, payload, 'clients', 'clientsCount')
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};










