import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './styles/styles.scss'
import router from './router/index.js'
import axios from 'axios'

Vue.use(ElementUI)
Vue.prototype.FetchData = function (url,data){
    const baseURL= " http://www.easy-mock.com/mock/59ec8d7fa28b060e8675f053"
    url=baseURL+url;
    return new Promise((resolve, reject) => {
        axios.get(url,data)
            .then(response => {
                return(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
};
new Vue({
  el: '#app',
    store,
    router,
  render: h => h(App)
})



