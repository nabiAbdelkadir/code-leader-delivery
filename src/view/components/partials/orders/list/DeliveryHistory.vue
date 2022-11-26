<template>
  <div class="card-body pt-4">
    <div class="timeline timeline-6 mt-3">
      <template v-for="(item, i) in list">
        <!--begin::Item-->
        <div class="timeline-item align-items-start" :key="i">
          <!--begin::Label-->
          <div class="timeline-label font-weight-bolder text-dark-75 font-size-lg w-200">
            {{ item.time }}
          </div>
          <!--end::Label-->

          <!--begin::Badge-->
          <div class="timeline-badge">
            <i class="icon-xl fa fa-genderless" v-bind:class="item.badge"></i>
          </div>
          <!--end::Badge-->

          <!--begin::Text-->
          <div
              class="font-weight-mormal font-size-lg timeline-content text-muted pl-3"
          >
              <span :class="{'font-weight-bolder text-dark-75': item.bold,'mr-4': item.images}"
                    v-html="item.desc"
              ></span>
            <br/>
            <span class="font-size-sm ">
               <i class="fa fa-location-arrow fa-sm" :class="item.badge"></i>
              {{ item.location }}
            </span>
          </div>
          <!--end::Text-->
        </div>
        <!--end::Item-->
      </template>
    </div>
    <!--end: Items-->
  </div>
</template>

<script>
import yalidineStatus from "@/core/config/data/yalidineStatus";

export default {
  name: "DeliveryHistory",
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      yalidineStatus,
      list: [
        {
          time: "2020-03-02 09:49:01",
          desc: "Outlines of the recent activities that happened last weekend",
          badge: " text-success"
        },
        {
          time: "2020-03-02 09:49:01",
          desc: "AEOL meeting",
          bold: true,
          badge: " text-danger"
        },
        {
          time: "2020-03-02 09:49:01",
          desc: `Make deposit USD 700. to ESL`,
          badge: " text-info",
          bold: true
        },
        {
          time: "2020-03-02 09:49:01",
          desc: "Indulging in poorly driving and keep structure keep great",
          badge: " text-danger"
        },
        {
          time: "2020-03-02 09:49:01",
          desc: "New order placed #XF-2356.",
          badge: " text-success",
          bold: true
        },
        {
          time: "2020-03-02 09:49:01",
          desc: `Outlines keep and you honest. Indulging in poorly driving`,
          badge: "text-warning"
        },
        {
          time: "2020-03-02 09:49:01",
          desc: "Indulging in poorly driving and keep structure keep great",
          badge: " text-danger"
        },
        {
          time: "2020-03-02 09:49:01",
          desc: "New order placed #XF-2356.",
          badge: "text-info",
          bold: true
        }
      ]
    };
  },
  methods: {
    getBadge(status) {
      const findItem = this.yalidineStatus.find((item) => item.text === status)
      return findItem ? findItem.badge : 'text-danger'
    },
    getLocation(wilaya, commune) {
      let wilayaName = wilaya ? wilaya : ''
      let communeName = commune ? commune : ''
      return wilayaName + ' ' + communeName
    }
  },
  async created() {
    const params = {
      'shippingCompanyId': this.order['companyId'],
      'tracking': this.order['tracking']
    }
    console.log("params is " + JSON.stringify(params))
    const history = await this.$api.getItems('/shipping-company/delivery-api/histories', params)
    console.log("history is " + JSON.stringify(history))

    this.list = history.map(item => {
      return {
        time: item['date_status'],
        desc: item['status'],
        location: this.getLocation(item['wilaya_name'], item['commune_name']),
        badge: this.getBadge(item['status']),
        bold: true,
      }
    })
  }
}
</script>

<style scoped>
.timeline.timeline-6:before {
  left: 200px !important;
}

.timeline.timeline-6 .timeline-item .timeline-badge {
  width: 17px !important;
}

.w-200 {
  width: 200px !important;
}
</style>
