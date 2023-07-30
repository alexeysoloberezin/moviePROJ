<template>
  <Button v-if="isAuth" @click.stop.prevent="favoriteToggle" :loading="favoriteLoading" icon="pi pi-bookmark"
          size="small" :severity="!isFavoriteFun ? 'secondary' : 'info'" aria-label="Bookmark"/>
</template>

<script setup>
import {auth} from "@/plugins/filrebase";
import {addToFavorites, getFavorites} from "@/utils/favoriteActions";
import {computed, ref, watch} from "vue";
import {useAuthStore} from "@/store/auth";
import {useFilmsStore} from "@/store/films/films";

const props = defineProps(['posterImg', 'id', 'name']);
const authStore = useAuthStore()
const filmsStore = useFilmsStore();

const favoriteLoading = ref(false)
const isFavoriteFun = ref(filmsStore.isFavorite(props.id))

const isAuth = computed(() => authStore.isAuth)
const favorite = computed(() => filmsStore.favorite)
watch(() => favorite.value, (newValue, oldValue) => {
  isFavoriteFun.value = filmsStore.isFavorite(props.id)
});

const favoriteToggle = async () => {
  const user = auth.currentUser;
  const userId = user.uid;
  if (userId && props.id) {
    favoriteLoading.value = true
    try {
      await addToFavorites(userId, {name: props.name, posterUrl: props.posterImg, id: props.id});
      await getFavorites(userId)
    } catch (err) {
    }
    favoriteLoading.value = false
  }
}
</script>

<style scoped>

</style>