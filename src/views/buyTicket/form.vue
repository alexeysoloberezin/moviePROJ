<template>
  <Main>
    <template #default>
      <h3 class="mt-5">Choose time</h3>
      <choose-place/>

      <div v-if="totalPrice" class="flex gap-3 align-items-center">
        <Button size="small">{{ ticketList.length > 1 ? 'Buy tickets' : 'Buy ticket' }}</Button>
        <h5>Total: {{ totalPrice }} $</h5>
      </div>
      <ul class="tickets">
        <li v-for="(ticket, idx) in ticketList" :key="ticket.id">
          <div>{{ ticket.label }}</div>
          <div class="ml-auto">{{ ticketPrice }}</div>
          <div v-if="idx !== 0" style="margin-right: -15px" class="pl-2">+</div>
        </li>
      </ul>
      <StripeCheckout />
    </template>
  </Main>
</template>

<script setup>
import Main from "@/views/buyTicket/main.vue";
import {computed, onBeforeMount, ref} from "vue";
import {getBackStep, getNextStep, getSteps, useBuyTicketStore} from "@/store/buyTicket";
import {useRoute, useRouter} from "vue-router";
import {getTimeByDate} from "@/fakeData/butTicket";
import ChoosePlace from "@/components/ui/choosePlace.vue";
import StripeCheckout from "@/components/stripeCheckout.vue";

const router = useRouter()
const route = useRoute()
const buyTicketStore = useBuyTicketStore()
const time = ref(null)
const totalPrice = ref(0)
const ticketPrice = computed(() => buyTicketStore.timeObj.price)

const ticketList = computed(() => {
  if(ticketPrice){
    const cleanedPriceString = ticketPrice.value.replace(/\$|\s/g, '');
    const price = parseFloat(cleanedPriceString);
    totalPrice.value = price * buyTicketStore.seatList.length
  }
  return buyTicketStore.seatList
})

const selectedItems = computed(() => {

})

onBeforeMount(() => {
  if(!buyTicketStore.timeObj){
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
.tickets{
  max-width: 210px;
  margin-top: 15px;
  li{
    display: flex;
    padding: 3px 0;
    font-size: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}
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