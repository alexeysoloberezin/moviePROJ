<template>
  <div>logout</div>
</template>

<script lang="ts">
import {AuthStore, useAuthStore} from '@/store/auth';
import {useRouter} from "vue-router";

export default {
  name: 'logout',
  beforeMount() {
    const authStore = useAuthStore()
    authStore.clearTokens()
    const router = useRouter()
    router.push('/auth/login')
  }
};
</script>

<style scoped>

</style>
