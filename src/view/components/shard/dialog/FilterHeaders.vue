<template>
  <div>
    <pre v-if="false">{{ selected }}</pre>
    <label>Lés colonnes </label>
    <el-select
        v-model="selected"
        clearable
        multiple
        collapse-tags
        placeholder="Sélectionner">
      <el-option
          v-for="item in originalHeaders"
          :key="item.text"
          :label="item.text"
          :value="item.text">
      </el-option>
    </el-select>

    <div class="modal-footer flex-center">
      <div class="btn btn-primary " @click="filter">
        Filter
      </div>
      <div class="btn btn-light-primary" @click="$bvModal.hide('filter-modal')">
        Annuler
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "FilterHeaders",
  props: {
    originalHeaders: {
      type: [Array, Object],
      required: true
    },
    headers: {//selected
      type: [Array, Object],
      required: true
    },
  },
  data() {
    return {
      selected: []
    }
  },
  methods: {
    close() {

    },
    filter() {
      const originalHeaders = this.originalHeaders.map(header => header.text)

      const removedItems = JSON.parse(this.$cookies.get('removedItems'));
      this.selected.forEach(se => {
        const findIndex = removedItems.findIndex(removedItem => removedItem === se)
        console.log('findIndex ' + findIndex)

        if (findIndex !== -1)
          removedItems.splice(findIndex, 1)
      })

      this.$cookies.set('removedItems', JSON.stringify(removedItems));


      this.$emit('filter-header', this.getDifference(originalHeaders, this.selected))
      this.$bvModal.hide('filter-modal')
    },

    getDifference(array1, array2) {
      return array1.filter(object1 => {
        return !array2.some(object2 => {
          return object1 === object2;
        });
      });
    }
  },
  created() {
    this.selected = this.headers.map(header => header.text)
  }
}
</script>

<style scoped>

</style>
