<!-- 组件说明 -->
<template>
    <div class="authorInfo">
      <div class="authorSummary">
        <div class="topBar">作者</div>
          <router-link :to="{name:'user_info',
            params:{
              name:userInfo.loginname
            }
          }">
            <img id="slideBarImg" :src="userInfo.avatar_url">
            <span> {{userInfo.loginname}} </span>
          </router-link>
       
          
      </div>
      <div class="recentReplies">
        <div class="topBar">作者最近主题</div>
      </div>
      <div class="recentTopics">
        <div class="topBar">作者最近回复</div>
      </div>
    </div>
</template>

<script>
  export default {
    name:'SlideBar',
    components: {

    },
    data () {
      return {
        userInfo:{}
      };
    },
    methods: {
      getData(){
        this.$http
          .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)//这里写name是因为你在路由的index.js里面用的是path用的是name
          .then(res => {
            if (res.data.success === true) {
              this.userInfo = res.data.data
              console.log(this.userInfo.loginname)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    beforeMount(){
      this.getData()
      console.log(this)
    }
  }
</script>

<style scoped>
/*@import url()*/
  .authorInfo{
    float:right;
  }
  #slideBarImg{
    width: 30px;
    height: 30px;
  }
</style>