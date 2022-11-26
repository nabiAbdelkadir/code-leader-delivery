<template>
  <div>
    <label>Assign<span class="text-danger">*</span> </label>
    <el-select
        clearable
        v-model="form.userId"
        placeholder="Assign"
    >
      <el-option
          v-for="item in usersOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>

    <div class="modal-footer flex-center">
      <button class="btn btn-primary " @click="submit" :disabled="disabledSubmit">
        Assign
      </button>
      <div class="btn btn-light-primary" @click="$bvModal.hide('add-user')">
        Annuler
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "AddUserToOrder",
  props: {
    selected: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      form: {
        userId: ''
      }
    }
  },
  computed: {
    ...mapGetters(['usersOptions']),
    disabledSubmit() {
      return !this.form.userId
    }
  },
  methods: {
    submit() {
      const ids = this.selected.map(({id}) => id)
      const params = {id: ids}
      this.$api.putItem(`/orders`, this.form, params).then(() => this.$bvModal.hide('add-user'))
    }
  },
  async created() {
    await this.$store.dispatch("getUsers")
  }
}
</script>

<style scoped>

</style>
