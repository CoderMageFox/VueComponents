import Vue from 'vue'
import Router from 'vue-router'
import FirstletterSelect from '../views/form/FirstletterSelect.vue'
import commonInput from '../views/form/commonInput.vue'
import uploader from '../views/form/uploader.vue'
/*module.exports = file => require('../views/' + file + '.vue').default  // vue-loader at least v13.0.0+
module.exports = file => () => import('@/views/' + file + '.vue')
const _import = require('./_import_' + process.env.NODE_ENV)*/
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

export const RouterList = [
    { path: '/FirstletterSelect', component: FirstletterSelect},
    { path: '/commonInput', component: commonInput},
    { path: '/uploader', component: uploader},
];

export default new Router({
    routes: RouterList
})
