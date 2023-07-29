<template>
  <div class="formAuth">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6 mx-auto ">
      <div class="text-center mb-5">
        <img src="@/assets/imgs/logoBig.png" alt="Image" height="110" class="mb-3">
        <div class="text-900 text-3xl font-medium mb-3">Register</div>
        <span class="text-600 font-medium line-height-3">You have account?</span>
        <router-link to="/auth/login" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Login!</router-link>
      </div>

      <div>
        <label for="email1" class="block text-900 font-medium mb-2">Email</label>
        <InputText id="email1" v-model="email" type="text" class="w-full mb-3" />

        <label for="password1" class="block text-900 font-medium mb-2">Password</label>
        <InputText id="password1" v-model="password" type="password" class="w-full mb-3" />

        <Button label="Sign Up" icon="pi pi-user" class="w-full" :loading="loading" @click="signUp"></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "@/plugins/filrebase";
import {useRouter} from "vue-router";
import { useToast } from 'vue-toastification';

const email = ref('');
const password = ref('');
const checked = ref(false);
const error = ref('');
const loading = ref(false)
const router = useRouter()
const toast = useToast();

async function signUp() {
  loading.value = true
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    toast.success('Success, please Log In')
    setTimeout(async () => {
      await router.push('/auth/login')
    }, 1500)
    // Здесь вы можете выполнить дополнительные действия после успешной регистрации
  } catch (error) {
    console.error(error.message);
    toast.error(error.message)
  }
  loading.value = false
}
</script>

<style scoped>

</style>
