import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/jwt.service";
import {func as $convert} from "@/core/utils/convertor";
import {getSecureToken} from "@/core/services/auth";

let token = ''
const ApiService = {
    getBaseUrl() {
        return "http://localhost:8000/api/v1"
    },
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = this.getBaseUrl();
        this.setHeader();
    },
    setToken(newToken) {
        token = newToken
        this.setHeader()
    },

    setHeader() {
        token = getSecureToken()
        Vue.axios.defaults.headers.common["Authorization"] = `Token ${JwtService.getToken()}`;
        Vue.axios.defaults.headers.common["x-auth-token"] = token;
        Vue.axios.defaults.headers.common["Content-Type"] = 'application/json';
        Vue.axios.defaults.headers.common["Access-Control-Allow-Origin"] = '*';
    },

    query(resource, params) {
        return Vue.axios.get(resource, params).catch(error => {
            // console.log(error);
            throw new Error(`[KT] ApiService ${error}`);
        });
    },

    async postWithFormData2(url, toServer, file) {
        return await this.upload2("post", url, toServer, file)
    },
    async putWithFormData2(url, toServer, file) {
        return await this.upload2("put", url, toServer, file)
    },

    async upload2(method, url, toServer, file) {
        let formData = new FormData()
        const config = {headers: {"Content-Type": "multipart/form-data"}}

        if (file)
            formData.append('image', file)
        $convert.toFormData(toServer, formData) // convert object to formData

        console.log('formData ' + JSON.stringify(formData))

        if (method === "post")
            return await ApiService.post2(url, formData, config)
        // return await ApiService.putWithParams(url, formData, config)
        return await Vue.axios.put(url, formData, config)
    },

    async postWithFormData(url, toServer, fileRecords, keys) {
        return await this.upload(url, 'post', toServer, fileRecords, keys)
    },

    async putWithFormData(url, toServer, fileRecords, keys) {
        return await this.upload(url, 'put', toServer, fileRecords, keys)
    },

    async upload(url, method, toServer, fileRecords, keys = ['image', 'gallery']) {
        let formData = new FormData()
        const config = {headers: {"Content-Type": "multipart/form-data"}}

        fileRecords.forEach((file, index) => {
            index === 0 ? formData.append(keys[0], file.file) : formData.append(keys[1], file.file)
        })
        $convert.toFormData(toServer, formData) // convert object to formData
        if (method === "post")
            return await ApiService.post('/products', formData, config)
        return await ApiService.put('/products', formData, config)
    },

    update(resource, slug, params) {
        return Vue.axios.put(`${resource}/${slug}`, params);
    },


    put(resource, params) {
        return Vue.axios.put(`${resource}`, params);
    },

    putWithParams(url, data, params) {
        return Vue.axios.put(url, data, {params});
    },

    async delete(url) {
        const response = await this.delete2(url)
        return response.data
    },
    async delete2(url, config = undefined) {
        return Vue.axios.delete(url, config)
            .then(result => {
                return result
            })
            .catch(error => console.log(JSON.stringify(error.response)));
    },

    async post(url, data) {
        const response = await this.post2(url, data)
        return response.data
    },

    post2(url, data) {
        //console.log("create " + JSON.stringify(data))
        return Vue.axios.post(url, data)
            .then(result => {
                //console.log('result from post2' + JSON.stringify(result))
                return result
            })
            .catch(e => {
                //console.log("error post" + e)
                console.log("error.response " + JSON.stringify(e.response))
            });
    },

    async get(url, params = undefined) {
        const response = await this.get2(url, params)
        return response.data
    },

    async get2(url, params = undefined) {
        return Vue.axios.get(url, {params})
            .then(result => {
                return result
            })
            .catch(error => console.log(error.message));
    },


};

export default ApiService;
