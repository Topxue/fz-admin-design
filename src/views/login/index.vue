<template>
  <div class="area">
    <div class="container">
      <div class="svg-com">
        <Illustration />
      </div>
      <div class="content">
        <div class="content-inner">
          <LoginForm />
        </div>
      </div>
    </div>
    <AnimationBg />
  </div>
</template>

<script lang="ts" setup>
import LoginForm from './components/login-form.vue'
import AnimationBg from './components/animation-bg.vue'
import Illustration from '@/assets/svg/illustration.svg?component'
</script>

<style lang="less" scoped>
.container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url('@/assets/images/login-bg.png') no-repeat;
  background-size: 100% 100%;

  .content {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;
  }

  .content-inner {
    position: relative;
    z-index: 1;
    border-radius: 6px;
    padding: 30px 20px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  }

  .svg-com {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left: 100px;
  }
}

.context {
  width: 100%;
  position: absolute;
  top: 50vh;
}

.context h1 {
  text-align: center;
  color: #fff;
  font-size: 50px;
}

.area {
  background: #4e54c8;
  width: 100%;
  height: 100vh;
}
</style>
