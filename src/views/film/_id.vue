<template>
  <div class="box">
    <div class="film" v-if="film">
      <div class="film__l">
        <Image :src="film.posterUrl || film.posterUrlPreview" class="film__img" alt="Image" preview/>
      </div>
      <div class="film__r">
        <div class="flex gap-2">
        </div>
        <div class="flex align-items-center gap-2">
          <favorite-btn
            :name="film.nameRu || film.nameEn"
            :poster-img="film.posterUrl || film.posterUrlPreview"
            :id="id"
          />
          <p>Year: {{ film.year }}</p>
        </div>
        <div class="flex align-items-center gap-2 mt-3">
          <Tag v-if="film.ratingImdb">Imdb: {{ film.ratingImdb }}</Tag>
          <Tag v-if="film.ratingKinopoisk ">Kinopoisk: {{ film.ratingKinopoisk }}</Tag>
          <template v-if="film.countries">
            <Tag v-for="countrie in film.countries" severity="warning">{{ countrie.country }}</Tag>
          </template>
        </div>
        <div v-if="film.genres" class="flex align-items-center gap-2 mt-3">
          <Tag v-for="genre in film.genres"
               :style="{background: 'rgba(183,183,183,0)',color: '#fff',border: '1px solid rgba(255,255,255,0.2)'}">
            {{ genre.genre }}
          </Tag>
        </div>
        <h1 class="my-2">{{ film.nameRu || film.nameEn }}</h1>
        <div style="max-width: 520px;" v-html="film.description"></div>

        <div>
          <span v-if="film.filmLength" class="mt-3 inline-flex opacity-50">Длительность: {{ film.filmLength }}</span>
          <span v-if="film.ratingAgeLimits" class="mt-3 ml-3 inline-flex opacity-50">Возраст: {{
              film.ratingAgeLimits
            }}</span>
        </div>
        <Divider/>
        <div class="flex flex-wrap gap-2 my-3">
          <!--          <Button severity="success" raised rounded outlined>View Trailer</Button>-->
          <Button v-if="!videos" severity="success" outlined raised rounded @click="getTrailer(film.kinopoiskId)">View
            Trailer
          </Button>
          <template v-else>
            <template v-if="Array.isArray(videos) && videos.length > 0">
              <Tag v-for="video in videos" severity="success" class="cursor-pointer" @click="openTrailer(video.url)">
                {{ video.name }}
              </Tag>
            </template>
            <Tag v-else severity="warning">
              Sorry we dont have Video yet.
            </Tag>
          </template>
          <Dialog v-model:visible="showTrailer" maximizable modal header="Header" :style="{ width: '60vw' }">
            <div class="video-container">
              <iframe
                  :src="urlTrailer"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
              ></iframe>
            </div>
          </Dialog>
        </div>
      </div>
    </div>

    <div class="my-4">
      <TabView :scrollable="true" @tab-change="changeVideoImageTab">
        <TabPanel v-for="tab in scrollableTabs" :key="tab.title" :header="tab.title">
          <div v-if="!videoImageLoading">
            <div v-if="Array.isArray(videosImages) && videosImages.length > 0"
                 class="images flex flex-row flex-wrap align-items-start">
              <Image v-for="vImage in videosImages" class="col-3"
                     alt="Image" imageStyle="width:100%;heigth:100%" preview
              >
                <template #image>
                  <img :src="vImage.previewUrl" alt="image"
                       style="width: 100%;height: 100%;max-height: 400px;object-fit: cover"/>
                </template>
                <template #preview="slotProps">
                  <img :src="vImage.imageUrl" alt="preview" :style="slotProps.style"
                       style="max-width: 90vw;max-height: 90vh;" @click="slotProps.onClick"/>
                </template>
              </Image>
              <div v-if="videoImagesLength > 8" class="flex justify-content-center" style="width: 100%;">
                <Button class="mx-auto mt-4 " size="small" @click="videosImagesShowMore = !videosImagesShowMore">
                  {{ !videosImagesShowMore ? 'Show more' : 'Collapse' }}
                </Button>
              </div>
            </div>
            <h5 v-else class="text-center">No data :(</h5>
          </div>
          <ProgressBar v-else mode="indeterminate" style="height: 6px"></ProgressBar>
        </TabPanel>
      </TabView>
    </div>

    <div v-if="sequels">
      <h2 class="mt-5">Sequels</h2>
      <Swiper1 :films="sequels"/>
    </div>
  </div>
</template>

<script setup>
import {useFilmsStore} from '@/store/films/films';
import {useRoute} from 'vue-router';
import {computed, onBeforeMount, ref, watch} from 'vue'
import {getEmbedUrlYoutube} from "@/utils/video";
import {videoImages} from "@/types/films/film.types";
import FavoriteBtn from "@/components/FavoriteBtn.vue";
import Swiper1 from "@/components/ui/swipers/Swiper1.vue";

const filmsStore = useFilmsStore();
const route = useRoute()
const id = route.params.id
const film = computed(() => filmsStore.film);
const sequels = computed(() => filmsStore.sequels);
const videos = computed(() => filmsStore.getVideoYoutube);
const videoImagesLength = computed(() => filmsStore.videoImagesLength)
const videosImages = computed(() => {
  if (videosImagesShowMore.value) return filmsStore.videoImages
  return filmsStore.videoImages ? filmsStore.videoImages.slice(0, 8) : null
});
const videoImageLoading = computed(() => filmsStore.videoImageLoading);
const videosImagesShowMore = ref(false)

const showTrailer = ref(false)
const urlTrailer = ref(null)
const tabsVideoImages = Object.values(videoImages)
const scrollableTabs = ref(tabsVideoImages.map((value) => ({title: value})));


onBeforeMount(() => {
  filmsStore.clearFilmsAll()
  if (id) {
    filmsStore.loadFilm(id);
    filmsStore.loadSequels(id)
    filmsStore.loadImages(id, tabsVideoImages[0])
  }
})

const getTrailer = (id) => {
  filmsStore.loadVideos(id)
}

const openTrailer = (url) => {
  showTrailer.value = true
  urlTrailer.value = getEmbedUrlYoutube(url)
}

const changeVideoImageTab = ({index}) => {
  filmsStore.loadImages(id, tabsVideoImages[index])
}

</script>

<style lang="scss">
.film {
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-gap: 30px;

  &__img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    object-fit: contain;
  }
}
</style>
