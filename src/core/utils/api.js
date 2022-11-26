import ApiService from "@/core/services/api.service";

import Vue from "vue";
import {getRoles, isAdmin} from "@/core/services/auth";
//import store from "@/core/services/store";

import roles from "@/core/data/roles2.ts";

const _options = {
    showError: true,
    showSuccess: true,
    errorMessage: "L'élément a été supprimé avec succès.",
    successMessage: 'Your work has been saved.'
}

export const func = {
    postItem: (url, data, options = _options) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ApiService.post2(url, data)
                console.log("response create " + JSON.stringify(response))
                if (response.status === 201 || response.status === 200) {
                    if (options['showSuccess'] === true)
                        Vue.prototype.$sweet.successInsert()
                    resolve(response?.data)
                } else {
                    if (options['showError'])
                        Vue.prototype.$sweet.errorMessages()
                    reject(response)
                }

            } catch (e) {
                console.log("error postItem" + e)
                console.log("error.postItem  " + JSON.stringify(e.response))
                if (options['showError'])
                    Vue.prototype.$sweet.errorMessages()
                reject('error')
            }

        })
    },

    postItemWithFormData2: (url, data, file, options = _options) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ApiService.postWithFormData2(url, data, file)
                //console.log("response create $api" + JSON.stringify(response))
                if (response.status === 201) {
                    if (options['showSuccess'] === true)
                        Vue.prototype.$sweet.successInsert()
                    resolve(response?.data)
                } else {
                    if (options['showError'])
                        Vue.prototype.$sweet.errorMessages()
                    reject(response)
                }

            } catch (e) {
                console.log("error postItem" + e)
                console.log("error.postItem  " + JSON.stringify(e.response))
                if (options['showError'])
                    Vue.prototype.$sweet.errorMessages()
                reject('error')
            }

        });
    },

    putItem: (url, data, params, options = _options) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ApiService.putWithParams(url, data, params)
                //console.log("response update  " + JSON.stringify(response))
                if (response && response.status === 200) {
                    if (options['showSuccess'] === true)
                        Vue.prototype.$sweet.successInsert()
                    resolve(response.data)
                } else {
                    if (options['showError'] === true) {
                        Vue.prototype.$sweet.errorMessages()
                        reject(response)
                    }
                }

            } catch (e) {
                console.log("error putItem" + e)
                console.log("error.putItem  " + JSON.stringify(e.response))
                if (options['showError'] === true) {
                    Vue.prototype.$sweet.errorMessages()
                    reject('error')
                }
            }

        })
    },

    putItemWithFormData2: (url, data, file, options = _options) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ApiService.putWithFormData2(url, data, file)
                if (response && response.status === 200) {
                    if (options['showSuccess'] === true)
                        Vue.prototype.$sweet.successInsert()
                    resolve(response.data)
                } else {
                    if (options['showError'] === true) {
                        Vue.prototype.$sweet.errorMessages()
                        reject(response)
                    }
                }

            } catch (e) {
                console.log("error.putItem  " + JSON.stringify(e.response))
                if (options['showError'] === true) {
                    Vue.prototype.$sweet.errorMessages()
                    reject('error')
                }
            }

        })
    },

    getItems: async (url, params, activeErrorDialog = true) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ApiService.get2(url, params)
                //console.log("response getItems  " + JSON.stringify(response))
                if (response.status === 200)
                    resolve(response.data)
                else {
                    if (activeErrorDialog)
                        Vue.prototype.$sweet.errorMessages()
                }
                reject(response)
            } catch (e) {
                console.log("error getItems" + e)
                console.log("error.getItems  " + JSON.stringify(e.response))
                if (activeErrorDialog)
                    Vue.prototype.$sweet.errorMessages()
                reject(e.response)
            }
        })
    },

    isUnique: async (tableName, field, object, initUniqueField) => {
        return new Promise(async (resolve, reject) => {
            // في حالة كانت القيمة الابتدائية تساوي قيمة الحقل فهذا يعني انه لم يتم تغييره و بالتالي لاداعي لعمل  تاست
            if (object[field] === initUniqueField)
                resolve('ok')

            const params = {
                table_name: tableName,
                field,
                vlaue: object[field]
            }
            const response = await Vue.prototype.$api.getItems('/common/unique', params)
            if (response === 0)
                return resolve(response)

            Vue.prototype.$sweet.errorMessages(`le ${field} doit être unique`)
        })
    },

    deleteItems: async (url, options = _options) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ApiService.delete2(url)
                //console.log("delete response " + JSON.stringify(response))
                if (response.status === 204) {
                    if (options['showSuccess'] === true)
                        Vue.prototype.$sweet.successInsert()
                    resolve(response?.data)
                } else {
                    if (options['showError'])
                        Vue.prototype.$sweet.errorMessages()
                    reject(response)
                }

            } catch (e) {
                console.log("error deleteItem" + e)
                console.log("error.deleteItem  " + JSON.stringify(e.response))
                if (options['showError'])
                    Vue.prototype.$sweet.errorMessages()
                reject('error')
            }
        })
    },

    exportExcel: async (apiUrl, fileName) => {
        /*
        *    const array = apiUrl.split('/');
        const random = "_" + Math.floor(Math.random() * 5000) + 1;
        (!fileName && array.length > 2) ? fileName = array[1] + random : fileName = random
        *
        *  const response = await ApiService.get(apiUrl, {responseType: 'blob'});
        const url = URL.createObjectURL(
            new Blob([response.data], {
                type: "application/vnd.ms-excel",
            })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${fileName}.xlsx`);
        document.body.appendChild(link);
        link.click();
        * */

        location.href = `${ApiService.getBaseUrl()}${apiUrl}`
    },

    checkRole: (heading, item = heading) => {
        const rolesFromLocalStorage = roles.roleItems

        try {
            const result = rolesFromLocalStorage[heading][item] ? rolesFromLocalStorage[heading][item] : false
            //console.log('heading ' + heading + ' item ' + item + ' result ' + result)
            return result
        } catch (er) {
            return false
        }
    }
}
Vue.prototype.$api = func


