export default {
    common: [
        {text: '#id', value: 'id'},
        {text: 'Référence', value: 'ref'},
        {text: 'client', value: 'clientName', customTd: true},
        //{text: 'Téléphone', value: 'clientPhone'},
        //{text: 'Téléphone2', value: 'clientPhone2'},
        //{text: 'wilaya', value: 'wilaya'},
        //{text: 'commune', value: 'commune'},
        //{text: 'address', value: 'address'},
        {text: 'type', value: 'type', custom: true},//(stopDisk , isHome =true )

        {text: 'remarque', value: 'remark'},
        //{text: 'suivi remarques', value: 'remarks' , custom: true},
        //{text: 'source', value: 'source.name'},

        //{text: "Prix d'achat", value: 'buyingPrice'},
        //{text: 'prix de la commande', value: 'orderPrice'},
        {text: 'Total', value: 'totalFinal'},
        {text: 'bénéfice net', value: 'netProfit'},
        {text: 'frais de port', value: 'shippingCost'},
        //{text: 'diffShipping', value: 'diffShipping'},

        {text: 'Assignée à', value: 'assignedTo.name', class: "badge badge-light fw-bolder"},

        //{text: 'Crée le', value: 'requestedOn', custom: true, type: 'date'},

        {text: "Action", custom: true},
    ],
    common2: [// 2-> 7
        {text: 'tracking', value: 'tracking'},
        //{text: 'Frais livreur', value: 'shippingCompanyCost'},
        //{text: 'confirmé par', value: 'confirmer.name', class: "badge badge-light fw-bolder"},//Ask
        // {text: 'Transporteur', value: 'shippingCompany.name', class: "badge badge-light fw-bolder"},//Ask
    ],
    inConfirmation: [
        {text: 'status', value: 'status'},
    ],
    inDispatch: [//2
        {text: 'expedée', value: 'isShipped', custom: true},// inDispatch  from history (createdAt ? statusOrder === 2 :: last item)
        {text: 'Confremée le ', value: 'inDispatch', custom: true, type: 'date'},// inDispatch  from history (createdAt ? statusOrder === 2 :: last item)
    ],

    inDelivery: [//3
        {text: 'date', value: 'inDelivery'},
        //{text: 'livreur', value: 'shippingCompany.name'}, // En liv ....
        //{text: 'Frais livreur', value: 'shippingCompanyCost'},// livrées ...
        //{text: 'Livée le', value: 'deliveredOn'},// livrées ...
        // {text: 'BonId', value: 'bon'},// livrées ...
    ],
    delivered: [//4
        {text: 'date', value: 'delivered', custom: true, type: 'date'},
    ],

    failed: [//5 inReturn
        {text: 'Demandée le', value: 'failed', custom: true, type: 'date'},
        //{text: 'Demandée le ', value: 'shippingCompanyCost'}, //En rout  from history (last)
        //{text: 'return Fees', value: 'returnFees'}, //En rout  from history (last)
    ],

    payment: [//6
        // {text: 'date', value: 'payments', custom: true, type: 'date'},
        {text: 'isPaid', value: 'isPaid', custom: true},
    ],

    returns: [//7
        //{text: 'date', value: 'retours', custom: true, type: 'date'},
        {text: 'isReturned', value: 'isReturned', custom: true},
    ],
    canceled: [//8
        {text: 'date', value: 'canceled', custom: true, type: 'date'},
    ]
}
