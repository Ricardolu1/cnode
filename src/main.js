// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = Axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
//处理最后回复时间
Vue.filter('formatDate',function(str) {
  var date = new Date(str)
  var time = new Date().getTime() - date.getTime()
  var interval = time/1000
  if (interval<30) {
    return '刚刚'
  } else if (interval<60) {
    return parseInt(interval)+'秒前'
  } else if ((interval/60)<60) {
    return parseInt(interval/60)+'分钟前'
  }else if ((interval/3600)<24) {
    return parseInt(interval/3600)+'小时前'
  }else if ((interval/86400)<30) {
    return parseInt(interval/86400)+'天前'
  }else if ((interval/2592000)<12) {
    return parseInt(interval/2592000)+'月前'
  }else  {
    return parseInt(interval/31104000)+'年前'
  }
})

//处理现实板块的文字
Vue.filter('tabFormat',function(post) {
  if (post.good===true) {
    return '精华'
  } else if(post.top===true){
    return '置顶'
  } else if (post.tab==='ask') {
    return '问答'
  }else if (post.tab==='share') {
    return '分享'
  }else{
    return '招聘'
  }

})