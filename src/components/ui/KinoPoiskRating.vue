<template>
  <a :href="link || '/'" class="rating">
    <img src="@/assets/imgs/kinop.png" alt="">
    <div class="rating__rating">{{ rating }}</div>
  </a>
</template>

<script lang="ts">
export default {
  name: 'KinoPoiskRating',
  props: ['rating', 'link']
};
</script>

<style lang="scss" scoped>

</style>
