import Vue from 'vue'
import { 
    Button,
    Input,
    Select,
    Option,
    Card,
    Dialog,
    Form,
    FormItem,
    Loading
} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Card)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Loading.directive)

import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
locale.use(lang)
