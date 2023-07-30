<template>
  <div class="formAuth">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6 mx-auto ">
      <div class="text-center mb-5">
        <img src="@/assets/imgs/logoBig.png" alt="Image" height="110" class="mb-3">
        <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        <span class="text-600 font-medium line-height-3">Don't have an account?</span>
        <router-link to="/auth/register" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create
          today!
        </router-link>
      </div>

      <div>
        <label for="email1" class="block text-900 font-medium mb-2">Email</label>
        <InputText v-model="email" id="email1" type="text" class="w-full mb-3"/>

        <label for="password1" class="block text-900 font-medium mb-2">Password</label>
        <InputText v-model="password" id="password1" type="password" class="w-full mb-3"/>

        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center">
            <Checkbox id="rememberme1" :binary="true" v-model="remember" class="mr-2"></Checkbox>
            <label for="rememberme1">Remember me</label>
          </div>
        </div>

        <Button :loading="loading" label="Sign In" icon="pi pi-user" class="w-full" @click="signIn"></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useAuthStore} from '@/store/auth';
import {useRouter} from "vue-router";
import {auth} from "@/plugins/filrebase";
import {useToast} from 'vue-toastification';

const email = ref('');
const password = ref('');
const remember = ref(true);
const error = ref('');
const router = useRouter()
const toast = useToast();
const loading = ref(false)

async function signIn() {
  loading.value = true
  try {
    console.log('auth', auth);
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    console.log('Logged in user:', user);
    if (user.accessToken) {
      const authStore = useAuthStore()
      authStore.setTokens(user.accessToken, user.email, remember.value, user.uid)
      await router.push('/')
    } else {
      toast.error('Token is empty')
    }
  } catch (error) {
    console.error(error.message);
    toast.error(error.message)
  }
  loading.value = false
}
</script>

<style scoped>

</style>
