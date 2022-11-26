import mainMenu from "@/core/config/mainMenu.ts";
import roles from "@/core/data/roles.ts";
import Vue from "vue";
import store from "@/core/services/store";


export default async function log({next, to, router}) {
    /*
    * let {roles, userAuth} = store.getters
    if (roles === null) {
        console.log('middleware  -> checkRole')
        const res = await store.dispatch('getUserByToken')
        roles = res['roles']
        userAuth = res['userAuth']
    }

    console.log('from checkRole roles ' + JSON.stringify(roles))
    console.log('from checkRole userAuth ' + JSON.stringify(userAuth))
    * */

    const {name: routerName, path, params} = to

    const result = mainMenu[0].pages.find(({sub}) => {
        return sub.find((item) => {
            //if (!item.role)// في حالة عدم وجوده يعني ان هذه الصفحة لا تحتاج الى صالحية الوصول
            //  return false
            return item.name === routerName
        });
    });
    /*GET role name*/

    if (!result)
        return console.log("error role ...")

    const pageItem = result['sub'].find(({name}) => name === routerName)

    //console.log('role ' + JSON.stringify(pageItem.role))

    const hasPermission = Vue.prototype.$api.checkRole(pageItem.role.heading, pageItem.role.item)
    //console.log('check role ' + hasPermission)

    /*
    * if (to.name !== 'dashboard')
        return router.push({name: 'ProductOptions'});
    * */

    return next();
}

