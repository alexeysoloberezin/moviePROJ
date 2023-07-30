<template>
  <div v-if="films" class="flex flex-wrap">
    <router-link v-for="item in films" :key="item.id" :to="'/film/' + item.id" class="col-3 slider__item">
      <div class="slider__poster">
        <img :src="item.posterUrl" :alt="item.name" class="shadow-2"/>
      </div>
      <div class="slider__info">
        <div>
          <FavoriteBtn
              :name="item.name"
              :poster-img="item.posterUrl"
              :id="item.id"
          />
          <h4 class="my-1">{{ item.name }}</h4>
        </div>
      </div>
    </router-link>
  </div>
  <div v-else>No data yet</div>
</template>

<script setup>
import FavoriteBtn from "@/components/FavoriteBtn.vue";

const {films} = defineProps(['films']);

</script>

<style scoped>

</style>