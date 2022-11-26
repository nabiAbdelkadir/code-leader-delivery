const state = {
    notificationsCount: 0
};
const getters = {
    notificationsCount(state) {
        return state.notificationsCount;
    },
};
const actions = {};

const mutations = {
    setNotificationsCount(state, payload) {
        state.notificationsCount = payload;
    },
    incrementNotificationsCount(state, payload) {
        state.notificationsCount += payload;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};










