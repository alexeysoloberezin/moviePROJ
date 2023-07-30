import {defineStore} from 'pinia';
import api, {defaultUrlV1, makeRequest} from "@/plugins/api";
import {computed, ref} from "vue";
import type {Ref, ComputedRef} from "vue";
import {videoImages} from "@/types/films/film.types";

export enum SortOrder {
  RATING = 'RATING',
  NUM_VOTE = 'NUM_VOTE',
  YEAR = 'YEAR',
}
export enum FilmType {
  FILM = 'FILM',
  TV_SHOW = 'TV_SHOW',
  TV_SERIES = 'TV_SERIES',
  MINI_SERIES = 'MINI_SERIES',
  ALL = 'ALL'
}

export const allSortOrders = Object.entries(SortOrder).map(([key, name]) => ({ key, name }));;
export const allFilmType = Object.entries(FilmType).map(([key, name]) => ({ key, name }));;


export const useFilmsStore = defineStore('films', () => {
  const films = ref<[] | FilmData[]>([]);
  const currentPage = ref<number>(0);
  const totalPages = ref<any>(null);
  const disableLoading = ref<boolean>(false)
  const film = ref<null | FilmDataZoom>(null);
  const awards = ref<null | FilmAward[]>(null);
  const videos = ref<any>(null)
  const videoImages = ref<any>(null)
  const videoImageLoading = ref<boolean>(false)
  const sequels = ref<any>(null)
  const similars = ref<any>(null)
  const favorite = ref<any>([])
  const filters = ref<any>({countries: [],genres:[]})

  const videoImagesLength = computed(() => videoImages.value ? videoImages.value.length : 0)

  const favoriteLength = computed(() => favorite.value ? favorite.value.length : 0)

  const getVideoYoutube = computed(() => {
    if (!videos.value) return videos.value
    return videos.value.filter((video) => video?.site === 'YOUTUBE')
  })

  const isLastPage = computed(
    () => totalPages.value && currentPage.value === totalPages.value)

  const getOskarLength = computed<number | null>(() => {
    if (Array.isArray(awards.value)) {
      const oskarArr = awards.value.filter(award => award.name === 'Оскар');
      console.log(oskarArr);
      return oskarArr.length;
    } else {
      return null;
    }
  });

  function isFavorite(id: string | number): boolean {
    return favorite.value.some((item) => String(item.id) === String(id))
      || favorite.value.some((item) => String(item.kinopoiskId) === String(id))
      || favorite.value.some((item) => String(item.imdbId) === String(id))
  }

  function setFavorite(arr: string[]) {
    if (Array.isArray(arr)) {
      favorite.value = [...arr]
    }
  }

  async function loadFilters(): Promise<void> {
    try {
      const response = await makeRequest({url: `/films/filters`, method: 'get'})
      if (response.data) {
        filters.value = {
          countries: response.data.countries.map(item => {
            return {
              name: item.country,
              key: item.country,
              id: item.id
            }
          }),
          genres: response.data.genres.map(item => {
            return {
              name: item.genre,
              key: item.genre,
              id: item.id
            }
          })
        };
      }
    } catch (error) {
      console.error('Error loading filters:', error);
    }
  }

  async function loadFilms(page: number | string): Promise<void> {
    try {
      const response = await makeRequest({
        url: `/films/top?type=TOP_100_POPULAR_FILMS&page=${page || 1}`,
        method: 'get'
      })
      if (response.data) {
        films.value = response.data.films;
      }
    } catch (error) {
      console.error('Error loading films:', error);
    }
  }

  async function loadFilm(id: number | string): Promise<void> {
    try {
      const response = await makeRequest({url: `/films/${id}`, method: 'get'})
      if (response.data) {
        film.value = response.data;
      }
    } catch (error) {
      console.error('Error loading film:', error);
    }
  }

  async function loadAwards(id: number | string): Promise<void> {
    try {
      const response = await makeRequest({url: '/films/' + id + '/awards', method: 'get'})
      if (response.data) {
        awards.value = response.data.items;
      }
    } catch (error) {
      console.error('Error loading awards:', error);
    }
  }

  async function loadVideos(id: number | string): Promise<void> {
    try {
      const response = await makeRequest({url: '/films/' + id + '/videos', method: 'get'})
      if (response?.data?.items) {
        videos.value = response.data.items
      }
    } catch (error) {
      console.error('Error loading videos:', error);
    }
  }

  async function loadImages(id: number | string, type: videoImages): Promise<void> {
    try {
      videoImageLoading.value = true
      const response = await makeRequest({url: `/films/${id}/images?type=${type}`, method: 'get'})
      if (response?.data?.items) {
        videoImages.value = response.data.items
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
    videoImageLoading.value = false
  }

  async function loadSequels(id: number | string): Promise<void> {
    try {
      const response = await makeRequest({
        url: `/films/${id}/sequels_and_prequels`,
        method: 'get',
        baseURL: defaultUrlV1
      })
      if (response?.data) {
        sequels.value = response.data
      }
    } catch (error) {
      console.error('Error loading Sequels:', error);
    }
  }

  async function loadSimilars(id: number | string): Promise<void> {
    try {
      const response = await makeRequest({url: `/films/${id}/similars`, method: 'get'})
      if (response?.data) {
        similars.value = response.data
      }
    } catch (error) {
      console.error('Error loading Similars:', error);
    }
  }

  async function loadFilmsFiltered(params: FilmSearchParams, loadMore:boolean): Promise<void> {
    console.log('loadFilmsFiltered')
    try {
      videoImageLoading.value = true
      const response = await makeRequest({url: `/films`, method: 'get', params})
      if (response?.data) {
        totalPages.value = response.data.totalPages
        if(loadMore){
          films.value = films.value.concat(response.data.items)
        }else{
          films.value = response.data.items
        }
        disableLoading.value = false
      }
    } catch (error) {
      console.error('Error loading Similars:', error);
    }
    videoImageLoading.value = false
  }

  function clearFilmsAll(): void {
    films.value = [];
    film.value = null;
    awards.value = null;
    videos.value = null;
    videoImages.value = null;
    videoImageLoading.value = false;
    sequels.value = null;
    similars.value = null;
    filters.value = null;
    totalPages.value = null
    currentPage.value = 1
  }

  return <FilmStoreState>{
    loadVideos,
    loadAwards,
    loadFilm,
    loadFilms,
    loadImages,
    loadSequels,
    loadFilters,
    loadFilmsFiltered,
    filters,
    currentPage,
    isLastPage,
    disableLoading,
    totalPages,
    loadSimilars,
    setFavorite,
    videoImageLoading,
    videoImagesLength,
    videoImages,
    isFavorite,
    favoriteLength,
    favorite,
    similars,
    getVideoYoutube,
    sequels,
    films,
    videos,
    film,
    awards,
    getOskarLength,
    clearFilmsAll
  };
});


interface FilmData {
  filmId: number;
  nameRu: string;
  nameEn: string;
  year: string;
  filmLength: string;
  countries: { country: string }[];
  genres: { genre: string }[];
  rating: string;
  ratingVoteCount: number;
  posterUrl: string;
  posterUrlPreview: string;
  ratingChange: string | null;
  isRatingUp: boolean | null;
  isAfisha: number;
}

interface FilmDataZoom {
  kinopoiskId: number;
  kinopoiskHDId: string;
  imdbId: string;
  nameRu: string;
  nameEn: string | null;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  coverUrl: string;
  logoUrl: string | null;
  reviewsCount: number;
  ratingGoodReview: number | null;
  ratingGoodReviewVoteCount: number;
  ratingKinopoisk: number;
  ratingKinopoiskVoteCount: number;
  ratingImdb: number;
  ratingImdbVoteCount: number;
  ratingFilmCritics: number;
  ratingFilmCriticsVoteCount: number;
  ratingAwait: number | null;
  ratingAwaitCount: number;
  ratingRfCritics: number;
  ratingRfCriticsVoteCount: number;
  webUrl: string;
  year: number;
  filmLength: number;
  slogan: string;
  description: string;
  shortDescription: string;
  editorAnnotation: string | null;
  isTicketsAvailable: boolean;
  productionStatus: string | null;
  type: string;
  ratingMpaa: string;
  ratingAgeLimits: string;
  countries: { country: string }[];
  genres: { genre: string }[];
  startYear: number | null;
  endYear: number | null;
  serial: boolean;
  shortFilm: boolean;
  completed: boolean;
  hasImax: boolean;
  has3D: boolean;
  lastSync: string;
}

interface Person {
  kinopoiskId: number;
  webUrl: string;
  nameRu: string;
  nameEn: string;
  sex: 'MALE' | 'FEMALE';
  posterUrl: string;
  growth: number | null;
  birthday: string | null;
  death: string | null;
  age: number;
  birthplace: string;
  deathplace: string | null;
  profession: string;
}

interface FilmAward {
  name: string;
  win: boolean;
  imageUrl: string | null;
  nominationName: string;
  year: number;
  persons: Person[];
}

export interface FilmSearchParams {
  countries?: number[];  // Массив id стран разделенных запятой
  genres?: number[];     // Массив id жанров разделенных запятой
  order?: SortOrder;     // Сортировка: 'RATING', 'NUM_VOTE' или 'YEAR'
  type?: FilmType;       // Тип фильма: 'FILM', 'TV_SHOW', 'TV_SERIES', 'MINI_SERIES' или 'ALL'
  ratingFrom?: number;   // Минимальный рейтинг
  ratingTo?: number;     // Максимальный рейтинг
  yearFrom?: number;     // Минимальный год
  yearTo?: number;       // Максимальный год
  imdbId?: string;       // IMDb ID
  keyword?: string;      // Ключевое слово, которое встречается в названии фильма
  page?: number;         // Номер страницы
}

interface FilmStoreState {
  films: Ref<FilmData[] | null>;
  film: Ref<FilmDataZoom | null>;
  awards: Ref<FilmAward[] | null>;
  videos: Ref<any>;
  videoImages: Ref<any>;
  getOskarLength: ComputedRef<number | null>;
  getVideoYoutube: ComputedRef<any>
  loadFilms: () => Promise<void>
  loadFilm: () => Promise<void>
  loadAwards: () => Promise<void>
  loadVideos: () => Promise<void>
  clearFilmsAll: () => Promise<void>
}