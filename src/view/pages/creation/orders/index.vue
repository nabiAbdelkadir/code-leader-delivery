<template>
  <default-card style="min-height: 80vh">
    <template #card-body>
      <div class="row mt-7 mb-7">
        <div class="col mt-2">
          <search v-model="search" class="border"/>
        </div>

        <div class="col d-flex justify-content-end align-self-center align-items-center">

          <!--BEGIN ACTION DROPDOWN -->
          <b-dropdown size="sm" text="Action" class="m-3">
            <b-dropdown-item-button @click='$api.exportExcel("/example")'
                                    class="dropdown-sm">
              <span><i class="fa fa-download text-primary fa-sm mr-2"></i>Télécharger Exemple Excel</span>
            </b-dropdown-item-button>

            <b-dropdown-item-button @click="$bvModal.show('filter-modal')"
                                    class="dropdown-sm">
              <span> <i class="fas fa-eye text-black-50 fa-sm mr-2"></i>Visibilité des colonnes</span>
            </b-dropdown-item-button>

            <b-dropdown-item-button @click="back"
                                    :disabled="selected.length === 0"
                                    v-if="$api.checkRole(statusOrderSelected, 'Revenir en arrière')"
                                    class="dropdown-sm">
              <span> <i class="fa fa-undo text-warning fa-sm mr-2"></i>Revenir en arrière</span>
            </b-dropdown-item-button>

            <!--BEGIN IN_CONFIRMATION -->

            <b-dropdown-item-button @click="deleteItem(selected)"
                                    v-if="$api.checkRole(statusOrderSelected, 'Supprimer')"
                                    class="dropdown-sm"
                                    :disabled="selected.length === 0">
              <span> <i class="fa fa-trash text-danger fa-sm mr-2"></i>Supprimer les commandes</span>
            </b-dropdown-item-button>

            <b-dropdown-item-button @click="toDispatch(selected)"
                                    :disabled="selected.length === 0"
                                    v-if="$api.checkRole(statusOrderSelected, 'Confirmer les commandes')"
                                    class="dropdown-sm">
              <span> <i class="fa fa-check  text-success fa-sm mr-2"></i>Confirmer les commandes</span>
            </b-dropdown-item-button>

            <b-dropdown-item-button @click="$bvModal.show('add-user')"
                                    :disabled="selected.length === 0"
                                    v-if="$api.checkRole(statusOrderSelected, 'Assigner à un employé')"
                                    class="dropdown-sm">
              <span> <i class="fa fa-random  text-primary fa-sm mr-2"> </i>Assigner à un employé</span>
            </b-dropdown-item-button>

            <!--End IN_CONFIRMATION -->

            <!--BEGIN IN_CONFIRMATION && IN_DISPATCH -->
            <b-dropdown-item-button
                v-if="$api.checkRole(statusOrderSelected, 'Annuler')"
                :disabled="selected.length === 0"
                class="dropdown-sm" @click="$bvModal.show('canceled-orders')">
              <span><i class="fa fa-times  text-danger fa-sm mr-2"></i>Annuler les commandes</span>
            </b-dropdown-item-button>
            <!--BEGIN IN_CONFIRMATION && IN_DISPATCH -->

            <!--BEGIN IN_DISPATCH -->
            <b-dropdown-item-button v-if="$api.checkRole(statusOrderSelected, 'Imprimer les étiquettes')"
                                    :disabled="selected.length === 0"
                                    class="dropdown-sm">
              <span><i class="fa fa-print text-primary fa-sm mr-2"></i> Imprimer les étiquettes</span>
            </b-dropdown-item-button>

            <b-dropdown-item-button
                v-if="$api.checkRole(statusOrderSelected, 'Envoyer à la livraison')"
                :disabled="selected.length === 0"
                @click="nextStatusServer(selected, '/orders/to/in-delivery')"
                class="dropdown-sm">
              <span><i class="fa fa-check text-black-50 fa-sm mr-2"></i>Envoyer à la livraison</span>
            </b-dropdown-item-button>

            <b-dropdown-item-button
                v-if="$api.checkRole(statusOrderSelected, 'Expédier')"
                :disabled="selected.length === 0"
                @click="toShipped"
                class="dropdown-sm">  <!-- En dispatch  ->  En livraison-->
              <span><i class="fa fa-check text-black-50 fa-sm mr-2"></i> Expédier les commandes</span>
            </b-dropdown-item-button>


            <b-dropdown-item-button
                v-if="$api.checkRole(statusOrderSelected, 'Expédier par Excel')"
                @click="clickExcel"
                class="dropdown-sm">
              <span><i class="fa fa-check text-success fa-sm mr-2"></i>Expédier par Excel</span>
            </b-dropdown-item-button>


            <b-dropdown-item-button @click="nextStatusServer(selected, '/orders/to/delivered')"
                                    :disabled="selected.length === 0"
                                    v-if="$api.checkRole(statusOrderSelected, 'Valider la livraison')"
                                    class="dropdown-sm">
              <span><i class="fa fa-check text-success fa-sm mr-2"></i>Valider la livraison</span>
            </b-dropdown-item-button>

            <b-dropdown-item-button @click="nextStatusServer(selected, '/orders/to/failed')"
                                    :disabled="selected.length === 0"
                                    v-if="$api.checkRole(statusOrderSelected, 'Demander le retour')"
                                    class="dropdown-sm">
              <span><i class="fa fa-times text-danger fa-sm mr-2"></i>Demander le retour</span>
            </b-dropdown-item-button>

            <b-dropdown-item-button @click="$refs['validate-excel'].clickFileInput()"
                                    v-if="$api.checkRole(statusOrderSelected, 'Demander le retour par Excel')"
                                    class="dropdown-sm">
              <span><i class="fa fa-upload text-dark fa-sm mr-2"></i>Demander le retour par Excel</span>
            </b-dropdown-item-button>

            <!--END DELIVERY -->

            <!--BEGIN DELIVERED -->
            <b-dropdown-item-button
                @click="validate"
                :disabled="selected.length === 0"
                v-if="$api.checkRole(statusOrderSelected, 'Valider la réception')" class="dropdown-sm">
              <span><i class="fa fa-print text-primary fa-sm mr-2"></i>Valider la réception</span>
            </b-dropdown-item-button> <!--DELIVERED , FAILED-->


            <b-dropdown-item-button
                @click="$refs['validate-excel'].clickFileInput()"
                v-if="$api.checkRole(statusOrderSelected, 'Valider par excel')" class="dropdown-sm">
              <span><i class="fa fa-download  text-primary fa-sm mr-2"></i>Valider par excel</span>
            </b-dropdown-item-button>

            <!--BEGIN DELIVERED -->

            <!--BEGIN PAYMENT && RETURNED  -->
            <b-dropdown-item-button
                @click="confirm"
                :disabled="selected.length === 0"
                v-if="$api.checkRole(statusOrderSelected, 'Confirmer')" class="dropdown-sm">
              <span><i class="fa fa-check text-primary fa-sm mr-2"></i>Confirmer</span>
            </b-dropdown-item-button>

            <b-dropdown-item-button
                @click="$refs['validate-excel'].clickFileInput()"
                v-if="$api.checkRole(statusOrderSelected, 'Confirmer par Excel')" class="dropdown-sm">
              <span><i class="fa fa-check text-primary fa-sm mr-2"></i>Confirmer par Excell</span>
            </b-dropdown-item-button>

            <!--END FAILED -->

            <!--BEGIN CANCELED -->
            <b-dropdown-item-button v-if="$api.checkRole(statusOrderSelected, 'Restaurer')"
                                    :disabled="selected.length === 0"
                                    @click="nextStatusServer(selected , '/orders/to/canceled-in-confirmation')"
                                    class="dropdown-sm">
              <span><i class="fa fa-check text-primary  fa-sm mr-2"></i>Restaurer</span>
            </b-dropdown-item-button>
            <!--End CANCELED -->

          </b-dropdown>
          <!--END ACTION DROPDOWN -->

          <b-dropdown size="sm" :text="statusOrderSelected" class="mr-3">
            <b-dropdown-item
                v-for="(status) in statusOrder"
                :key="status.id"
                :active="statusOrderSelected === status.nameFr"
                @click="changeStatusOrder(status)">
              {{ status.nameFr }}
            </b-dropdown-item>
          </b-dropdown>


        </div>

        <validate-by-excel ref="validate-excel"
                           :status-id="statusOrderSelectedId"
                           @handelResponse='handelResponse'
                           @paymentDetails="openPaymentDetails"
                           @handelConfirmResponse='handelConfirmResponse'
                           @handelResToShipped='handelResToShipped'
        />

      </div>

      <empty-data v-if="items.length ===0"/>

      <vs-table v-model="selected" v-else class="mt-10">
        <template #thead>
          <vs-tr>
            <vs-th style="background: red">
              <vs-checkbox
                  :indeterminate="selected.length === items.length" v-model="allCheck"
                  @change="selected = $vs.checkAll(selected, items)"
              />
            </vs-th>

            <vs-th v-for="header in headers" :key="header.text"
                   @click="items = $vs.sortData($event ,items, header.text)">
              {{ header.text.toUpperCase() }}
            </vs-th>

          </vs-tr>

        </template>

        <template #tbody>
          <vs-tr
              :key="i"
              v-for="(tr, i) in $vs.getPage($vs.getSearch(items, search), page, max)"
              :data="tr"
              :is-selected="!!selected.includes(tr)"
              not-click-selected
          >

            <vs-td checkbox>
              <vs-checkbox :val="tr" v-model="selected"/>
            </vs-td>

            <vs-td v-for="item in headers" :key="item.text">
              <span v-if="!item.custom" :class="item.class"> <!--simple text-->
                {{ $convert.getData(item.value, tr) /* tr -> object */ }}
              </span>

              <template v-else-if="item.value==='type'">
                <info :text="tr.type ? 'Livraison à domicile' : 'stop desk' "/>
              </template>

              <template v-else-if="item.value==='remarks'">
                <div class="d-flex justify-center align-center" style="justify-content: center">
                  <span class="">
                   total  ({{ tr[item.value].length }})
                  </span>

                  <vs-tooltip shadow interactivity>
                    <i class="ml-2 fa fa-eye fa-sm text-hover-primary"></i>
                    <template #tooltip>
                      <div class="content-tooltip">
                        <list-details :list="tr[item.value].map(({description} ) => description)"/>
                      </div>
                    </template>
                  </vs-tooltip>
                </div>
              </template>


              <template v-else-if="item.value==='isPaid' || item.value==='isReturned'">
                <default-status :is-active="tr[item.value]" active-text="oui" in-active-text="no"/>
              </template>

              <template v-else-if="item.value==='isShipped'">
                <default-status :is-active="tr[item.value]" active-text="expédiée" in-active-text="pré expédiée"/>
              </template>

              <template v-else-if="item.type ==='date'">
               <span :class="item.class" class="font-weight-600">
                 {{ $convert.timestampToDate(tr[item.value], false) }}
               </span>
              </template>

              <template v-else-if="item.text === 'Action'">
                <b-dropdown size="sm" text="Action" class="m-2">
                  <b-dropdown-item-button class="dropdown-sm" @click="deleteItem(tr , i)"
                                          v-if="$api.checkRole(statusOrderSelected, 'Supprimer') && false">
                    <span><i class="fa fa-trash text-danger fa-sm mr-2"></i>Supprimer</span>
                  </b-dropdown-item-button>

                  <b-dropdown-item-button @click="$router.push(`/orders/${tr.id}`);" class="dropdown-sm">
                    <span><i class="fa fa-paint-brush text-success fa-sm mr-2"></i>Détails </span>
                  </b-dropdown-item-button>

                  <b-dropdown-item-button
                      @click="showDeliveryHistory(tr)"
                      class="dropdown-sm"
                      v-if="statusOrderSelectedId === 3">
                    <span><i class="fa fa-paint-brush text-success fa-sm mr-2"></i>Tracking</span>
                  </b-dropdown-item-button>

                  <b-dropdown-item-button @click="nextStatus(tr)" class="dropdown-sm"
                                          v-if="changeStateText.next && false">
                    <span>  <i class="fa fa-check text-primary fa-sm mr-2"></i> {{ changeStateText.next }}  </span>
                  </b-dropdown-item-button>

                  <b-dropdown-item-button @click="prevStatus(tr)" class="dropdown-sm"
                                          v-if="changeStateText.prev && false">
                    <span> <i class="fa fa-undo text-warning fa-sm mr-2"></i> {{ changeStateText.prev }}  </span>
                  </b-dropdown-item-button>

                </b-dropdown>
              </template>


            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination v-model="page" :length="$vs.getLength($vs.getSearch(items, search), max)"/>
        </template>
      </vs-table>

      <b-modal ref="filter" hide-footer title="Visibilité des colonnes" id="filter-modal">
        <filter-headers
            @filter-header="filterHeader"
            :headers="headers"
            :original-headers="headers"/>
      </b-modal>

      <b-modal ref="filter" hide-footer title="Assigner à un employé" id="add-user">
        <add-user-to-order :selected="selected"/>
      </b-modal>

      <b-modal hide-footer title="Visibilité des colonnes" id="shipping-company">
        <choice-shipping-company @choice-shipping-company='enChoice'/>
      </b-modal>

      <b-modal hide-footer title="Annuler les commandes" id="canceled-orders">
        <canceled-form :selected="selected" :statusOrderSelectedId='statusOrderSelectedId'/>
      </b-modal>

      <b-modal hide-footer title="Détails des paiements" id="payments-details" size="lg">
        <payments-details :payments-details="paymentsDetails"/>
      </b-modal>

      <b-modal id="delivery-history" hide-footer title="suivi de commande" size="lg">
        <delivery-history :order="orderDeliveryHistory"/>
      </b-modal>

      <b-modal id="add-remarks" hide-footer title="Ajouter une remarque">
        <add-remarks :order="orderRemark" :orders="orders"/>
      </b-modal>

    </template>

  </default-card>

</template>

<script src="@/core/script/order/index.js"></script>

<style scoped lang="scss">
.vs-table__th {
  width: 0 !important;
}

td, th {
  //width: 100%;
  padding: 0.85rem 1em !important;
  white-space: nowrap;
}

</style>
