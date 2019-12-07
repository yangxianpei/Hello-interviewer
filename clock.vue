<template>
  <div class="clock">
    <div class="hms">
      <!-- 时针 -->
      <div class="hour" ref='hour'></div>
      <!-- 分针 -->
      <div class="min" ref='min'></div>
      <!-- 秒针 -->
      <div class="sec" ref='sec'></div>
    </div>
  </div>
</template>
<script>
import * as utils from './utils'
export default {
  data() {
    return {
      setsec: null
    }
  },
  mounted() {
    this.rotate()
  },
  methods: {
    rotate() {
      this.t = setInterval(() => {
        let { h, m, s } = utils.getCruendTimeInfo()
        this.$refs.sec.style.transform = `rotate(${s * 6}deg)`
        this.$refs.min.style.transform = `rotate(${m*6+0.1*s}deg)`
        this.$refs.hour.style.transform = `rotate(${h*30+0.5*m+0.5/60*s}deg)`
      }, 1000)

    },
  },
  beforeDestroy() {
    clearInterval(this.t)
  }
}
</script>
<style lang="stylus">
.hms {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
}
.hour {
  width: 3px;
  height: 100px;
  background: pink;
  position: absolute;
  background:linear-gradient(to bottom,pink 50%,transparent 50%);
  z-index 999l
}

.min {
  width: 3px;
  height: 100px;
  background: red;
  position: absolute;
  background:linear-gradient(to bottom,red 50%,transparent 50%);
  z-index 999l
}


.sec {
  width: 3px;
  height: 150px;
  background: black;
  position: absolute;
  background:linear-gradient(to bottom,black 50%,transparent 50%);
}
</style>