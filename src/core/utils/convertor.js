import Vue from "vue";

export const func = {
    test() {
        return 'this is test'
    },
    /*Begin  FormData*/
    toFormData: (object, formData) => {
        const keys = Object.keys(object)
        keys.forEach(key => {
            if (object[key] !== undefined && object[key] !== null)// object[key] ='false or '') result -> false
                formData.append(key, object[key])
        })
        return formData
    },
    addDynamicKeys: (globalObject, object, key1, key2, returnKey) => {
        for (let index = 0; index < object.length; index++) {
            let key = `${key1}[${index}][${key2}]`
            //console.log(`index ${index} , the key is ${key}`)
            !returnKey ? globalObject [key] = object[index] : globalObject [key] = object[index][returnKey]
        }
        // في حالة عدم تعريف مفتاح الرجوع يتم ارجاع القيمة كما هي
    },

    /*End FormData*/

    /*
    * get data from nested object
    * ex : data : {name :{test:testValue}}
    * getData(name.test, data ) return a testValue
    *
    * */

    getData: (key, obj) => {
        const keys = key.split('.')
        const firstKey = keys[0]
        let result = obj[firstKey];

        try {
            for (let index = 1; index < keys.length; index++)
                result = result [keys[index]]
            //console.log('key ' + key + ' result ' + result)

            return (result !== undefined && result !== null) ? result : '-'//  0 is false
        } catch (err) {
            return '-'
        }
    },
    timestampToDate: (timestamp, fullTime = true) => {
        let d = new Date(timestamp);
        if (fullTime) // :${d.getSeconds()}
            return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
    },
    prepareTabs: (tabs) => {
        const result = []
        for (let index = 0; index < tabs.length; index++) {
            result.push({
                "header": tabs[index],
                "dataTab": index
            })
        }
        result[0].isActive = true
        return result
    },
    filterHeader(removedItems, headers, originalHeaders = null) {//Visibility of columns
        if (originalHeaders !== null && originalHeaders.length > 0)
            headers = [...originalHeaders]

        removedItems.forEach(item => {
            const indexRemoved = headers.findIndex(header => header.text === item)
            if (indexRemoved !== -1)
                headers.splice(indexRemoved, 1)
        })
        return headers //Reactive

    },
    copyDataValues(originalObject, object, keys) {
        keys.forEach(key => {
            // use undefined if (value==false) return ''
            originalObject [key] = object [key] !== undefined ? object [key] : ''
        })
    },
    emptyField(object, keys) {
        keys.forEach(key => {
            object [key] = ''
        })
    },
}

Vue.prototype.$convert = func


