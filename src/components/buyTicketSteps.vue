<template>
  <div class="grid grid-nogutter justify-content-between mt-2">
    <Button label="Back" @click="prevPage" size="small" icon="pi pi-angle-left"/>
  </div>
  <Steps :model="items" aria-label="Form Steps"/>
  <!--    <Button label="Next" @click="nextPage" size="small" icon="pi pi-angle-right" iconPos="right"/>-->
</template>

<script setup>
import {ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {getBackStep, getSteps} from "@/store/buyTicket";

const router = useRouter();
const route = useRoute()
const {id} = defineProps(['id']);
const formObject = ref({});
const items = ref(getSteps(id ? id : route.params.id));

const prevPage = (event) => {
  const step = getBackStep(items.value, route.name)
  if(step){
    router.push(step);
  }
};
const complete = () => {
  alert('123')
  // toast.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + formObject.value.firstname + ' ' + formObject.value.lastname + ' your order completed.'});
};
</script>

<style scoped>

</style>