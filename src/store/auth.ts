import { defineStore } from 'pinia';
import {computed, ref} from "vue";
import type { Ref } from 'vue'
import {useRouter} from "vue-router";

interface AuthStoreState {
  email: Ref<string | null>;
  accessToken: Ref<string | null>;
  uid: Ref<string | null>
}

interface AuthStoreGetters {
  getToken: string | null;
  isAuth: boolean;
}

interface AuthStoreActions {
  setTokens: (accessToken: string | null, email: string | null, remember: boolean) => void;
  clearTokens: () => void;
  restoreTokens: () => void;
}

export const useAuthStore = defineStore('auth', () => {
  const email = ref<string | null>(null);
  const accessToken = ref<string | null>(null);
  const uid = ref<string | null>(null)
  const getToken = computed<string | null>(() => accessToken.value);
  const isAuth = computed<boolean>(() => !!accessToken.value);

  function setTokens(newAccessToken: string | null, newEmail: string | null, remember: boolean, uId: string) {
    accessToken.value = newAccessToken;
    email.value = newEmail;
    uid.value = uId;
    if (remember) {
      localStorage.setItem('email', newEmail || '');
      localStorage.setItem('accessToken', newAccessToken || '');
      localStorage.setItem('uid', uId || '');
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('uid');
    }
  }

  function clearTokens() {
    accessToken.value = null;
    email.value = null;
    uid.value = null
    localStorage.removeItem('email');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('uid');
  }

  async function restoreTokens() {
    const accessTokenLs = localStorage.getItem('accessToken');
    const emailLS = localStorage.getItem('email');
    const uId = localStorage.getItem('uid');

    email.value = emailLS || null;
    accessToken.value = accessTokenLs || null;
    uid.value = uId || null;
    if(accessToken.value){
      const router = useRouter()
      await router.push('/')
    }
  }

  return { email, accessToken, getToken, isAuth,uid, setTokens, clearTokens, restoreTokens };
});

export type AuthStore = AuthStoreState & AuthStoreGetters & AuthStoreActions;
