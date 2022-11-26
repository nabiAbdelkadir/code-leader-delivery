import ApiService from "@/core/services/api.service";
import Vue from "vue";

async function insertItem(commit, url, data, commitName = null) {
    Vue.prototype.$api.postItem(url, data).then(res => {
        if (commitName != null)//no need to insert item in to  list
            commit(commitName, res)
    })
}

async function updateItem(commit, url, data, commitName = null) {
    Vue.prototype.$api.putItem(url + '/' + data.id, data).then(res => {
        if (commitName != null)//no need to update item in to  list
            commit(commitName, data)
    })
}

async function deleteItemById(commit, url, payload, commitName) {
    try {
        const response = await ApiService.delete2(url + '/' + payload)
        if (response.status === 204) {
            if (commitName != null)//no need to update item in to  list
                commit(commitName, payload)//itemId

            Vue.prototype.$sweet.successDelete()
        } else
            Vue.prototype.$sweet.errorMessages()

    } catch (e) {
        Vue.prototype.$sweet.errorMessages()
        console.log("error deleteItemById" + e)
        console.log("error deleteItemById  " + JSON.stringify(e.response))
    }
}

async function deleteItemsByIds(commit, url, payload, commitName) {
    const params = {
        id: payload // [id1 , id2 ...etc ]
    }
    try {
        const response = await ApiService.delete2(url, {params})// payload = [id1 , id2 ...etc ]
        if (response.status === 204) {
            commit(commitName, payload)
            Vue.prototype.$sweet.successDelete()
        } else
            Vue.prototype.$sweet.errorMessages()

    } catch (e) {
        console.log("error deleteItemsByIds" + e)
        console.log("error.delete deleteItemsByIds  " + JSON.stringify(e.response))
    }
}

async function getItemById(commit, url, payload, commitName) {
    try {
        const item = await ApiService.get(url, payload)
        commit(commitName, item)
        return item
    } catch (e) {
        console.log("error product" + e)
        console.log("error.product " + JSON.stringify(e.response))
    }
}

async function getItemsWithRows(commit, url, payload, commitData, commitCount) {
    try {
        const response = await ApiService.get(url, payload)
        commit(commitData, response.rows)
        commit(commitCount, response.count)
        return response.rows
    } catch (e) {
        console.log("error getItems" + e)
        console.log("error.response " + JSON.stringify(e.response))
    }
}

async function getItems(commit, url, payload, commitName) {
    try {
        const response = await ApiService.get(url, payload)
        commit(commitName, response)
        return response
    } catch (e) {
        console.log("error getItems" + e)
        console.log("error.response " + JSON.stringify(e.response))
    }
}


/*Begin Mutations  */
function deleteItem(state, payload, listItems, listItemsCount) {
    const index = state[listItems].findIndex(item => item.id === payload)
    if (index !== -1) {
        state[listItems].splice(index, 1)

        if (listItemsCount)
            state[listItemsCount] = state[listItems].length
    }
}


function deleteItems(state, payload, listItems, listItemsCount) {
    payload.forEach(itemId => {
        const index = state[listItems].findIndex(item => item.id === itemId)
        if (index !== -1)
            state[listItems].splice(index, 1)
    })
    if (listItemsCount)
        state[listItemsCount] = state[listItems].length
}

function setItem(state, payload, listItems) {
    const index = state[listItems].findIndex(item => item.id === payload.id)
    if (index !== -1)
        state[listItems].splice(index, 1, payload)
}

/*End  Mutations  */

export {
    deleteItemById,
    deleteItem,
    getItemById,
    getItemsWithRows,
    getItems,
    insertItem,
    deleteItemsByIds,
    deleteItems,
    updateItem,
    setItem
}
