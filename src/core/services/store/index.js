import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import htmlClass from "./htmlclass.module";
import config from "./config.module";
import breadcrumbs from "./breadcrumbs.module";
import profile from "./profile.module";
import orders from "./orders";
import common from "./common";
import communes from "./communes";
import statusOrder from "./statusOrder";
import product from "./product";
import user from "./user"; //moderators
import client from "./client";
import resource from "./resource";
import login from "./login";
import shop from "./shop";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        htmlClass,
        config,
        breadcrumbs,
        profile,
        orders,
        common,
        communes,
        statusOrder,
        product,
        user,
        client,
        resource,
        login,
        shop,
    }
});
