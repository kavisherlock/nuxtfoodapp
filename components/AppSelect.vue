<template>
  <div>
    <label for="select">What {{ label }} do you want?</label>

    <select @change="$emit('change', $event.target.value)" :name="label" :id="label">
      <option value>Please select a {{ label }}</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: "cuisine",
      },
      options: {
        type: Array,
        default: () => ['tacos', 'pizza', 'dim sum'],
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>