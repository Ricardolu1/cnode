<!-- 组件说明 -->
<template>
  <div>
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading2.gif" alt="">
    </div>
    <div class="mainBoard" v-else>
      <div class="topBar">
        <div class="topabarWrapper">
          <span class="child1">全部</span>
          <span>精华</span>
          <span>分享</span>
          <span>问答</span>
          <span>招聘</span>
        </div>
      </div>
      <!-- 在数据未返回时，显示这个正在加载的动图 -->
    <!-- 代表我们的主题帖子列表 -->
      <div class="posts">
        <ul>
          <li v-for="post in posts" class="userCell">
            <router-link :to="{name:'user_info',
              params:{
                name:post.author.loginname
              }
            }">
              <!-- 头像 -->
              <img :src="post.author.avatar_url">
            </router-link>
            <!-- 回复/浏览 -->

            <span id="replyInfoLeft">
              <span class="count_of_replies"> {{post.reply_count}} </span>
              <span class="count_seperator">/</span>
              <span class="count_of_visits">{{post.visit_count}}</span>
            </span>
            <!-- 帖子的分类 -->
            <span :class="[
            {put_good:(post.good===true),
            put_top:(post.top===true),
            topiclist_tab:(post.good!==true)&&(post.top!==true)}]">
              <span>{{post | tabFormat}}</span>
            </span>
            <!-- 标题  -->
            <router-link :to="{name:'post_content',params:{
              id:post.id,
              name:post.author.loginname
            }}">
              <span class="post_title">
                  {{post.title}}
              </span>
            </router-link>
            <!-- 最后回复时间 -->
            <span class="last_reply">  
              {{post.last_reply_at|formatDate}}
            </span>
          
          </li>
          <li class="pagination">
            <!-- 分页 -->
            <Pagination @handleList="renderList"></Pagination>  
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination'

  export default {
    name:'PostList',
    components: {
      Pagination,
    },
    data () {
      return {
        isLoading:false,
        posts:null, //代表的页面的列表数组
        postPage:1
      };
    },
    methods: {
      getDate(){
        this.$http.get('https://cnodejs.org/api/v1/topics',{
          params:{
            page:this.postPage,
            limit:40
        }}).then(res=>{
            this.isLoading=false//加载成功去除动画
            this.posts=res.data.data

          })
          // .catch(err=>{
          //   //处理返回失败后的问题
          //   console.log(err)
          // })
      },
      //分页只要点击数字按键就要触发这个事件
      renderList(value){
        this.postPage=value
        this.getDate()
      }
    },
    beforeMount(){
      this.isLoading=true  //加载成功之前显示加载动画
      this.getDate()  //在页面加载之前获取数据
    }
  }
</script>

<style scoped>
/*@import url()*/
.back{
  background: #E1E1E1
}
.loading{
  text-align: center;
}
ul{
  list-style: none
}
.topBar{
  background: #F6F6F6;
  height: 40px;
  line-height:40px;
}
.topabarWrapper:nth-child(1){
  margin-left:22px;
}
.topBar span{ 
    font-size: 14px;
    margin: 0 10px;
    color: #80bd01;
    padding: 3px 4px;
    border-radius: 3px;
}
.topBar span.child1 { 
    margin: 0 10px;
    color: white;
    background: #80bd01;
    
}
.mainBoard{
  margin:0 auto;
  margin-top:15px;
  width: 1064px;
  margin-bottom:200px;
}
.posts li{
  padding-right: 10px;
  background:#e1e1e1;
}

.posts li img{
  width: 30px;
  height: 30px;
}
.posts .userCell {
    position: relative;
    padding: 10px;
    font-size: 16px;
    line-height: 2em;
    background:#FFFFFF;
    margin-top:1px;
}
.posts .userCell:hover {
   background: #F5F5F5;
}
.posts .userCell:nth-child(1){
  margin-top:0;
}
.posts .userCell a .post_title{
  color: #333;
  max-width: 70%;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;

}
.posts .userCell a:visited {
    color: #888;
}
.posts .userCell img{
    max-width: 100%;
    vertical-align: middle;
}
.posts .userCell .count_of_replies{
  font-size: 14px;
  color:#9e78c0;
}
.posts .userCell .count_of_visits{
  font-size: 10px;
  color: #b4b4b4
}

.posts .userCell .count_seperator{
    margin: 0 -3px;
    font-size: 10px;
}
 .posts .userCell .last_reply{
   font-size: 11px;
   color: #778087;
   float: right;
 }
 .posts .userCell .put_top>span{
   background: #80bd01;
   border-radius: 3px;
   color: #fff;
   font-size: 12px;
   margin-left:3px;
   vertical-align:middle;
   padding:2px 4px;
 }
 .posts ul .pagination{
   background: #FFFFFF;
   padding-top:11px;
   padding-bottom: 5px;
 }

.put_good,
.topiclist_tab{
  border-radius: 3px;
  font-size: 12px;
  margin-left: 3px;
  vertical-align: middle;
  padding: 2px 4px;
  background-color: #e5e5e5;
  color: #999;
}

#replyInfoLeft{
  display: inline-block;
  width: 70px;
  text-align: center
}
</style>