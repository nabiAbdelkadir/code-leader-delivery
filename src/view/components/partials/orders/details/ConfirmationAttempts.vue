<template>
  <default-card title="Tentatives de confirmation" :body-card="false" class="">
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
              :disabled="attempt.description.length > 0"
              placeholder="comment"/>
        </div>

        <div class="">
          <mini-add-button
              @click.native="addAttempt"
              text="Ajouter un Tentative" style="margin-top: 45px"/>
        </div>

        <vs-table v-if="items.length > 0" class="mt-7 col-lg-10">

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
  name: "ConfirmationAttempts",
  components: {EmptyData, TableDefault},
  data() {
    return {
      items: [],
      attempt: {
        username: "codeX",
        description: '',
        type: true,
        comment: ""
      },
      headers: [
        {text: "l'utilisateur", value: 'username'},
        {text: 'description', value: 'description'},
        {text: 'crée le', value: 'createdAt'},
      ],
      statusModels: {},//Motif model
      statusModelSelected: '',//Motif
    }
  },
  computed: {
    /*
    * items2() {
      return this.order['attempts'] ? this.order['attempts'] : []
    },
    * */
    ...mapGetters(["order"]),
  },
  methods: {
    async addAttempt() {
      const {description, comment} = this.attempt
      if (description.length === 0 && comment.length === 0)
        return console.log("error please choice comment ")

      const toServer = Object.assign({}, this.attempt);

      if (comment.length > 0 && description.length === 0)
        toServer.description = this.attempt.comment

      toServer.description = toServer.description.split('-').pop()

      console.log('toServer ' + JSON.stringify(toServer))


      this.$api.postItem('/attempts', toServer).then(res => {
        //this.order['attempts'].unshift(res)
        this.items.unshift(res)
      })

    }
  },

  async created() {
    const statusModel = await ApiService.get("/status-models?type=true");
    this.statusModels = statusModel.map(({nameFr}, index) => {
      return {
        label: `${index + 1} - ${nameFr}`,//send String
      }
    })
  },

  watch: {
    order(newVal, oldVal) {
      this.attempt.orderId = newVal.id
      newVal.statusOrderId === 1 ? this.attempt.type = true : this.attempt.type = false

      newVal['attempts'].forEach(order => {
        if (order.type === true)
          this.items.push(order)
      })
    }
  }
}
</script>

<style scoped>

</style>
