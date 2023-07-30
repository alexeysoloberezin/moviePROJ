<template>
  <TieredMenu :model="items" />
</template>

<script setup>
import {computed} from 'vue';
import TieredMenu from 'primevue/tieredmenu';
import { useAuthStore } from '@/store/auth';
import {useFilmsStore} from "@/store/films/films";
import {addToFavorites, getAllFavorites, getFavorites} from "@/utils/favoriteActions";
import {auth} from "@/plugins/filrebase";

const authStore = useAuthStore();
const filmsStore = useFilmsStore()
const favoriteLength = computed(() => filmsStore.favoriteLength)
const items = computed(() => {
  const loginObj = authStore.isAuth
      ? [

        {
          label: `Favorite (${favoriteLength.value})`,
          icon: 'pi pi-fw pi-bookmark',
          to: '/favorite'
        },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-step-backward-alt',
          to: '/auth/logout'
        },
        {
          label: authStore.email,
        },
      ]
      : [
        {
          label: 'Login',
          icon: 'pi pi-fw pi-file',
          to: '/auth/login'
        },
      ];

  return [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      to: '/'
    },
    {
      label: 'Films',
      icon: 'pi pi-fw pi-video',
      to: '/allFilms'
    },
    ...loginObj,
  ];
});

const user = auth.currentUser;
const filmStore = useFilmsStore()

auth.onAuthStateChanged(async (user) => {
  filmStore.setFavorite([])

  if (user) {
    console.log('Пользователь авторизован:', user);
    const res = await getFavorites(user.uid)
    filmStore.setFavorite(res)
  } else {
    console.log('Пользователь не авторизован');
  }
});



</script>
<style lang="scss">
.p-tieredmenu {
  position: fixed;
  z-index: 100;
  top: -2px;
  left: -2px;
  height: calc(100vh + 4px);
  border-radius: 0 10px 10px 0;
}
</style>
