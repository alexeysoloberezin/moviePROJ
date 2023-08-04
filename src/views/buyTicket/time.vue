<template>
  <Main>
    <template #default>
      <h3 class="mt-5">Choose time</h3>
      <div v-if="time" class="selectTime">
        <div v-for="item in time" :key="i" class="selectTime_item" @click="nextStep(item)">
          <h5>{{ item.time }}</h5>
          <b>Cinema: {{ item.cinema }}</b>
          <div class="ml-auto">{{ item.price }}</div>
        </div>
      </div>
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
import Main from "@/views/buyTicket/main.vue";
import {onBeforeMount, ref} from "vue";
import {getBackStep, getNextStep, getSteps, useBuyTicketStore} from "@/store/buyTicket";
import {useRoute, useRouter} from "vue-router";
import {getTimeByDate} from "@/fakeData/butTicket";

const router = useRouter()
const route = useRoute()
const buyTicketStore = useBuyTicketStore()
const time = ref(null)

onBeforeMount(() => {
  if(!buyTicketStore.date){
    const items = getSteps(route.params.id)
    const step = getBackStep(items, route.name)
    if(step){
      return router.push(step);
    }
    return console.error('No date')
  }

  time.value = getTimeByDate()
})

const nextStep = (item) => {
  const steps = getSteps(route.params.id)
  const step = getNextStep(steps, route.name)
  if(step){
    buyTicketStore.$patch({timeObj: item})
    router.push(step);
  }
}

</script>

<style lang="scss" scoped>
@import "@/assets/css/vars.scss";

.selectTime{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  margin-top: 20px;
  &_item{
    display: flex;
    align-items: center;
    scroll-snap-align: start;
    grid-gap: 10px;
    background: #262626;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    transition: .25s;
    &:hover{
      background: $primary;
    }
    b{
      font-size: 17px;
      font-weight: 600;
    }
  }
}
</style>