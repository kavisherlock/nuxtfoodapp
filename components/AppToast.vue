<template>
  <div :class="`toast ${showError ? ' errortoast' : ''}`">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      showError: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>