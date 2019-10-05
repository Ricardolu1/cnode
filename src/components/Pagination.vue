<!-- 组件说明 -->
<template>
    <div class="pagination">
      <button @click="changeBtn" class="cn">首页</button><!--这里不传参数默认传的是js原生事件对象MouseEvent -->
      <button @click="changeBtn"  class="cn">上一页</button>
      <button v-if="judge">.....</button>
      <button v-for="btn in pagebtns" 
      @click="changeBtn(btn)"
      :class="[{'currentPage':btn === curentPage},'pagebtn']">
        {{btn}}
      </button>
      <button v-if="judge">.....</button>
      <button  @click="changeBtn" class="cn">下一页</button>
    </div>
</template>

<script>
import $ from 'jquery'

  export default {
    name:'Pagination',
    components: {

    },
    data () {
      return {
        pagebtns:[1,2,3,4,5],
        curentPage:1,//表示当前选中的页码,
        judge:false,
      };
    },
    methods: {
      changeBtn(page){
        //点击上一页，下一页
        if (typeof page ==='object') {
          switch (page.target.innerText) {
            case '上一页':
              $('button.currentPage').prev().click()//点击当前按钮的上一个按钮
              break;
          
            case '下一页':
              $('button.currentPage').next().click()
              break;
            case '首页':
              this.pagebtns=[1,2,3,4,5]
              
              this.changeBtn(1)  //上面的class可以拿到他的,arguments，这里只能这么写
              break;
            case '.....':

              break;
            default:
              break
          }
          return
        }

        this.curentPage=page //如果上面吧return，这一句就有问题
        if (page>4) {
          this.judge=true
        }else {
          this.judge=false
        }
        
        //移除第最后一个，添加最后一个元素
        if (page===this.pagebtns[4]) {//当他点到第四个元素的时候其实九点到数字5了
          this.pagebtns.shift()//移除第0个元素
          this.pagebtns.splice(4,0,this.pagebtns[3]+1)  
        }else if (page===this.pagebtns[0]&&page!==1) {
          this.pagebtns.splice(4,1)//移除最后一个元素
          this.pagebtns.unshift(this.pagebtns[0]-1)
        }
      //第一个参数父组件中自定义事件的名字,第二个是我们要传递的数据
        this.$emit('handleList',this.curentPage)
        scrollTo(0,0)
      }

    }
  }
</script>

<style scoped>
/*@import url()*/
  .currentPage{
    color: #80bd01;
  }
  button{
    height: 30px;
    width: 50px;
    color: #778087;
    background-color: #f5f5f5;
    outline: none;
    border: 1px solid #ddd;
    font-size: 12px;
    vertical-align: middle;
    background: #fff;
  }
  .pagination{
    margin-left:10px;
    font-size: 0px;
  }
</style>