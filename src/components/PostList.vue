<!-- 组件说明 -->
<template>
  <div>
    <div class="topBar">
      <span>全部</span>
      <span>精华</span>
      <span>分享</span>
      <span>问答</span>
      <span>招聘</span>
    </div>
    <!-- 在数据未返回时，显示这个正在加载的动图 -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading2.gif" alt="">
    </div>
  <!-- 代表我们的主题帖子列表 -->
    <div class="posts">
      <ul>
        <li v-for="post in posts" >
           <a>
            <!-- 头像 -->
            <img :src="post.author.avatar_url">
          </a>
          <!-- 回复/浏览 -->
          <span>
            <span class="reply_count"> {{post.reply_count}} </span>/{{post.visit_count}}
          </span>
          <!-- 帖子的分类 -->
          <span :class="[
          {put_good:(post.good===true),
          put_top:(post.top===true),
          topiclist_tab:(post.good!==true)&&(post.top!==true)}]">
            <span>
              {{post | tabFormat}}
            </span>
          </span>
          <!-- 标题  -->
          <router-link :to="{name:'post_content',params:{
            id:post.id,
            name:post.author.loginname
          }}">
            <span>
                {{post.title}}
            </span>
          </router-link>
          <!-- 最后回复时间 -->
          <span class="last_reply">  
            {{post.last_reply_at|formatDate}}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name:'PostList',
    components: {

    },
    data () {
      return {
        isLoading:false,
        posts:null //代表的页面的列表数组
      };
    },
    methods: {
      getDate(){
        this.$http.get('https://cnodejs.org/api/v1/topics',{
          page:1,
          limit:20
        }).then(res=>{
          console.log(res)
            this.isLoading=false//加载成功去除动画
            this.posts=res.data.data

          })
          // .catch(err=>{
          //   //处理返回失败后的问题
          //   console.log(err)
          // })
      },
    },
    beforeMount(){
      this.isLoading=true  //加载成功之前显示加载动画
      this.getDate()  //在页面加载之前获取数据
    }
  }
</script>

<style scoped>
/*@import url()*/

.loading{
  text-align: center;
}
li>a>img{
  width: 30px;
  height: 30px;
}
ul{
  list-style: none
}
.post > li{
  padding-right: 10px;
  background: #fff;
}
</style>