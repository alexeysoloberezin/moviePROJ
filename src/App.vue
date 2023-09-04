<script setup lang="ts">
import SidebarMain from '@/components/SidebarMain.vue';
import {useRoute} from 'vue-router';
import {computed} from '@vue/reactivity';
import {onBeforeMount} from '@vue/runtime-core';
import {useAuthStore} from "@/store/auth";

const emptyPage = ['/auth/login','/auth/register']
const route = useRoute()
const authStore = useAuthStore()

const isEmptyPage = computed(() =>  emptyPage.includes(route.path))

onBeforeMount(async () => {
  authStore.restoreTokens()
});
</script>

<template>
  <div v-if="isEmptyPage" >
    <RouterView/>
    <Toast/>
  </div>
  <div v-else class="main">
    <SidebarMain />
    <RouterView/>
    <Toast/>
  </div>
  <ScrollTop />
</template>

<style lang="scss">
.main{
  padding-left: 180px;
}
</style>
