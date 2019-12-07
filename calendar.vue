<template>
  <div v-outside>
    <div class='hider'>
      <div class="pannel-nav" v-for="(item,index) in visibleDays.slice(7,14)" :key='index'>
        <span>
          {{basisInfo[index]}}
        </span>
        <div  class='data' :class="[
        { curentDay:iscurentDay(item)},
        ]">
          {{item.getDate()}}
        </div>       
      </div>  
    </div>
    <div class='title' v-if="!isvisible">↓↓↓</div>
    <div v-if="isvisible" class='box'>
      <div class="pannel-content">
        <div v-for='i in 6' :key="i">
          <span v-for="j in 7" :key="j" :class="[
            { curentMounth:!iscurentMounth(visibleDays[(i-1)*7+(j-1)])}
            ,{curentDay:iscurentDay(visibleDays[(i-1)*7+(j-1)])}
            ]"
            @click="changeDay(visibleDays[(i-1)*7+(j-1)])"
           >
            {{visibleDays[(i-1)*7+(j-1)].getDate()}}
          </span>
        </div>
      </div>
      <div class="pannel-footer">
        <span>{{formatDate}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from './utils';
export default {
  props: {
    value: {
      type: Date,
      default: () => new Date()
    }
  },
  directives: {
    outside: {
      bind(el, bindings, vnode) { //生命周期
        let handler = (e) => {
          if (el.contains(e.target)) {
            vnode.context.focus()
          } else {
            vnode.context.blur()
          }
        }
        el.handler = handler
        document.addEventListener('click', handler)
      },
      unbind(el) {
        document.removeEventListener('click', el.handler)
      }
    }
  },
  data() {
    return {
      isvisible: false,
      basisInfo: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  methods: {
    focus() {
      this.isvisible = true
    },
    blur() {
      this.isvisible = false
    },
    iscurentMounth(d) {
      //当前年月
      let { year, month } = utils.getYearMonthDay(this.value)
      //传进来的年月
      let { year: y, month: m } = utils.getYearMonthDay(d)
      return year == y && month == m
    },
    iscurentDay(date) {
      let { year, month, day } = utils.getYearMonthDay(this.value)
      //传进来的年月
      let { year: y, month: m, day: d } = utils.getYearMonthDay(date)
      return year == y && month == m && day == d
    },
    changeDay(d){
      console.log(d);
      this.$emit('input',d)
    }
  },
  mounted() {
    //  this.visibleDays
    console.log();
  },
  computed: {
    visibleDays() {
      //思路
      //获取当前日期的月的第一天
      //计算出第一天是周几 getDay()
      //然后往前推移到周日获取日期
      //循环遍历42天


      let { year, month } = utils.getYearMonthDay(this.value)
      //获取当前月
      let currentMountfirstDay = utils.wantDate(year, month, 1)
      //获取周几
      let week = currentMountfirstDay.getDay()
      //往前推移几天
      let startDay = currentMountfirstDay - (week +7) * 60 * 60 * 1000 * 24
      //循环42天
      let arr = []
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24))
      }
      return arr
    },
    formatDate() {
      let { year, month, day } = utils.getYearMonthDay(this.value)
      return `${year}-${month + 1}-${day}`
    }
  }
}
</script>

<style lang="stylus">
.box {
  border: 1px solid pink ;
  box-shadow 1px 1px 1px green,-1px -1px 1px green;
  position: absolute;
}
.title{
  text-align center;
  width 250px;
}
.hider {
  border: 1px solid pink;
  cursor: pointer;
  width: 250px;
  padding: 3px 0;
  display: flex;
  justify-content: space-around;
  text-align: center;

  span {
    color: gray;
  }

  div {
    border-radius: 50%;
  }

  .data:hover {
    background: pink;
  }
}

.pannel-nav {
  width: 250px;
}

.pannel-content {
  div {
    display: flex;
    justify-content: space-around;

    span {
      padding: 2px;
      width: 32px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      font-weight bold;
      cursor pointer;
      border-radius 4px;
    }
    span:hover{
      background brown;
    }
  }
}

.pannel-footer {
  text-align: center;
}

.curentMounth {
  color: gray;
}

.curentDay {
  background: blue;
  color: white;
}
</style>