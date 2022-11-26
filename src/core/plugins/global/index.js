import Vue from 'vue'

import "@/core/plugins/global/buttons/mini";
import "@/core/plugins/global/buttons/index";
import "@/core/plugins/global/input/input";
import "@/core/plugins/global/cards/index";
import "@/core/plugins/global/charts/index";

import ListDetails from '@/view/components/shard/common/ListDetails.vue'
import InvalidData from '@/view/components/partials/InvalidData.vue'

import DeleteDialog from "@/view/components/shard/dialog/DeleteDialog";

import DefaultTableImage from "@/view/components/shard/images/DefaultTableImage";

import DefaultStatus from "@/view/components/shard/spans/DefaultStatus";
import Info from "@/view/components/shard/spans/Info";

import InfoAlert from "@/view/components/shard/alert/InfoAlert";

import ModalFooter from "@/view/components/shard/common/ModalFooter";

import UploadAvatar from "@/view/components/shard/upload/UploadAvatar";

import EmptyData from "@/view/components/shard/layout/EmptyData";
import EmptyChart from "@/view/components/shard/layout/EmptyChart";
import DefaultImage from "@/view/components/shard/images/DefaultImage";


Vue.component('invalid-data', InvalidData)

Vue.component('DefaultTableImage', DefaultTableImage)

/* start Dialog components */
Vue.component('DeleteDialog', DeleteDialog)
/* End Dialog components */

Vue.component('DefaultStatus', DefaultStatus)
Vue.component('Info', Info)

Vue.component('InfoAlert', InfoAlert)

Vue.component('ModalFooter', ModalFooter)

Vue.component('UploadAvatar', UploadAvatar)

Vue.component('EmptyData', EmptyData)
Vue.component('EmptyChart', EmptyChart)

Vue.component('DefaultImage', DefaultImage)

Vue.component('ListDetails', ListDetails)









