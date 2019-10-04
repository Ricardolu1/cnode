<!-- 组件说明 -->
<template>
  <div class="article">

    <!-- 如果正在加载显示此div -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading2.gif">
    </div>

    <div v-else>
      <div class="topicHeader">
        <div class="topicTitle">{{post.title}}
          <ul>
            <li>·发布于:{{post.create_at|formatDate}}</li>
            <li>·作者:{{post.author.loginname}} </li>
            <li>·{{post.visit_count}}次浏览 </li>
            <li>·来自{{post|tabFormat}} </li>
          </ul>
          <div v-html="post.content" class="topic_content">
          </div>
        </div>
      </div>
      <div>
        <div class="topbar">回复</div>
        <div v-for="(reply,index) in post.replies">
          <router-link :to="{name:'user_info',
            params:{
              name:reply.author.loginname
            }
          }">
            <img :src="reply.author.avatar_url" id="replyAvatar">
          </router-link>
          <span> {{reply.author.loginname}} </span>
          <span> {{index+1}}楼 </span>
          <span>· {{reply.create_at|formatDate}} </span>
          <p v-html="reply.content"></p>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name:'Article',
    components: {

    },
    data () {
      return {
        isLoading:false,
        post:null//代表当前文章页的所有内容，所有属性

        

      };
    },
    methods: {
      getArticleDate(){
        this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
          .then(res=>{
            if (res.data.success===true) {
              this.isLoading=false
              this.post=res.data.data
            }
          })
          .catch(err=>{
            console.log(err)
          })
      }
    },
    beforeMount(){
      this.isLoading=true
      this.getArticleDate()
    },
    watch:{
      '$route'(to,from){
        this.getArticleDate()
      }
    }
  }
</script>




<style scoped>
.loading{
  text-align: center;
  
}
 
.topicTitle >ul{
  list-style: none;
}
.topicTitle >ul> li{
  float:left;
  margin:auto 5px;
}
#replyAvatar{
  width: 30px;
  height: 30px;
}

</style>

