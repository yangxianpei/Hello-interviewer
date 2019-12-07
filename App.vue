<template>
 <div>
   <calendar v-model="now"></calendar>
   <div class='clock'>
     <clock ></clock>
     <div>
     您好，面试官！
   </div>
   </div>
   
 </div>
</template>

<script>
import calendar from './calendar.vue';
import clock from './clock.vue'
export default {
  data(){
    return {
      now:new Date()
    }
  },
  components:{
    calendar,
    clock
  }
}
</script>

<style lang="stylus">
.clock{
  display flex;
  justify-content center;
}
</style>