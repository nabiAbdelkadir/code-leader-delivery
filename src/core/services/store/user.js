import ApiService from "@/core/services/api.service";
import {deleteItemById, deleteItem} from "@/core/services/store/functions";
import Vue from "vue";

const state = {
    users: [],
    usersOptions: []// use in select-Box
};
const getters = {
    users(state) {
        return state.users;
    },
    usersOptions(state) {
        return state.users.map(item => {
            return {
                label: item.name,
                value: item.id
            }
        })
    }
};
const actions = {
    async insertUser({commit}, payload) {
        Vue.prototype.$api.postItem('/users', payload).then(res => {
            commit('insertUser', res.user)
        })
    },

    async updateUser({commit}, payload) {
        try {
            const response = await ApiService.putWithParams('/users/' + payload.id, payload)
            console.log("response update  " + JSON.stringify(response.data))

            if (response && response.status === 200) {
                Vue.prototype.$sweet.successUpdate()
                commit('updateUser', payload)
                return true
            }
            Vue.prototype.$sweet.errorMessages(response)

        } catch (e) {
            console.log("error.put-user  " + JSON.stringify(e.response))
            if (e.response?.status === 400 && e.response.data === 'password is wrong')
                Vue.prototype.$sweet.errorMessages('le mot de passe est erroné')
        }
    },

    async getUsers({commit}, payload) {
        try {
            const users = await ApiService.get("/users")
            //console.log(`response getOrders ${JSON.stringify(users)}`)
            commit("setUsers", users)
            return state.users
        } catch (e) {
            console.log("error users" + e)
            console.log("error.response " + JSON.stringify(e.response))
        }
    },

    async deleteUserById({commit}, payload) {
        await deleteItemById(commit, '/users', payload, 'deleteUserById')
    }
};

const mutations = {
    insertUser(state, payload) {
        state.users.unshift(payload)
    },
    updateUser(state, payload) {
        const findIndex = state.users.findIndex(user => user.id === payload.id)
        if (findIndex !== -1)
            state.users.splice(findIndex, 1, payload)
    },
    setUsers(state, payload) {
        state.users = payload;
    },
    deleteUserById(state, payload) {
        deleteItem(state, payload, 'users')
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};










