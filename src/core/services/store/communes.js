import ApiService from "@/core/services/api.service";

const state = {
    selectOptionsWilays: [],//use in select options (component)
    wilaysCommune: [],
};
const getters = {
    selectOptionsWilays(state) {
        return state.selectOptionsWilays;
    },
    wilaysCommune(state) {
        return state.wilaysCommune;
    },
};
const actions = {
    async getWilaysCommune({commit}, payload) {
        //console.log("get Orders")
        try {
            const wilaysCommune = await ApiService.get("/wilaya?includes=true")
            //console.log(`response getOrders ${JSON.stringify(orders)}`)
            commit("setWilaysCommune", wilaysCommune)
            commit("setSelectOptionsWilays")
            return state.wilaysCommune
        } catch (e) {
            console.log("error getWilaysCommune" + e)
            console.log("error.response " + JSON.stringify(e.response))
        }
    },
    /*
    * deleteOrderById({commit}, payload) {
        commit("deleteOrderById", payload)
    }
    * */
};

const mutations = {
    setWilaysCommune(state, payload) {
        state.wilaysCommune = payload;
    },
    setSelectOptionsWilays(state) {
        state.selectOptionsWilays = state.wilaysCommune.map(wilaya => {
            return {
                label: wilaya.name,
                value: wilaya.id
            }
        })
        // state.selectOptionsWilays = payload;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};










