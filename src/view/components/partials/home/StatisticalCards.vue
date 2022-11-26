<template>

  <div class="row " style="border-radius: 10px">
    <div class="col-lg-3 container-card" v-for="(card ,index) in cards" :key="index">
      <div class="card card-custom">
        <div class="card-body">
          <div class="d-flex ">
            <div class="w-50">
              <div class="text-header">{{ card.header }}</div>
              <span class="font-size-xs text-muted"> {{ 'Total ' + card.header }}</span>
              <p class="text-count  ">{{ response[card.key] }}</p>
            </div>
            <div class="w-50">
              <img class="w-100 h-100" :src="card.image" alt=""/>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import cards from "@/core/config/data/home/cards";

export default {
  name: "StatisticalCards",
  data() {
    return {
      cards,
      response:{}
    }
  },

  async created() {
    this.response = await this.$api.getItems('/analytics/counts')
    console.log("response " + JSON.stringify(this.response))

    for (const card of this.cards)
      card.counter = await this.$api.getItems(`/common/count?table_name=${card.api}`)
  }
};
</script>

<style scoped lang="scss">
.text-header {
  font-size: 17px;
  font-weight: 600;
}

.text-count {
  text-align: center;
  font-size: 38px;
  font-weight: 600;
  margin-bottom: 0;
}

.container-card:first-of-type > .card {
  border-top: 2px solid #28a745;

  p {
    color: #ff735c;
  }
}

.container-card:nth-of-type(2) > .card {
  border-top: 2px solid #007bff;

  p {
    color: #b659b2;
  }
}

.container-card:nth-of-type(3) > .card {
  border-top: 2px solid #dc3545;

  p {
    color: #893976;
  }
}

.container-card:last-of-type > .card {
  border-top: 2px solid #ffc107;

  p {
    color: #5ae4a7;
  }
}
</style>
