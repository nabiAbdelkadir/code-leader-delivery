import {mapGetters} from 'vuex';
import headers from "@/core/data/orderHerders.ts";
import EyeButton from "@/view/components/partials/orders/buttons/EyeButton";
import FilterHeaders from "@/view/components/shard/dialog/FilterHeaders";
import ChoiceShippingCompany from "@/view/components/partials/orders/list/ChoiceShippingCompany";
import CanceledForm from "@/view/components/partials/orders/list/CanceledForm";
import DeliveryHistory from "@/view/components/partials/orders/list/DeliveryHistory";
import AddUserToOrder from "@/view/components/partials/orders/list/AddUserToOrder";
import PaymentsDetails from "@/view/components/partials/orders/list/PaymentsDetails";
import AddRemarks from "@/view/components/partials/orders/list/AddRemarks";
import ImportExcel from "@/view/components/shard/buttons/ImportExcel";
import ValidateByExcel from "@/view/components/partials/orders/list/ValidateByExcel";
import {SET_BREADCRUMB} from "@/core/services/store/breadcrumbs.module";

import {getUser} from "@/core/services/auth";

export default {
    components: {
        EyeButton,
        FilterHeaders,
        ChoiceShippingCompany,
        CanceledForm,
        DeliveryHistory,
        AddUserToOrder,
        PaymentsDetails,
        ImportExcel,
        ValidateByExcel,
        AddRemarks
    },
    data: () => ({
        search: '',//search in table
        scan: '',
        allCheck: false,
        limit: 300,
        page: 1,//page selected
        max: 10,// max item
        selected: [],//items
        originalHeaders: [],
        headers: [],
        statusOrderSelected: "",
        statusOrderSelectedId: -1,
        shippingCompanyId: undefined,// toDispatch
        orderSelected: {},
        orderDeliveryHistory: {},
        paymentsDetails: {},// after (DELIVERED to payments pass props)
        orderRemark: {},
        companyId: 6,
    }),

    computed: {
        ref() {
            return this.$route.query.ref || undefined
        },
        ...mapGetters(["orders", "statusOrder"]),
        pageName() {
            return this.$route.path.split("/").pop();
        },
        items() {
            return this.orders ? this.orders : []
        },

        changeStateText() {
            if (this.statusOrderSelectedId === 1)//conformation
                return {next: 'à dispatch', prev: null}
            else if (this.statusOrderSelectedId === 2)//dispatch
                return {next: 'à livraison', prev: 'Revenir en arrière'}
            else if (this.statusOrderSelectedId === 3)//delivery
                return {next: 'à livrées', prev: 'Revenir en arrière'}
            else if (this.statusOrderSelectedId === 4)//delivered
                return {next: 'à livrées', prev: 'Revenir en arrière'}
            else if (this.statusOrderSelectedId === 5)//delivered
                return {next: 'à en route', prev: 'Revenir en arrière'}
            else if (this.statusOrderSelectedId === 6)//delivered
                return {next: 'à en route', prev: 'Revenir en arrière'}
            else if (this.statusOrderSelectedId === 7)//delivered
                return {next: 'à en route', prev: 'Revenir en arrière'}
            else if (this.statusOrderSelectedId === 8)//delivered
                return {next: 'à en route', prev: 'Revenir en arrière'}

            return null
        }
    },

    methods: {
        clickExcel() {
            console.log('click excel')
            this.$refs['validate-excel'].clickFileInput()
            this.excelKey++
        },
        addRemark(order) {
            this.orderRemark = order
            this.$bvModal.show('add-remarks')
        },
        async scanRef() {
            const findIndex = this.orders.findIndex(order => order.ref === this.scan)
            if (findIndex !== -1) {
                await this.$api.putItem(`/orders/shipped/${this.scan}`)
                this.orders [findIndex]['isShipped'] = true
                this.scan = ''
            }
        },

        nextStatus(order) {
            if (this.statusOrderSelectedId === 1)
                return this.toDispatch(order)
            else if (this.statusOrderSelectedId === 2)
                return this.nextStatusServer([order], '/orders/to/in-delivery')
            else if (this.statusOrderSelectedId === 3)
                return this.nextStatusServer([order], '/orders/to/delivered')
            else if (this.statusOrderSelectedId === 4)
                return this.nextStatusServer([order], '/orders/to/failed')
        },

        prevStatus(order) {
            if (this.statusOrderSelectedId === 2)
                return this.nextStatusServer([order], '/orders/to/in-confirmation')
            else if (this.statusOrderSelectedId === 3)
                return this.nextStatusServer([order], '/orders/to/in-dispatch')
            else if (this.statusOrderSelectedId === 4)
                return this.nextStatusServer([order], '/orders/to/in-delivery')
            else if (this.statusOrderSelectedId === 5)
                return this.nextStatusServer([order], '/orders/to/delivered')
        },

        /*API SERVER */
        enChoice(shippingCompanyId) {
            this.shippingCompanyId = shippingCompanyId
            this.toDispatch(this.orderSelected)
        },

        toDispatch(order) {
            this.orderSelected = order
            if (!this.shippingCompanyId)
                return this.$bvModal.show('shipping-company')

            const toServer = Array.isArray(order) ? order : [order]
            this.nextStatusServer(toServer, '/orders/to/in-dispatch')
        },

        back() {
            const urls = [
                'in-dispatch-in-confirmation', 'in-delivery-in-dispatch', 'delivered-in-delivery', 'failed-in-delivery',
                'payments-delivered', 'retours-failed']

            const url = `/orders/to/${urls[this.statusOrderSelectedId - 2]}`
            return this.nextStatusServer(this.selected, url)
        },

        async confirm() {// status = 6 || 7
            await this.$sweet.confirm()
            const ids = this.selected.map(({id}) => id)
            const url = this.statusOrderSelectedId === 6 ? '/orders/to/confirm-payments' : '/orders/to/confirm-retours'

            const res = await this.$api.putItem(url, {}, {orderId: ids})
            console.log('res ' + JSON.stringify(res))
            const key = this.statusOrderSelectedId === 6 ? 'isPaid' : 'isReturned'
            this.handelConfirmResponse(ids, key)// use in Excel
        },

        async toShipped() {
            await this.$sweet.confirm()
            const params = {
                orderId: this.selected.map(items => items.id),
            }
            const res = await this.$api.putItem('/orders/to/shipped', {}, params)
            const {success, notification, failure} = res
            this.handelConfirmResponse(success, 'isShipped')
        },

        handelResToShipped(ids) {
            this.handelConfirmResponse(ids, 'isShipped')
        },

        handelConfirmResponse(ids, key) {// 'isPaid'||'isReturned'
            ids.forEach(item => {
                const findIndex = this.orders.findIndex(({id}) => id === item)
                if (findIndex !== -1)
                    this.orders [findIndex] [key] = true
            })
            this.selected = []
            this.orderSelected = {}
        },

        async validate() {
            if (this.statusOrderSelectedId === 4) {
                this.$sweet.confirm().then(async () => {
                    const ids = this.selected.map(items => items.id)
                    const url = this.statusOrderSelectedId === 4 ? '/orders/to/payments' : '/orders/to/'
                    const response = await this.$api.putItem(url, {}, {orderId: ids})

                    ids.forEach(item => {
                        const findIndex = this.orders.findIndex(({id}) => id === item)
                        if (findIndex !== -1)
                            this.orders.splice(findIndex, 1)
                    })
                    console.log('response validate function 4 ' + JSON.stringify(response))

                    this.openPaymentDetails(response)

                    this.selected = []
                    this.orderSelected = {}
                })
            } else
                this.nextStatusServer(this.selected, '/orders/to/retours')
        },

        openPaymentDetails(paymentsDetails) {
            this.paymentsDetails = paymentsDetails
            this.$bvModal.show('payments-details')
        },

        removeOrdersByIds(ids) {
            ids.forEach(item => {
                const findIndex = this.orders.findIndex(({id}) => id === item)
                if (findIndex !== -1)
                    this.orders.splice(findIndex, 1)
            })
            this.shippingCompanyId = undefined
            this.selected = []
            this.orderSelected = {}
        },

        nextStatusServer(orders, url, handelResponse = true) {
            this.$sweet.confirm().then(async () => {
                const params = {
                    orderId: orders.map(items => items.id),
                    shippingCompanyId: this.shippingCompanyId,
                }
                const res = await this.$api.putItem(url, {}, params)
                if (handelResponse)
                    this.handelResponse(res)
            })
        },

        handelResponse(res) {
            console.log('handelResponse res:  ' + JSON.stringify(res))
            const {success, notification, failure} = res
            this.removeOrdersByIds(success)// array of success ids

            if (notification && notification.length > 0)
                this.$store.commit('incrementNotificationsCount', notification.length)
        },

        showDeliveryHistory(order) {
            this.$bvModal.show('delivery-history')
            this.orderDeliveryHistory = order
        },

        async changeStatusOrder(statusOrder) {
            let query = Object.assign({}, this.$route.query);
            if (query.ref)
                await this.$router.replace({query: {}})// remove query from url

            const {id, nameFr: name} = statusOrder
            this.statusOrderSelected = name
            this.statusOrderSelectedId = id
            this.headers = [...headers.common]

            await this.$store.dispatch('getOrders', {
                    statusOrderId: id,
                    limit: this.limit,
                    companyId: this.companyId
                }
            )

            if (id > 1 && id < 8)
                this.addToHeaders(headers.common2)

            const headerKeys = Object.keys(headers)
            const keys = headerKeys.splice(2, headerKeys.length)

            this.addToHeaders(headers [keys [id - 1]])
            this.selected = []//remove selected
        },

        async deleteItem(item) {
            await this.$store.dispatch('deleteOrderById', item)
        },

        filterHeader(removedItems) {
            this.headers = this.$convert.filterHeader(removedItems, this.headers, this.originalHeaders)
            this.$cookies.set('removedItems', JSON.stringify(removedItems));
            this.removeItems()
        },

        addToHeaders(items) {//add before Actions
            const removedItems = JSON.parse(this.$cookies.get('removedItems'));

            items.forEach(item => {
                this.headers.splice(this.headers.length - 1, 0, item)
            })
            this.removeItems()
            //this.$cookies.set('removedItems', JSON.stringify(this.headers));
        },

        getHeadersFromStorage() {
            const removedItems = JSON.parse(this.$cookies.get('removedItems'));
            //if (removedItems)
            //  return this.filterHeader(removedItems)
            this.filterHeader([])
        },

        removeItems() {
            const removedItems = JSON.parse(this.$cookies.get('removedItems'));
            removedItems.forEach(item => {
                const findIndex = this.headers.findIndex(({text}) => text === item)
                if (findIndex !== -1)
                    this.headers.splice(findIndex, 1)
            })
        },

        async init() {
            const user = getUser()
            this.companyId = user['id']

            await this.$store.dispatch('getStatusOrder')
            if (this.statusOrder.length > 0) {//after check roles
                if (this.ref) {
                    const {id, status} = this.$route.query
                    console.log(JSON.stringify(this.$route.query))
                    this.statusOrderSelectedId = parseInt(id)
                    this.statusOrderSelected = status
                } else {// query is empty
                    const {id, nameFr} = this.statusOrder[0]
                    this.statusOrderSelectedId = id
                    this.statusOrderSelected = nameFr
                }

            } else
                return this.$router.push({name: 'login'}) // change redirect to 403 page

            await this.$store.dispatch('getOrders', {
                statusOrderId: this.ref ? undefined : this.statusOrderSelectedId,
                limit: this.limit,
                string: this.ref,
                companyId: this.companyId
            })
            this.originalHeaders = [...headers.common]

            this.getHeadersFromStorage()

        }
    },

    async created() {
        await this.init()
    },
    watch: {
        async ref(newVal) {
            await this.init()
        },
        async statusOrderSelected(newVal) {
            await this.$store.dispatch(SET_BREADCRUMB, [{title: "orders"}, {title: this.statusOrderSelected}]);
        }
    }
}
