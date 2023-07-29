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
      </div>
      <Carousel v-if="films" class="slider" :value="films" :numVisible="6" :numScroll="1">
        <template #item="{data}">
          <router-link :to="'/film/' + data.filmId" class="slider__item">
            <div class="slider__poster">
              <img :src="data.posterUrlPreview" :alt="data.nameRu" class="shadow-2"/>
            </div>
            <div class="slider__info">
              <div>
                <h3>{{ data.rating }}</h3>
                <h4 class="my-1">{{ data.nameRu }}</h4>
                <h6>Длительность: {{ data.filmLength }}</h6>
                <div class="flex flex-wrap gap-1 mt-2">
                  <Tag v-for="genre in data.genres" :value="genre.genre" severity="success"/>
                </div>
              </div>
            </div>
          </router-link>
        </template>
      </Carousel>
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
.slider {
  &__poster {
    img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 8px;
      transition: .5s;
    }
  }

  &__info {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    border-radius: 8px;
    height: 100%;
    z-index: 2;
    transition: transform .2s, opacity .4s, filter .4s;
    opacity: 0;
    filter: blur(25px);
    transform-origin: bottom center;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      width: 102%;
      z-index: 1;
      background: rgba(0, 0, 0, 0.5);
      height: 102%;
      border-radius: 7px;
      backdrop-filter: blur(15px);
      left: 0;
    }

    & > div {
      position: relative;
      z-index: 5;
      padding: 20px;
    }
  }

  &__item {
    margin: 10px;
    cursor: pointer;
    overflow: hidden;
    display: block;
    border-radius: 8px;
    position: relative;

    &:hover {
      .slider__poster {
        overflow: hidden;

        img {
          filter: blur(10px);
          transform: scale(1.1);
        }
      }

      .slider__info {
        opacity: 1;
        filter: blur(0px);
      }
    }

  }
}

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
