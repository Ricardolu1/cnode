<!-- 组件说明 -->
<template>
  <div class="article">

    <!-- 如果正在加载显示此div -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading2.gif">
    </div>

    <div class="main" v-else>
      <div class="topicHeader">
        <div class="topicTitle">
          <span>{{post.title}}</span>
          <ul>
            <li>·发布于:{{post.create_at|formatDate}}</li>
            <li>·作者:{{post.author.loginname}} </li>
            <li>·{{post.visit_count}}次浏览 </li>
            <li>·来自{{post|tabFormat}} </li>
          </ul>
        </div>
        <div v-html="post.content" class="topic_content">
        </div>
      </div>
      <div class="replyContent">
        <div class="topbar">回复</div>
        <div v-for="(reply,index) in post.replies" class="reply_item">
          <router-link :to="{name:'user_info',
            params:{
              name:reply.author.loginname
            }
          }">
            <img :src="reply.author.avatar_url" id="replyAvatar">
          </router-link>
          <span class="userInfo">
            <router-link :to="{name:'user_info',
              params:{
                name:reply.author.loginname
              }
            }">
              <span class="authorName"> {{reply.author.loginname}} </span>
            </router-link>
            <span class="times"> {{index+1}}楼 </span>
            <span class="times" >· {{reply.create_at|formatDate}} </span>
          </span>
          <div class="markdown-text">
            <p v-html="reply.content"></p>
          </div>
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






<style >
@import url('../assets/github-markdown.css');

a{
  color:#08c;
  text-decoration: none;
}
ul{
  list-style-type: none;
}
.main{
  margin-bottom: 200px;
}
.loading{
  text-align: center;
  
}
.topicHeader{
  border-radius: 3px 3px 0 0;
}
.topicHeader .topicTitle{
  background: #fff;
  padding: 10px;
}
.topicHeader .topic_content{
  border-top:1px solid #e5e5e5;
  background: #fff;
  color: #333;
  padding:10px;
  padding-bottom:30px;
}
.topicTitle>span{
  font-size: 22px;
  font-weight: 700;
  margin: 8px 0;
  display: inline-block;
  vertical-align: bottom;
  width: 75%;
  line-height: 130%;
}
.topicTitle  ul{
  list-style: none;
  font-size: 12px;
  color: #838383;

}
.topicTitle >ul::after{
  content:'';
  clear: both;
  display: block;
}

.topicTitle >ul> li{
  float:left;
  margin:auto 5px;
}
#replyAvatar{
  width: 30px;
  height: 30px;
}
.replyContent{
  margin-top:15px;
  
}
.replyContent .topbar{
  background: #f6f6f6;
  padding:10px;
  border-radius: 3px 3px 0 0;
}
.replyContent .reply_item{
  background: #fff;
  padding:10px;
  border-top:1px solid #f0f0f0;
  padding-bottom: 30px;
}
.replyContent .reply_item a .authorName{
  color: #666;
  font-size: 12px;
  font-weight: 700;
}
.replyContent .reply_item .times{
  color: #08c;
  font-size: 11px
}
.replyContent .reply_item .userInfo{
  display: inline-block;
  vertical-align: top;
}
.replyContent .reply_item .markdown-text{
  margin-left:22px;
  line-height: 30px;
}

.markdown-text img {
    width: 92% !important;
  }
</style>

