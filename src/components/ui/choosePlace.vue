<template>
  <div>
    <div class="cinema">
      <div class="screen">
        <svg width="546" height="37" viewBox="0 0 546 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M265 0C422.773 -2.56109e-06 546 37 546 37C546 37 374.961 18.4914 265 19C162.443 19.4743 0 33 0 33C0 33 147.5 0 265 0Z" fill="#464646"/>
        </svg>
      </div>
      <div class="seats">
        <div v-for="row in rows" :key="row.id" class="row">
          <div v-for="seat in row.seats" :key="seat.id" class="seat" @click="selectItemsToggle(seat)" :class="{'active': isActive(seat)}">
            {{ seat.label }}
          </div>
        </div>
      </div>
    </div>
    <Button size="small" @click="clear" outlined class="ml-auto mb-2">Clear</Button>

  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useBuyTicketStore} from "@/store/buyTicket";

const rows = ref([]);
const selectItems = ref([])

const isActive = (item) => selectItems.value.includes(item)
const emit = defineEmits();
const buyTicketStore = useBuyTicketStore()

const selectItemsToggle = (item) => {
  if (selectItems.value.includes(item)) {
    // Если элемент уже в массиве selectItems, удаляем его
    const index = selectItems.value.indexOf(item);
    selectItems.value.splice(index, 1);
  } else {
    // Иначе, добавляем элемент в массив selectItems
    selectItems.value.push(item);
  }
  buyTicketStore.$patch({seatList: selectItems.value})
}

const clear = () => {
  selectItems.value = []
  buyTicketStore.$patch({seatList: selectItems.value})
}

function generateSeats(count, row) {
  const seats = [];
  for (let i = 1; i <= count; i++) {
    seats.push({ id: i, label: `${String.fromCharCode(64 + row)}${i}` });
  }
  return seats;
}

// Генерируем ряды с заданным количеством сидений
for (let i = 1; i <= 10; i++) {
  rows.value.push({ id: i, seats: generateSeats(16, i) });
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/vars.scss";
/* Стили для общего контейнера кинозала */
.cinema {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}
.screen{
  width: 100%;
  svg{
    width: 100%;
  }
}
/* Стили для экрана */


/* Стили для контейнера с сиденьями */
.seats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

/* Стили для ряда */
.row {
  display: flex;
  margin-bottom: 10px;
}

/* Стили для сиденья */
.seat {
  width: 30px;
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  background: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  margin: 2px 3px;
  border-radius: 4px;
  cursor: pointer;
  &:hover{
    background: #212121;
  }
  &.active{
    background: $primary;
  }
}

</style>