import { defineStore } from 'pinia';
import {computed, ref} from "vue";
import type { Ref } from 'vue'

// Define the interfaces for email and accessToken
interface AuthStoreState {
  email: Ref<string | null>;
  accessToken: Ref<string | null>;
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

  const getToken = computed<string | null>(() => accessToken.value);
  const isAuth = computed<boolean>(() => !!accessToken.value);

  function setTokens(newAccessToken: string | null, newEmail: string | null, remember: boolean) {
    accessToken.value = newAccessToken;
    email.value = newEmail;
    if (remember) {
      localStorage.setItem('email', newEmail || '');
      localStorage.setItem('accessToken', newAccessToken || '');
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('accessToken');
    }
  }

  function clearTokens() {
    accessToken.value = null;
    email.value = null;
    localStorage.removeItem('email');
    localStorage.removeItem('accessToken');
  }

  function restoreTokens() {
    const accessTokenLs = localStorage.getItem('accessToken');
    const emailLS = localStorage.getItem('email');
    email.value = emailLS || null;
    accessToken.value = accessTokenLs || null;
  }

  return { email, accessToken, getToken, isAuth, setTokens, clearTokens, restoreTokens };
});

export type AuthStore = AuthStoreState & AuthStoreGetters & AuthStoreActions;
