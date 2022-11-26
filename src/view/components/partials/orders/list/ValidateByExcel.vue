<template>
  <div>
    <input id="file-upload"
           type="file"
           :key="key"
           @change="onFileChanged"
           accept=".xlsx,.xls,.csv"/>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ValidateByExcel",
  data() {
    return {
      key: 0
    }
  },
  props: {
    statusId: {
      type: Number,
      required: true
    }
  },

  methods: {
    clickFileInput() {
      let fileUpload = document.getElementById('file-upload')
      if (fileUpload != null)
        fileUpload.click()
    },

    onFileChanged(event) {
      this.selectedFile = event.target.files[0]
      this.onUpload()
    },

    async onUpload() {
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      const headers = {'Content-Type': 'multipart/form-data'};
      const params = {statusOrder: this.statusId, isExcel: true}

      let url = ''

      if (this.statusId === 2)//Expédier par Excel // done
        url = 'orders/to/shipped'

      else if (this.statusId === 3)//Demander le retour par Excel //done
        url = '/orders/to/failed'

      else if (this.statusId === 4) {//Valider par Excel //done
        url = '/orders/to/payments'

      } else if (this.statusId === 6)//Confirmer par Excel // done
        url = '/orders/to/confirm-payments'
      else
        return this.$sweet.errorMessages('invalid status')

      try {
        const res = await axios.put(url, formData, {headers, params})
        this.key++
        this.selectedFile = null
        console.log('res from excel  ' + JSON.stringify(res))

        if (this.statusId === 2)
          this.$emit('handelResToShipped', res.data?.success)//update isShipped to true

        else if (this.statusId === 4)
          this.$emit('paymentDetails', res.data)//send response & open dialog

        else if (this.statusId === 6) {
          this.$emit('handelConfirmResponse', res.data?.success)

        } else // delete from list
          this.$emit('handelResponse', res.data)//delete from list

        this.$sweet.successInsert()

      } catch (err) {
        console.log('err ' + JSON.stringify(err))
        this.$sweet.errorMessages()
      }
    },
  }
}
</script>

<style scoped>
input {
  display: none;
  height: 0;
}
</style>
