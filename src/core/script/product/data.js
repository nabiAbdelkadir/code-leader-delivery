import validate from "@/core/data/validate.ts";

export const data = {
    validate,
    formName: "form",
    fileUploadDescription: 'Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted',
    btnSave: 'crée le produit',

    isActiveOptions: [
        {value: true, label: 'oui'},
        {value: false, label: 'no'},
    ],
    isStockOptions: [
        {value: true, text: 'Autoriser la confirmations'},
        {value: false, text: 'Refuser la confirmations'},
    ],
    shops: [],
    shopsSelected: [],

    selectOption: [], //productOptionsType use in selectBox
    productOptionsType: [],//original
    wilayasSelected: [],
    isActiveMinStock: false,
    keys: ["id", 'nameFr', 'nameAr', 'sku', 'buyingPrice', 'sellingPrice', 'quantity',
        'isStock', 'qteAlert', 'isActive', 'costs', 'shops', 'image'],
    product: {
        shop: [1],
        nameFr: 'product fr',
        nameAr: 'product Ar ',
        sku: (Math.random() * 1000).toFixed(0) + '',
        image: null,
        buyingPrice: 500,
        sellingPrice: 120,
        quantity: 0,
        isStock: true,
        qteAlert: 0,
        isActive: true,
        productOptions: [],
        costs: []
    },
    initSku: null,
    oldCosts: [],
    tabs: [],
    strTabs: ['General', 'Advanced'],
    key: 1,// update child component
}

