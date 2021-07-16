<template>
  <div>
    <div class="content">
      <AppMenu />
      <Nuxt />
    </div>
    <footer>&copy; Copyright 2021 Nobody</footer>
  </div>
</template>

<script>
import AppMenu from '@/components/AppMenu.vue';

export default {
  components: {
    AppMenu
  },
};
</script>

<style>
html {
  font-family:
    'Mulish',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  font-weight: 300;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

h1, h2, h3, h4 {
  font-family:
    'Poppins',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-weight: 600;
}
</style>
