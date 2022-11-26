import {deleteItemById, getItemById, getItemsWithRows, deleteItem} from "@/core/services/store/functions";

const state = {
    clients: [],
    client: [],
    clientsCount: null
};
const getters = {
    clients(state) {
        return state.clients;
    },
    client(state) {
        return state.client;
    },
    clientsCount(state) {
        return state.clientsCount;
    },
};

const actions = {
    async getClients({commit}, payload) {
        console.log('display payload ' + JSON.stringify(payload))

        return await getItemsWithRows(commit, '/client', payload, 'setClients', 'setClientCount')
    },
    async getClient({commit}, payload) {// url : items/:id payload {params}
        return await getItemById(commit, '/client/' + payload, {}, 'setClient')
    },
    async deleteClientById({commit}, payload) {
        await deleteItemById(commit, '/client', payload, 'deleteClientById')
    }
};


const mutations = {
    setClients(state, payload) {
        state.clients = payload;
    },
    setClient(state, payload) {
        state.client = payload;
    },
    setClientCount(state, payload) {
        state.clientsCount = payload;
    },
    deleteClientById(state, payload) {
        deleteItem(state, payload, 'clients', 'clientsCount')
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};










