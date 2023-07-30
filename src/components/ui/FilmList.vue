<template>
  <div v-if="getFilms" class="films">
    <router-link v-for="item in getFilms" :key="item.id" :to="'/film/' + item?.id" class="slider__item">
      <div class="slider__poster">
        <img :src="item.posterUrl" :alt="item.name" class="shadow-2"/>
      </div>
      <div class="slider__info">
        <div>
          <div class="flex align-items-center">
            <FavoriteBtn
                :name="item.name"
                :poster-img="item.posterUrl"
                :id="item.id"
            />
            <p v-if="item.year" class="ml-auto pl-2">Year: {{ item.year }}</p>
          </div>
          <h3 v-if="item.rating">{{ item.rating }}</h3>
          <h4 class="my-1">{{ item.name }}</h4>
          <h6 v-if="item.filmLength">Длительность: {{ item.filmLength }}</h6>
          <div v-if="item.genres" class="flex flex-wrap gap-1 mt-2">
            <Tag v-for="genre in item.genres" :value="genre.genre" severity="success"/>
          </div>
          <div v-if="item.countries" class="flex flex-wrap gap-1 mt-2">
            <Tag v-for="country in item.countries" :value="country.country" severity="info"/>
          </div>
        </div>
      </div>
    </router-link>
    <div v-if="scrollTrigerActive" ref="scrollTrigger" style="height: 1px;"></div>
  </div>
  <div v-else>No data yet</div>
</template>

<script setup>
import FavoriteBtn from "@/components/FavoriteBtn.vue";
import {computed, onMounted, ref, defineEmits } from "vue";

const {films, scrollTrigerActive} = defineProps(['films', 'scrollTrigerActive']);
const getFilms = computed(() => {
  console.log('getFilms', getFilms)
  return films.map(film => {
    return {
      id: film?.id || film?.kinopoiskId || film?.imdbId,
      name: film?.name || film?.nameRu || film?.nameEn || film?.nameOriginal,
      posterUrl: film?.posterUrl || film?.posterUrlPreview,
      ...film
    }
  })
})


const scrollTrigger = ref(null);
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
const emit = defineEmits(['scrollToBottom'])

const handleScroll = () => {
  if(scrollTrigerActive && scrollTrigger.value){
    const triggerBottom = scrollTrigger.value.getBoundingClientRect().bottom;

    // Высота видимой области окна браузера
    const windowHeight = window.innerHeight;

    // Высота всего документа (с учетом прокрутки)
    const docHeight = document.documentElement.scrollHeight;

    // Пользователь прокрутил до конца страницы (или практически до конца)
    if (triggerBottom <= windowHeight + 100) {
      emit('scrollToBottom', 'Дополнительная информация о скролле');
      // Здесь загружайте дополнительные данные, например, items.push(...)
    }
  }
};
</script>

<style scoped>
.films{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

</style>