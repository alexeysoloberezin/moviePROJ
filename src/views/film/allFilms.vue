<template>
  <div class="box">
    <h1>All films</h1>
    <div  class="flex flex-wrap gap-3">
      <template v-if="filters">
        <Dropdown v-model="country" filter :options="filters.countries" optionLabel="name" placeholder="Filter by Country" class="w-full md:w-14rem" />
        <Dropdown v-model="genres" filter  :options="filters.genres" optionLabel="name" placeholder="Filter by Genre" class="w-full md:w-14rem" />
      </template>
     </div>
    {{ country }}
    {{ genres }}
<!--    <pre> {{ filters }}</pre>-->
  </div>
</template>

<script setup>
import {useFilmsStore} from "@/store/films/films";
import {computed, ref} from "vue";
import {SortOrder} from "@/store/films/films.ts";

const filmStore = useFilmsStore()
const filters = computed(() => filmStore.filters)
const country = ref(null)
const genres = ref(null)
const allSortOrders = Object.values(SortOrder);
filmStore.loadFilters()

</script>

<style scoped>

</style>