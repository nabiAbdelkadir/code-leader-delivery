<template>
  <div class="container-80">
    <statistical-cards/>
    <div class="row">
      <div class="col-lg-8">
        <top-products/>
        <div class="row">
          <div class="col-lg-6">
            <delivery-rate class="mt-7"/>
          </div>
          <div class="col-lg-6">
            <confirmation-rate class="mt-7"/>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <top-source/>
        <top-users/>
      </div>

    </div>

  </div>
</template>

<script>

import StatisticalCards from "@/view/components/partials/home/StatisticalCards";
import TopProducts from "@/view/components/partials/home/TopProducts";
import TopSource from "@/view/components/partials/home/TopSource";
import TopUsers from "@/view/components/partials/home/TopUsers";
import {SET_BREADCRUMB} from "@/core/services/store/breadcrumbs.module";
import DeliveryRate from "@/view/components/partials/home/DeliveryRate";
import ConfirmationRate from "@/view/components/partials/home/ConfirmationRate";


export default {
  name: "dashboard",
  components: {ConfirmationRate, DeliveryRate, TopUsers, TopSource, TopProducts, StatisticalCards},
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{title: "dashboard"}]);
  },
  data() {
    return {};
  },
};
</script>


