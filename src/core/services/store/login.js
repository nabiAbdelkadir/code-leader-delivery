'use strict'
import Vue from "vue";
import ApiService from "@/core/services/api.service";
import {setSecureToken, setRoles, setUser, getUser, removeAuth, setIsAdmin} from "@/core/services/auth";
import roles from "@/core/data/roles.ts";


export const state = () => ({
    token: null,
    userAuth: {},
    roles: null
});

const getters = {
    token(state) {
        return state.token;
    },
    userAuth(state) {
        return state.userAuth;
    },
    roles(state) {
        return state.roles;
    }
};

export const actions = {
    async loginAuth({commit, state}, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ApiService.post2('/auth/agent', payload)
                console.log("response auth  " + JSON.stringify(response))
                if (response.status === 200) {
                    const {token, agent} = response.data
                    //console.log('test user ' + JSON.stringify(roleItems))

                    //commit('setUserAuth', user)
                    //commit('setRoles', roleItems)

                    setSecureToken(token)
                    // setRoles(roleItems)
                    setUser(agent)

                    ApiService.setToken(token)

                    resolve(response.data)
                } else {
                    Vue.prototype.$sweet.errorMessages('invalid email or password')
                    reject(response)
                }
            } catch (e) {
                console.log("error.auth  " + JSON.stringify(e.response))
                Vue.prototype.$sweet.errorMessages('invalid email or password')
                reject('error')
            }
        })
    },

    async getUserByToken({commit, state}, payload) {
        console.log('call getUserByToken ')
        const response = await Vue.prototype.$api.getItems('/users/me')
        const {role: {roleItems}} = response

        //console.log('roleItems -> getUserByToken' + JSON.stringify(roleItems))
        commit('setRoles', roleItems)
        response.role = undefined
        commit('setUserAuth', response)

        localStorage.setItem('roles', JSON.stringify(roles))
        setRoles(roles)
        setUser(state.userAuth)

    }
};

export const mutations = {
    setToken(state, payload) {
        state.token = payload
    },
    setUserAuth(state, payload) {
        state.userAuth = payload
    },
    setRoles(state, payload) {
        state.roles = payload
    },
    loadAuth(state) {
        state.userAuth = getUser()
    },

    destroySession(state) {
        state.userAuth = {}
        state.token = null
        state.roles = null
        ApiService.setToken('')// remove token
        removeAuth()
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
