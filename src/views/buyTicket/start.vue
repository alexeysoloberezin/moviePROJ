<template>
  <Main>
    <template #default>
      <h3 class="mt-5">Choose dates</h3>
      <Calendar v-model="date" inline showWeek/>
      <ul>
        <li>Показать якобы свободные даты и время</li>
        <li>При клике мы переходим на страницу выбора места</li>
        <li>После покупка</li>
        <li>Создание ticket</li>
      </ul>
    </template>
  </Main>
</template>

<script setup>
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import Calendar from 'primevue/calendar';
import Main from "@/views/buyTicket/main.vue";
import {getNextStep, getSteps, useBuyTicketStore} from "@/store/buyTicket";

const route = useRoute()
const router = useRouter()

const id = route.params.id
const butTicketStore = useBuyTicketStore()
const date = computed({
  get: () => butTicketStore.date,
  set: (newValue) => {
    butTicketStore.$patch({date: newValue})
    if(newValue){
      const arr = getSteps(route.params.id)
      const nextStep = getNextStep(arr, route.name)
      if(nextStep) {
        router.push(nextStep)
      }
    }
  }
})

</script>

<style lang="scss">
.buyTicket {
  position: relative;
  z-index: 3;

  &__wrp {
    display: grid;
    grid-template-columns: 350px 1fr;
    grid-gap: 30px;
  }

  &__img {
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.57);
  }

  &__l {

  }

  &__r {

  }
}
</style>