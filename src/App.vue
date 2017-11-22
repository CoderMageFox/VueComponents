<template>
  <div id="app">
      <index></index>
  </div>

</template>

<script>
    import index from './views/index/index.vue'
export default {
    components:{index},
  name: 'app',
}

</script>
<style lang="scss">
    @import './styles/styles.scss'; // 全局自定义的css样式
</style>