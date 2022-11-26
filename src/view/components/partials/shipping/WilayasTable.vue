<template>
  <div class="body-scroll mb-7">
    <pre v-if="false">{{ wilayas }}</pre>
    <table class="table table-head-custom table-vertical-center table-head-bg table-borderless">
      <thead>
      <tr class="text-left">
        <th class="text-dark-75 text-center" v-for="header  in headers" :key="header">
          {{ header }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(wilaya ,index ) in wilayas" :key="index">
        <td class="pl-0 pt-2 mt-2">
            <span class="d-block  text-center">
            {{ wilaya.name }}
            </span>
        </td>

        <td v-for="item  in status " :key="item.value">
                <span class="text-center">
                  <span class="checkbox-inline">
                    <label class="checkbox">
                      <input type="checkbox"
                             v-model="wilaya[item.value]" @change="check(item.value , index , wilaya[item.value])"/>
                      <span></span>
                      {{ item.text }}
                    </label>
                </span>
              </span>
        </td>

        <td v-for="(field ,index2 ) in  Object.keys(wilaya.fields)" :key="index2">
          <b-form-input
              class="text-center"
              @keyup.prevent="change(field , wilaya.fields[field] , index  , wilaya.id)"
              type="number"
              min="0"
              v-model.number="wilaya.fields[field]"
          ></b-form-input>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ApiService from "@/core/services/api.service";

export default {
  name: "WilayasTable",
  props: {
    headers: {
      type: [Array],
      required: true
    },
    status: {
      type: [Array],
      required: true
    },
    fields: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      wilayas: [],
      originalWilayas: [],
    }
  },

  methods: {
    getWilayas() {
      let result = []
      this.wilayas.forEach(item => {
        if (item.id !== -1 && (item.isHome || item.isStopDisk)) {// remove first item &...
          result.push(item)
        }
      })
      return result
    },

    getStatusKeys() {
      const result = {}
      this.status.forEach(item => {
        result[item.value] = false
      })
      //console.log(JSON.stringify(result))
      return result
    },

    change(key, value, index) {
      //console.log('key ' + key + ' value ' + value + ' index ' + index)
      if (index === 0) {
        this.wilayas.forEach(wilaya => {
          wilaya.fields[key] = this.wilayas[0].fields[key]
        })
      }
    },

    check(key, index, value) {
      /*
      * console.log('check index ' + index + " key " + key + 'value ' + value)
      if (key === 'isHome') {
        if (value)
          this.wilayas[index].fields.homeDeliveryFees = 0
        else
          this.wilayas[index].fields.homeDeliveryFees = ''
      }
      * */
      if (index === 0)
        this.wilayas.forEach(wilaya => {
          wilaya[key] = this.wilayas[0][key]
        })
    },

    initWilays() {
      this.wilayas = this.originalWilayas.map((item, index) => {
        return {
          id: item.id,
          name: item.name,
          wilayaId: item.id,
          fields: Object.assign({}, this.fields),
          ...this.getStatusKeys(),
          /*
          *  fields: {
             FreshDelivery: null,
             PickupFees: null,
             ReturnCosts: null,
           },
          * */
        }
      })
      console.log('initWilays ' + JSON.stringify(this.wilayas))
    }
  },
  async created() {
    this.shops = await ApiService.get('/common?table_name=Shop')
    this.originalWilayas = await ApiService.get('/wilaya')
    this.originalWilayas.length = 5

    this.originalWilayas.unshift({id: -1, name: "Toutes"})
    this.initWilays()
  },
  watch: {
    'wilayas'(newValue) {
      console.log(' watch wilayas ')
      const dd = [
        {
          "id": -1,
          "name": "Toutes",
          "wilayaId": -1,
          "fields": {
            "homeDeliveryFees": null,
            "pickupFees": null,
            "returnFees": null
          },
          "isHome": false
        },
        {
          "id": 1,
          "name": "Adrar",
          "wilayaId": 1,
          "fields": {
            "homeDeliveryFees": null,
            "pickupFees": null,
            "returnFees": null
          },
          "isHome": false
        },
        {
          "id": 2,
          "name": "Chlef",
          "wilayaId": 2,
          "fields": {
            "homeDeliveryFees": null,
            "pickupFees": null,
            "returnFees": null
          },
          "isHome": false
        },
        {
          "id": 3,
          "name": "Laghouat",
          "wilayaId": 3,
          "fields": {
            "homeDeliveryFees": null,
            "pickupFees": null,
            "returnFees": null
          },
          "isHome": false
        },
        {
          "id": 4,
          "name": "Oum El Bouaghi",
          "wilayaId": 4,
          "fields": {
            "homeDeliveryFees": null,
            "pickupFees": null,
            "returnFees": null
          },
          "isHome": false
        },
        {
          "id": 5,
          "name": "Batna",
          "wilayaId": 5,
          "fields": {
            "homeDeliveryFees": null,
            "pickupFees": null,
            "returnFees": null
          },
          "isHome": false
        }
      ]
    }
  }

}
</script>

<style scoped>
.table.table-vertical-center td {
  vertical-align: unset !important;
}

tr:nth-child(even) {
  background-color: #f9fcfd;
}

.body-scroll {
  max-height: 50vh;
  overflow-y: scroll;
}
</style>
