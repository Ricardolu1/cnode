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
        <ul>
          <li v-for="list in topicLimitBy5">
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
        <div class="topBar">作者最近回复</div>
        <ul>
          <li v-for="list in replylimitBy5">
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
  .authorInfo{
    float:right;
  }
  #slideBarImg{
    width: 30px;
    height: 30px;
  }
</style>