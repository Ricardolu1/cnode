<!-- 组件说明 -->
<template>
    <div class="authorInfo">
      <div class="authorSummary">
        <div class="topBar">作者</div>
          <div class="authorContent">
            <router-link :to="{name:'user_info',
              params:{
                name:userInfo.loginname
              }
            }">
              <img id="slideBarImg" :src="userInfo.avatar_url">
              <span class="name"> {{userInfo.loginname}} </span>
            </router-link>
          </div>
      </div>
      <div class="recentReplies">
        <div class="topBar t2">作者最近主题</div>
        <ul>
          <li v-for="list in topicLimitBy5" class="recentRepliesItems">
            <router-link :to="{name:'post_content',
              params:{
                name:list.author.loginname,
                id:list.id
              }
            }">
              {{list.title}}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="recentTopics">
        <div class="topBar t3">作者最近回复</div>
        <ul>
          <li v-for="list in replylimitBy5" class="recentTopicsItem">
            <router-link :to="{name:'post_content',
              params:{
                name:list.author.loginname,
                id:list.id
              }
            }">
              {{list.title}}
            </router-link>
          </li>
        </ul>
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
    computed:{
      topicLimitBy5(){
        if (this.userInfo.recent_topics) {
          return this.userInfo.recent_topics.slice(0,5)//返回的还是一个数组
        }
      },
      replylimitBy5(){
        if (this.userInfo.recent_replies) {
          return this.userInfo.recent_replies.slice(0,5)
        }
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
  
#slideBarImg{
     width: 48px;
    height: 48px;
     border-radius: 3px 3px 0 0;
}
.topBar{
  color: #51585c;
  border-radius: 3px 3px 0 0;
  padding: 10px;
  background-color: #f6f6f6;
  font-size: 13px;
}
.authorInfo{
  background: #E1E1E1;
  font-size: 14px;
}
.authorInfo a{
  color: #778087
}
.authorInfo ul{
  padding:10px;
}
.authorSummary{
  background: #fff;
  margin-bottom:13px;
  border-radius: 3px 3px 0 0;
}
.authorSummary a span{
  vertical-align: top;
  padding:10px;
  padding-top:17px;
  display: inline-block;
}
.recentReplies{
  background: #fff;
  margin-bottom:13px;
  border-radius: 3px 3px 0 0;
}

.recentRepliesItems a{
  display: inline-block;
  vertical-align: middle;
  line-height: 30px;
  max-width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.recentTopics{
  background: #fff;
  border-radius: 3px 3px 0 0;
}
.recentTopicsItem a{
  display: inline-block;
  vertical-align: middle;
  line-height: 30px;
  max-width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.authorContent{
  padding: 10px;
}
</style>