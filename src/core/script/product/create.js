import ApiService from "@/core/services/api.service";
import MFileAgent from "@/view/components/custum/upload/MFileAgent";
import {mapGetters} from "vuex";
import EyeButton from "@/view/components/partials/orders/buttons/EyeButton";
import DefaultTabs from "@/view/components/shard/common/DefaultTabs";

import {data} from "@/core/script/product/data";
import {func as $convert} from "@/core/utils/convertor";
import {SET_BREADCRUMB} from "@/core/services/store/breadcrumbs.module";

export default {
    name: 'CreateProduct',
    components: {MFileAgent, DefaultTabs, EyeButton},
    data: () => ({...data}),

    computed: {
        ...mapGetters(['selectOptionsWilays']),
        isCreate() {
            return this.$route.params.id === 'create'
        }
    },

    mounted() {
        this.$store.dispatch(SET_BREADCRUMB, [{title: "Produits"}, {title: "Ajouter un produit"}]);
        this.tabs = this.$convert.prepareTabs(this.strTabs);
    },

    methods: {
        getDifference(array1, array2) {
            return array1.filter(object1 => {
                return !array2.some(object2 => {
                    return object1 === object2;
                });
            });
        },

        addOptions() {
            this.product.productOptions?.push({
                optionsSelected: '',//use in v-model color size ...
                productOptionItems: [],// use in SelectBox
                optionsSelectedItem: [],//use in v-model
            })
        },

        choiceOption(index) {
            const productOptionsType = this.productOptionsType
                .find(item => item.id === this.product.productOptions[index].optionsSelected)

            this.product.productOptions[index].optionsSelectedItem = ''
            this.product.productOptions[index].productOptionItems = []

            if (productOptionsType) {
                this.product.productOptions[index].productOptionItems = productOptionsType?.items.map(item => {
                    return {
                        label: item.nameFr,
                        value: item.id
                    }
                })
            }
        },

        submitForm() {
            this.$refs[this.formName].validate(async (valid) => {
                if (valid) {
                    //console.log('test ' + this.initSku + '  and   ' + this.product.sku)
                    this.$api.isUnique('Product', 'sku', this.product, this.initSku).then(async (res) => {
                        let toServer = Object.assign({}, this.product);
                        if (!this.isActiveMinStock)
                            toServer.qteAlert = null

                        /*
                          * toServer.shopsInsert = this.product.shop.map(shop => {
                              return {"shopId": shop}
                          })

                          toServer.optionInsert = this.product.productOptions.map(item => {
                              return {productOptionsItemId: item.optionsSelectedItem}
                          })
                          * */

                        this.$convert.addDynamicKeys(toServer, toServer.shop, 'shopsInsert', 'shopId')

                        this.$convert.addDynamicKeys(toServer, toServer.productOptions,
                            'optionInsert', 'productOptionsItemId', 'optionsSelectedItem')


                        for (let index = 0; index < toServer.costs.length; index++) {
                            toServer[`costs[${index}][homeDeliveryFees]`] = toServer.costs [index]["homeDeliveryFees"]
                            toServer[`costs[${index}][stopDeskFees]`] = toServer.costs [index]["stopDeskFees"]
                            toServer[`costs[${index}][wilayaId]`] = toServer.costs [index]["wilayaId"]
                        }
                        toServer.costs = undefined

                        console.log('toServer ' + JSON.stringify(toServer))

                        /*
                        * if (this.isCreate)
                            return this.$api.postItem('/products', toServer).then(r => this.resetForm())

                        const id = this.$route.params.id
                        await this.$api.putItem(`/products/${id}`, toServer)
                        * */


                        const fileImage = this.$refs.image.$data.selectedFile
                        console.log('the file image is ' + fileImage)

                        if (this.isCreate)
                            return await this.$api.postItemWithFormData2('/products', toServer, fileImage)
                        //return await ApiService.postWithFormData2('/products', toServer, fileImage)
                        //return this.$api.postItem('/products', toServer).then(r => this.resetForm())

                        const id = this.$route.params.id
                        this.$api.putItemWithFormData2(`/products/${id}`, toServer, fileImage).then(r => {
                            this.initSku = toServer.sku
                        })
                    })
                }
            });
        },

        resetForm() {
            this.$refs[this.formName].resetFields();
        },

        async init() {
            this.key++// update child

            await this.$store.dispatch("getWilaysCommune")
            this.shops = await ApiService.get('/common?table_name=Shop')
            this.productOptionsType = await ApiService.get("/product-options-type")
            this.selectOption = this.productOptionsType.map(item => {
                return {
                    value: item.id,
                    label: item.nameFr,
                }
            })
            this.product.costs = []
            this.wilayasSelected = []
            this.product.productOptions = []

            if (this.isCreate) {
                this.resetForm()
                this.product.image = null
            } else {
                console.log('update product ')
                const id = this.$route.params.id
                const product = await this.$api.getItems(`/products/${id}`)
                this.initSku = product.sku

                this.$convert.copyDataValues(this.product, product, this.keys)
                //console.log('after copy ' + JSON.stringify(this.product))

                this.product.shop = this.product.shops.map(({id}) => id)//get shopId
                this.isActiveMinStock = !(this.product.qteAlert === 0)

                this.product.costs.forEach(cost => {
                    const wilaya = this.selectOptionsWilays.find(({value}) => value === cost.wilayaId)
                    cost.wilaya = wilaya?.label //@nabi
                    this.wilayasSelected.push(wilaya?.label)
                })

                product.options.forEach(op => {
                    const productOptionsType = this.productOptionsType.find(item => item.id === op.productOptionId)
                    this.product.productOptions.push({
                        optionsSelected: op.productOptionId,
                        productOptionItems: productOptionsType?.items.map(item => {
                            return {
                                label: item.nameFr,
                                value: item.id
                            }
                        }),
                        optionsSelectedItem: op.id
                    })
                })
                //console.log("get product" + JSON.stringify(this.product))
            }
        }
    },

    async created() {
        await this.init()
    },
    watch: {
        async '$route'(to, from) {
            await this.init()
        },
        'wilayasSelected'(newVal, oldVal) {
            if ((newVal.length > oldVal.length)) {//insert
                const findWilaya = this.selectOptionsWilays.find(item => item.label === newVal[newVal.length - 1])
                this.product.costs.push({
                    wilayaId: findWilaya?.value,
                    wilaya: findWilaya?.label,//last-item
                    stopDeskFees: null,
                    homeDeliveryFees: null,
                })
                //const difference = this.getDifference(newVal, oldVal)
                //console.log("deference  insert " + JSON.stringify(difference))
            } else {
                const difference = this.getDifference(oldVal, newVal)
                //console.log("deference  delete  " + JSON.stringify(difference))

                const findIndex = this.product.costs.findIndex(cost => cost.wilaya === difference[0])
                //console.log('index removed is ' + findIndex)
                if (findIndex !== -1)
                    this.product.costs.splice(findIndex, 1)
            }


            //console.log("deference  " + JSON.stringify(this.getDifference(newVal, oldVal)))
        },
    },

}
