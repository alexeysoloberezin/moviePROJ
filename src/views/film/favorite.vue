<template>
  <div class="box">
    <h1 class="mb-3">Your Favorite List</h1>
    <div class="pl-3">
      <span class="p-input-icon-left">
          <i class="pi pi-search"/>
          <InputText v-model="search" placeholder="Search"/>
      </span>
    </div>
    <FilmList :films="favoriteList" :key="favoriteList.length"/>
  </div>
</template>

<script setup>
import {useFilmsStore} from "@/store/films/films";
import {computed, ref} from "vue";
import FilmList from "@/components/ui/FilmList.vue";

const filmStore = useFilmsStore()
const favorite = computed(() => filmStore.favorite)
const favoriteList = computed(
    () => filmStore.favorite.filter(item => item.name.toLowerCase().includes(search.value.toLowerCase())))
const search = ref('')

</script>

<style scoped>

</style>