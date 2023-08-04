<template>
  <div class="">
    <div v-if="film">
      <img :src="film.coverUrl" alt="" style="width: 100%;height: 400px;object-fit: cover;opacity: 0.15;margin-bottom: -400px;margin-top: -30px">
      <div class="box buyTicket">
        <div class="buyTicket__wrp">
          <div class="buyTicket__l">
            <h2 class="mb-2">{{ film.name || film.nameRu || film.nameEn }}</h2>
            <img class="buyTicket__img" :src="film.posterUrl || film.posterUrlPreview" alt="">
          </div>
          <div class="buyTicket__r">
            <BuyTicketSteps />
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";
import {useFilmsStore} from "@/store/films/films";
import Calendar from 'primevue/calendar';
import BuyTicketSteps from "@/components/buyTicketSteps.vue";

const route = useRoute()
const id = route.params.id
const filmsStore = useFilmsStore()
const film = computed(() => filmsStore.film);
const date = ref(null)

onBeforeMount(() => {
  filmsStore.clearFilmsAll()
  if (id) {
    filmsStore.loadFilm(id);
  }
})
</script>

<style lang="scss">
.buyTicket{
  position: relative;
  z-index: 3;
  &__wrp{
    display: grid;
    grid-template-columns: 350px 1fr;
    grid-gap: 30px;
  }
  &__img{
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.57);
  }
  &__l{

  }
  &__r{
    margin-top: 60px;
  }
}
</style>