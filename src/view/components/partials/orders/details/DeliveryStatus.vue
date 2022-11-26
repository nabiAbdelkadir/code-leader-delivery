<template>
  <default-card title="statuts livraison" :body-card="false" class="">
    <template #card-body>
      <div class="row align-self-center">
        <div class="col-lg-5">
          <label>Motif</label>
          <el-select
              v-model="attempt.description"
              clearable
              placeholder="Sélectionner un motif ">
            <el-option
                v-for="item in statusModels"
                :key="item.label"
                :label="item.label"
                :value="item.label">
            </el-option>
          </el-select>

        </div>

        <div class="col-lg-5">
          <label>comment</label>
          <el-input
              v-model="attempt.comment"
              placeholder="comment"/>
        </div>

        <div class="">
          <mini-add-button
              @click.native="addAttempt"
              :disabled="attempt.description.length === 0"
              text="Ajouter un Tentative" style="margin-top: 45px"/>
        </div>

        <vs-table v-if="items.length > 0" class="mt-7 col-lg-12">

          <template #thead>
            <vs-tr>

              <vs-th v-for="header in headers" :key="header.text"
                     @click="items = $vs.sortData($event ,items, header.text)">
                {{ header.text.toUpperCase() }}
              </vs-th>
            </vs-tr>
          </template>

          <template #tbody>
            <vs-tr
                :key="i"
                v-for="(tr, i) in $vs.getPage($vs.getSearch(items, ''), 1, 10000)"
                :data="tr"
            >

              <vs-td v-for="item in headers" :key="item.text" :class="{'custom-td' : item.customTd}">
              <span v-if="!item.custom"> <!--simple text-->
                {{ $convert.getData(item.value, tr) /* tr -> object */ }}
              </span>

              </vs-td>

            </vs-tr>

          </template>

        </vs-table>

        <table-default class="mt-5 col-lg-10" :headers="headers" :items="order['attempts']" v-if="false"/>
      </div>
      <empty-data v-if="items.length ===0"/>
    </template>
  </default-card>
</template>


<script>
import TableDefault from "@/view/components/shard/tabes/TableDefault";
import {mapGetters} from "vuex";
import ApiService from "@/core/services/api.service";
import EmptyData from "@/view/components/shard/layout/EmptyData";


export default {
  name: "DeliveryStatus",
  components: {EmptyData, TableDefault},
  data() {
    return {
      items: [],
      attempt: {
        description: '',
        type: false,
        comment: ""
      },
      headers: [
        {text: "l'utilisateur", value: 'username'},
        {text: 'Motif', value: 'motif'},
        {text: 'comment', value: 'comment'},
        {text: 'crée le', value: 'createdAt'},
      ],
      statusModels: {},//Motif model
      statusModelSelected: '',//Motif
    }
  },
  computed: mapGetters(["order"]),
  methods: {
    async addAttempt() {
      const {description, comment} = this.attempt
      if (description.length === 0 && comment.length === 0)
        return console.log("error please choice comment ")

      const toServer = Object.assign({}, this.attempt);
      toServer.description = description + '|' + comment


      toServer.orderId = this.order.id

      console.log('toServer ' + JSON.stringify(toServer))


      this.$api.postItem('/attempts', toServer).then(order => {
        const temp = order.description?.split("|")
        const motif = temp[0] ? temp[0] : '-'
        const comment = temp[1] ? temp[1] : '-'

        this.items.unshift({
          ...order,
          motif,
          comment,
          createdAt: order.createdAt.toString().slice(0, 10)
        })
      })

    }
  },

  async created() {
    const statusModel = await ApiService.get("/status-models?type=false");
    this.statusModels = statusModel.map(status => ({label: status.nameFr}))
  },

  watch: {
    order(newVal, oldVal) {
      this.attempt.orderId = newVal.id
      newVal.statusOrderId === 1 ? this.attempt.type = true : this.attempt.type = false

      newVal['attempts'].forEach(order => {
        if (order.type === false) {
          const temp = order.description?.split("|")
          const motif = temp[0] ? temp[0] : '-'
          const comment = temp[1] ? temp[1] : '-'
          this.items.push({
            ...order,
            motif,
            comment,
            createdAt: order.createdAt.toString().slice(0, 10)
          })
        }
      })
    }
  }
}
</script>