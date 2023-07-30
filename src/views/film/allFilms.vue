<template>
  <div class="box">
    <h1 class="mb-3">All films</h1>
    <div class="flex flex-wrap gap-3">
      <template v-if="filters">
        <Dropdown v-model="country" showClear filter :options="filters.countries" optionLabel="name"
                  placeholder="Filter by Country" class="w-full md:w-14rem"/>
        <Dropdown v-model="genres" showClear filter :options="filters.genres" optionLabel="name"
                  placeholder="Filter by Genre" class="w-full md:w-14rem"/>
      </template>
      <Dropdown v-model="type" showClear filter :options="filmType" optionLabel="name" placeholder="Type"
                class="w-full md:w-14rem"/>
      <Dropdown v-model="sortOrder" showClear filter :options="sortOrders" optionLabel="name" placeholder="Sort by"
                class="w-full md:w-14rem"/>

      <Button @click="getFilms" :disabled="videoImageLoading" size="small">Search</Button>
    </div>
    <div class="flex flex-wrap gap-4">
      <div style="width: 285px;" class="mt-3">
        <div class="flex gap-3 justify-content-between">
          <Tag>{{ year[0] }}</Tag>
          <h4 class="mb-2">Year</h4>
          <Tag>{{ year[1] }}</Tag>
        </div>
        <div class="mt-3 px-2">
          <Slider v-model="year" range :min="1900" :max="currentYear"/>
        </div>
      </div>
      <div style="width: 300px;" class="mt-3">
        <div class="flex gap-3 justify-content-between">
          <Tag>{{ rating[0] }}</Tag>
          <h4 class="mb-2">Raiting</h4>
          <Tag>{{ rating[1] }}</Tag>
        </div>
        <div class="mt-3 px-2">
          <Slider v-model="rating" range :min="0" :max="10"/>
        </div>
      </div>
    </div>

    <div class="my-4">
      {{ keyFilms }}
      <FilmList v-if="films && films.length > 0" :key="keyFilms" @scrollToBottom="loadMoreFilms" :films="films" :scrollTrigerActive="true"/>
      <ProgressBar v-if="videoImageLoading" mode="indeterminate" style="height: 6px"></ProgressBar>
      <div v-if="!films || films.length === 0">No data yet</div>
      <div v-if="isLastPage && !videoImageLoading" class="text-center">
        That`s all ;)
      </div>
    </div>
  </div>
</template>

<script setup>
import {allFilmType, allSortOrders, useFilmsStore} from "@/store/films/films";
import {computed, onBeforeMount, ref} from "vue";
import FilmList from "@/components/ui/FilmList.vue";

const filmStore = useFilmsStore()
const filters = computed(() => filmStore.filters)
const films = computed(() => filmStore.films)
const currentYear = new Date().getFullYear();
const videoImageLoading = computed(() => filmStore.videoImageLoading)

const sortOrders = allSortOrders;
const filmType = allFilmType;

const country = ref(null)
const genres = ref(null)
const year = ref([1900, currentYear])
const rating = ref([0, 10])
const type = ref({key: 'ALL', name: 'ALL'})
const sortOrder = ref(sortOrders[0])
const keyFilms = ref(0)

onBeforeMount(() => {
  filmStore.clearFilmsAll()
  filmStore.loadFilters()
  filmStore.loadFilmsFiltered({type: 'ALL'});
})

const currentPage = computed(() => filmStore.currentPage)
const totalPages = computed(() => filmStore.totalPages)
const isLastPage = computed(() => filmStore.isLastPage)

const loadMoreFilms = () => {
  if(!filmStore.disableLoading && currentPage.value < totalPages.value){
    getFilms({page: currentPage.value + 1, loadMore: true})
    filmStore.$patch({
      disableLoading: true,
      currentPage: filmStore.currentPage + 1
    })
  }
}

const getFilms = async ({page, loadMore}) => {
  if(!loadMore){
    await filmStore.$patch({
      films: []
    })
    keyFilms.value = keyFilms.value + 1
  }

  const searchParams = {
    ...(country.value ? {countries: country.value.id} : {}),
    ...(genres.value ? {genres: genres.value.id} : {}),
    ...(sortOrder.value ? {order: sortOrder.value.key} : {}),
    ...(type.value ? {type: type.value.key} : {type: 'ALL'}),
    ...(rating.value ? { ratingFrom: rating.value[0] } : {}),
    ...(rating.value ? { ratingTo: rating.value[1] } : {}),
    ...(year.value ? {yearFrom: year.value[0]} : {}),
    ...(year.value ? {yearTo: year.value[1]} : {}),
    ...(currentPage.value || page ? { page: page || currentPage.value } : {}),
  };

  await filmStore.loadFilmsFiltered(searchParams, loadMore);
  keyFilms.value = keyFilms.value + 1
}

</script>

<style scoped>

</style>