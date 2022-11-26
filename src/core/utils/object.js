function searchWord(arrayObject, searchWord, excludeKeys = []) {// return All items (use excludeKeys)
    if (!arrayObject || arrayObject.length === 0)
        return []

    let result = []
    searchWord = searchWord.toString().toLowerCase()
    let keys = Object.keys(arrayObject[0])//any item

    excludeKeys.forEach(excludeKey => keys = keys.filter(key => !key.includes(excludeKey)))

    arrayObject.forEach(el => {

        keys.forEach(key => {
            const element = el[key] + ''
            if (element.toLowerCase().includes(searchWord))// toString (because id is Number )
                return result.push(el)
        })
    })
    return result
}

function searchWordByKeys(arrayObject, searchWord, keys) {// return All items (use keys)
    if (!arrayObject || arrayObject.length === 0)
        return []

    let result = []
    searchWord = searchWord.toString().toLowerCase()
    console.log(`keys is ${JSON.stringify(keys)}`)

    arrayObject.forEach(el => {
        keys.forEach(key => {
            const element = el[key] + '' // toString (because id is Number )
            if (element.toLowerCase().includes(searchWord))
                return result.push(el)
        })
    })
    return result
}


export {searchWord, searchWordByKeys}
