import { defineStore } from 'pinia';
import api from "@/plugins/api";
import {computed, ref} from "vue";
import type {Ref, ComputedRef} from "vue";
import {videoImages} from "@/types/films/film.types";

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

export const useFilmsStore = defineStore('films', ()  => {
  const films = ref<null | FilmData[]>(null);
  const film = ref<null | FilmDataZoom>(null);
  const awards = ref<null | FilmAward[]>(null);
  const videos = ref<any>(null)
  const videoImages = ref<any>(null)
  const videoImageLoading = ref<boolean>(false)

  const videoImagesLength = computed(() => videoImages.value ? videoImages.value.length : 0)
  const getVideoYoutube = computed(() => {
    if(!videos.value) return videos.value
    return videos.value.filter((video) => video?.site === 'YOUTUBE')
  })

  const getOskarLength = computed<number | null>(() => {
    if (Array.isArray(awards.value)) {
      const oskarArr = awards.value.filter(award => award.name === 'Оскар');
      console.log(oskarArr);
      return oskarArr.length;
    } else {
      return null;
    }
  });

  async function loadFilms(page: number | string): Promise<void> {
    try {
      const response = await api.get(`/films/top?type=TOP_100_POPULAR_FILMS&page=${page || 1}`);
      if (response.data) {
        films.value = response.data.films;
      }
    } catch (error) {
      console.error('Error loading films:', error);
    }
  }

  async function loadFilm(id: number | string): Promise<void> {
    try {
      const response = await api.get('/films/' + id);
      if (response.data) {
        film.value = response.data;
      }
    } catch (error) {
      console.error('Error loading films:', error);
    }
  }

  async function loadAwards(id: number | string): Promise<void> {
    try {
      const response = await api.get('/films/' + id + '/awards');
      if (response.data) {
        awards.value = response.data.items;
      }
    } catch (error) {
      console.error('Error loading films:', error);
    }
  }

  async function loadVideos(id: number | string): Promise<void> {
    try {
      const response = await api.get('/films/' + id + '/videos');
      if (response?.data?.items) {
        videos.value = response.data.items
      }
    } catch (error) {
      console.error('Error loading films:', error);
    }
  }

  async function loadImages(id: number | string, type: videoImages): Promise<void> {
    try {
      videoImageLoading.value = true
      const response = await api.get(`/films/${id}/images?type=${type}`);
      if (response?.data?.items) {
        videoImages.value = response.data.items
      }
    } catch (error) {
      console.error('Error loading films:', error);
    }
    videoImageLoading.value = false
  }

  async function loadSequels(id: number | string): Promise<void> {
    try {
      const response = await api.get(`/films/${id}/sequels_ang_prequels`);
      if (response?.data?.items) {
        debugger
      }
    } catch (error) {
      console.error('Error loading films:', error);
    }
  }

  function clearFilmsAll(): void {
    films.value = null;
    film.value = null;
    awards.value = null;
    videos.value = null;
    videoImages.value = null;
  }

  return <FilmStoreState>{
    loadVideos,
    loadAwards,
    loadFilm,
    loadFilms,
    loadImages,
    loadSequels,
    videoImageLoading,
    videoImagesLength,
    videoImages,
    getVideoYoutube,
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

