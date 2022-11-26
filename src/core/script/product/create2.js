import KTUtil from "@/assets/js/components/util";
import KTWizard from "@/assets/js/components/wizard";
import steps from '@/core/config/data/product.steps'
import {required} from "vuelidate/lib/validators";
import ApiService from "@/core/services/api.service";
import ProductSteps from "@/view/components/partials/ProductSteps";
import {requiredField} from "@/core/utils/validator";
import axios from "axios";
import MTextField from "@/view/components/custum/MTextField";
//import {toFormData} from "@/core/utils/convertor";

export default {
    name: "create-product",
    components: {ProductSteps, MTextField},
    data() {
        return {
            fileRecords: [
                /*
                *
                * {
                    "name": "",
                    "size": 262,
                    "type": "image/jpg",
                    "ext": "PNG",
                    "url": "https://cdn.pixabay.com/photo/2017/10/10/00/03/kids-2835430_960_720.jpg",
                },*/
            ],
            uploadUrl: 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3',
            uploadHeaders: {'X-Test-Header': 'vue-file-agent'},
            fileRecordsForUpload: [], // maintain an upload queue

            steps: [],
            shops: [],
            shopSelected: [],
            brands: [],
            product: {
                _reduction: null,//temp let (calc promoPrice)
                shop: ['shop-1'],
                nameFr: 'product-1',
                nameAr: 'المنتوج بالعربي',
                sku: '',
                image: '',
                barcode: '',
                buyingPrice: '5000',
                sellingPrice: '3500',
                promoPrice: '',
                quantity: '',
                isStock: 'autoriser la confirmations',
                qteAlert: '',
                isActive: 'oui',
                brandId: '',
                supplierId: '',
                brand: {},
                supplier: {},
            },
        }
    },
    mounted() {
        // Initialize form wizard
        const wizard = new KTWizard("kt_wizard_v2", {
            startStep: 1,
            clickableSteps: true
        });
        //Change event
        wizard.on("change", function () {
            setTimeout(() => {
                KTUtil.scrollTop();
            }, 500);
        });
    },
    validations: {
        product: {
            nameFr: {required},
            shop: {required},
            buyingPrice: {required},
            isStock: {required},
            isActive: {required},
        },
    },
    methods: {
        deleteUploadedFile: function (fileRecord) {
            this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord);
        },
        filesSelected: function (fileRecordsNewlySelected) {
            let validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
            this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
        },
        onBeforeDelete: function (fileRecord) {
            let i = this.fileRecordsForUpload.indexOf(fileRecord);
            if (i !== -1) {
                this.fileRecordsForUpload.splice(i, 1);
                let k = this.fileRecords.indexOf(fileRecord);
                if (k !== -1) this.fileRecords.splice(k, 1);
            } else {
                if (confirm('Are you sure you want to delete?')) {
                    this.$refs.vueFileAgent.deleteFileRecord(fileRecord);
                }
            }
        },
        fileDeleted: function (fileRecord) {
            let i = this.fileRecordsForUpload.indexOf(fileRecord);
            if (i !== -1) {
                this.fileRecordsForUpload.splice(i, 1);
            } else {
                this.deleteUploadedFile(fileRecord);
            }
        },

        async submit() {
            this.$v.$touch();
            if (!this.$v.product.$invalid) {
                const loading = this.$vs.loading({text: 'Create product ...'})
                let toServer = Object.assign({}, this.product);

                const brand = this.brands.find(brand => brand.name === this.product.brand.name)
                if (brand)
                    toServer.brandId = brand.id

                this.product.isActive === 'oui' ? toServer.isActive = true : toServer.isActive = false
                this.product.isStock === 'autoriser la confirmations' ? toServer.isStock = true : toServer.isStock = false


                const response = await ApiService.postWithFormData("/products", toServer, this.fileRecordsForUpload)
                this.fileRecordsForUpload = [];
                console.log("response upload " + JSON.stringify(response))

                setTimeout(function () {
                    loading.close();
                }, 2000);
            }
        },

        requiredField(target) {
            return requiredField(target)
        }
    },

    async created() {
        this.steps = steps;
        this.shops = await ApiService.get('/common?table_name=Shop')
        this.brands = await ApiService.get('/common?table_name=Brand')
        const id = this.$route.params.id

        if (id !== 'create') {
            const product = await ApiService.get(`/products/${id}`)
            if (product) {
                this.product = product
            }
            console.log("get product" + JSON.stringify(product))
        }
    },

    watch: {
        'product._reduction': function (newVal, oldVal) {
            if (newVal) {
                const promo = this.product.buyingPrice - newVal
                promo > 0 ? this.product.promoPrice = promo : this.product.promoPrice = 0
            } else
                this.product.promoPrice = null
        },
    }
};
