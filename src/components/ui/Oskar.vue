<template>
  <div class="rating">
    <img src="@/assets/imgs/oskar.jpg" alt="">
    <div class="rating__rating">{{ rating }}</div>
  </div>
</template>

<script>
export default {
  name: 'Oskar',
  props: ['rating']
};
</script>

<style lang="scss" scoped>

</style>
