<!-- 组件说明 -->
<template>
  <div class="UserInfo">
    <div class="loading"  v-if="isLoading">
      <img src="../assets/loading2.gif" />
    </div>
    <div class="userInformation" v-else>
      <section>
        <img :src="userInfo.avatar_url" id="avatarImg">
        <span> {{userInfo.loginname}} </span>
        <p>
          {{userInfo.score}}积分
        </p>
        <p>
          注册时间{{userInfo.create_at|formatDate}}
        </p>
      </section>
      <div class="replies">
        <p>回复的主题</p>
        <ul>
          <li v-for="item in items"> 
            <router-link :to="{name:'post_content',
              params:{
                id:item.id
              }}">
                {{item.title}}
            </router-link>
          </li>
        </ul>
        <div class="creatTopics">
          <p>创建的主题</p>
          <ul>
            <li v-for="item in items"> 
            <router-link :to="{name:'post_content',
              params:{
                id:item.id
              }}">
                {{item.title}}
            </router-link>
          </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  components: {},
  data() {
    return {
      isLoading: false,
      userInfo: null,
      items : null,
    }
  },
  methods: {
    getUserInfoDate() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)//这里写name是因为你在路由的index.js里面用的是path用的是name
        .then(res => {
          if (res.data.success === true) {
            console.log(res)
            this.isLoading = false
            this.userInfo = res.data.data
            this.items = this.userInfo.recent_replies
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  beforeMount(){
    this.isLoading=true
    this.getUserInfoDate()
  }
}
</script>

<style scoped>
/*@import url()*/

#avatarImg{
  width: 30px;
  height: 30px;
}
</style>