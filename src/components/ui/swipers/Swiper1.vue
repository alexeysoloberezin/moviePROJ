<template>
  <Carousel class="slider" :value="props.films" :numVisible="6" :numScroll="1">
    <template #item="{data}">
      <router-link :to="'/film/' + data.filmId" class="slider__item">
        <div class="slider__poster">
          <img :src="data.posterUrlPreview" :alt="data.nameRu || data.nameEn " class="shadow-2"/>
        </div>
        <div class="slider__info">
          <div>
            <h3 v-if="data.rating">{{ data.rating }}</h3>
            <h4 class="my-1">{{ data.nameRu || data.nameEn }}</h4>
            <h6 v-if="data.filmLength">Длительность: {{ data.filmLength }}</h6>
            <div v-if="data.genres" class="flex flex-wrap gap-1 mt-2">
              <Tag v-for="genre in data.genres" :value="genre.genre" severity="success"/>
            </div>
          </div>
        </div>
      </router-link>
    </template>
  </Carousel>
</template>

<script setup>
const props = defineProps(['films']);

</script>

<style scoped>

</style>