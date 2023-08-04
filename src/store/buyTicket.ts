import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";



export const useBuyTicketStore = defineStore('BuyTicket', () => {
  const date = ref('')
  const timeObj = ref(null)

  return { date, timeObj }
})

export const getSteps = (id) => {
  return [
    {
      name: 'buyTicketStart',
      label: 'Choose date',
      to: `/buyTicket/${id}/start`
    },
    {
      name: 'buyTicketTime',
      label: 'Choose time',
      to: `/buyTicket/${id}/time`
    },
    {
      name: 'buyTicketForm',
      label: 'Form',
      to: `/buyTicket/${id}/form`
    },
    {
      name: '',
      label: 'Payment',
      to: `/buyTicket/${id}/payment`
    }
  ]
}

export const getNextStep = (items, name) => {
  const find = items.find(el => el.name === name)
  if (find) {
    const index = items.indexOf(find);
    return items[index + 1].to
  }
}
export const getBackStep = (items, name) => {
  const find = items.find(el => el.name === name)
  if (find) {
    const index = items.indexOf(find);
    return items[index - 1].to
  }
}