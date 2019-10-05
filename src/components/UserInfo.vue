<!-- 组件说明 -->
<template>
  <div class="UserInfo">
    <div class="loading"  v-if="isLoading">
      <img src="../assets/loading2.gif" />
    </div>
    <div class="userInformation" v-else>
      <section class="homePage">
          <p class="topBar">主页</p>
          <div class="homePageWrap">
            <img :src="userInfo.avatar_url" id="avatarImg">
            <span class="dark"> {{userInfo.loginname}} </span>
            <p class="big">
              {{userInfo.score}}积分
            </p>
            <p class="fade">
              注册时间{{userInfo.create_at|formatDate}}
            </p>
          </div>
      </section>
      <div class="creatTopics">
        <p class="topBar">最近创建的话题</p>
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
      <div class="replies">
        <p class="topBar">最近参与的话题</p>
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
  border-radius: 3px 3px 0 0;
}
.topBar{
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
}
.UserInfo{
  background: #e1e1e1;
  margin-bottom: 200px;
}
.homePage{
  margin-bottom: 13px;
  background: #fff;
  border-radius: 3px 3px 0 0;
}
.homePage .homePageWrap .big{
  font-size: 12px;
  padding: 8px 6px;
}
.homePage>.homePageWrap{
  padding:10px;
}
.homePage>.homePageWrap .dark{
  color: #778087;
  line-height: 2em;
  font-size: 12px;
  display: inline-block;
  vertical-align: top;
  margin-left: 5px
}
.homePage>.homePageWrap .fade{
      margin: 6px  6px;
      color: #ababab;
      font-size: 12px;
}
.creatTopics{
  margin-bottom: 13px;
  background: #fff;
  border-radius: 3px 3px 0 0;
}
.creatTopics ul{
  padding:10px;
}
.creatTopics ul li{
  line-height: 30px;
  margin-left:15px;
}
.replies{
  background: #fff;
  border-radius: 3px 3px 0 0;
}
.replies ul{
  padding:10px;
}
.replies ul li{
  line-height: 30px;
   margin-left:15px;
}
</style>