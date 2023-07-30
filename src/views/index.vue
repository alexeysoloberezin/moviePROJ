<template>
  <div v-if="film" class="banner"
       :style="{'--background': `url(${film.coverUrl || film.posterUrl}) center/cover no-repeat`}"
       :class="{'show': film.coverUrl || film.posterUrl}"
  >
    <div class="banner__wrp">
      <div class="banner__info">
        <div class="flex gap-2">
          <Imdb v-if="film.ratingImdb" :rating="film.ratingImdb"/>
          <KinoPoiskRating v-if="film.ratingKinopoisk" :rating="film.ratingKinopoisk" :link="film.webUrl"/>
        </div>
        <h1>{{ film.nameRu || film.nameEn }}</h1>
        <h4>{{ film.shortDescription || film.description }}</h4>

        <router-link :to="'/film/' + film.kinopoiskId">
          <Button label="Warning" severity="Info" rounded size="small">More info</Button>
        </router-link>
      </div>

      <Swiper1 :films="films"/>
    </div>
  </div>
</template>

<script  setup>
import {computed} from '@vue/reactivity';
import Imdb from '@/components/ui/Imdb.vue';
import KinoPoiskRating from '@/components/ui/KinoPoiskRating.vue';
import {getRandomInt} from '@/utils/randomNumber';
import Oskar from '@/components/ui/Oskar.vue';
import {useFilmsStore} from "@/store/films/films";
import {onBeforeMount} from "vue";
import Swiper1 from "@/components/ui/swipers/Swiper1.vue";

const favoriteFilms = [927898, 4485219, 301, 1143242, 1405508];
const random = favoriteFilms[getRandomInt(0, favoriteFilms.length)]

const filmsStore = useFilmsStore();

const films = computed(() => filmsStore.films);
const film = computed(() => filmsStore.film);

onBeforeMount(() => {
  filmsStore.clearFilmsAll()
  filmsStore.loadFilms(1);
  filmsStore.loadFilm(random || favoriteFilms[0]);
})
</script>

<style lang="scss">


@keyframes showCover {
  0% {
    filter: blur(30px);
  }
  100% {
    filter: blur(0px);
  }
}

.banner {
  height: 100vh;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: var(--background);
    transition: 1.4s filter;
  }

  &.show {
    &:before {
      animation: showCover 1.4s;
    }

  }

  &__info {
    padding-left: 55px;
    margin-top: calc(100vh - 400px - 450px);
    max-width: 900px;
    margin-bottom: 50px;
    @media (max-height: 830px) {
      margin-top: 50px;
    }

    h1 {
      margin: 10px 0;
    }

    h4 {
      margin: 10px 0;
    }
  }

  &:after {
    content: '';
    position: absolute;
    background: rgba(0, 0, 0, 0.52);
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
  }

  &__wrp {
    position: relative;
    z-index: 5;
    padding: 30px;
  }
}
</style>
