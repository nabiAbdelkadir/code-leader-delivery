import Vue from 'vue'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles

Vue.use(Vuesax, {
    colors: {
        primary: '#3699ff',
        success: '#50cd89',
        danger: '#f1416c',
        warning: '#ffc700',
        dark: '#181c32'
    }
})
