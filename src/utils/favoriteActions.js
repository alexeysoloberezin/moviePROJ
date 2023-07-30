// plugins/firebase.js
import {getFirestore, collection, doc, setDoc, updateDoc, getDoc, getDocs} from 'firebase/firestore';
import {useFilmsStore} from "../store/films/films";

export async function addToFavorites(userId, movie) {
  try {
    const favoritesRef = doc(collection(getFirestore(), 'favorites'), userId);
    const favoritesSnapshot = await getDoc(favoritesRef);

    if (!favoritesSnapshot.exists()) {
      // Если у пользователя еще нет списка избранного, создаем его и добавляем фильм
      await setDoc(favoritesRef, { movies: [movie] });
    } else {
      // Если у пользователя уже есть список избранного
      const currentFavorites = favoritesSnapshot.data().movies || [];
      const movieId = movie.id;
      const movieIndex = currentFavorites.findIndex((item) => item.id === movieId);

      if (movieIndex !== -1) {
        // Фильм уже есть в списке, удаляем его
        currentFavorites.splice(movieIndex, 1);
        await updateDoc(favoritesRef, { movies: currentFavorites });
      } else {
        // Фильма нет в списке, добавляем его
        currentFavorites.push(movie);
        await updateDoc(favoritesRef, { movies: currentFavorites });
      }
    }

    // Удаление объектов типа string из списка favorites
    const currentFavorites = favoritesSnapshot.data().movies || [];
    const updatedFavorites = currentFavorites.filter((item) => typeof item !== 'string');
    if (currentFavorites.length !== updatedFavorites.length) {
      await updateDoc(favoritesRef, { movies: updatedFavorites });
      console.log('Удалены объекты типа string из списка избранного!');
    }
  } catch (error) {
    console.error('Ошибка при добавлении фильма в список избранного:', error);
  }
}



export async function getAllFavorites() {
  try {
    // Формируем ссылку на коллекцию favorites
    const favoritesRef = collection(getFirestore(), 'favorites');

    // Получаем все документы в коллекции
    const favoritesSnapshot = await getDocs(favoritesRef);

    // Преобразуем снимок документов в массив объектов данных
    const favorites = favoritesSnapshot.docs.map((doc) => doc.data());

    return favorites;
  } catch (error) {
    console.error('Ошибка при получении коллекции избранного123:', error);
    return [];
  }
}

export async function getFavorites(userId) {
  const filmStore = useFilmsStore()

  try {
    const favoritesRef = doc(collection(getFirestore(), 'favorites'), userId);
    const favoritesSnapshot = await getDoc(favoritesRef);

    if (favoritesSnapshot.exists()) {
      const favorites = favoritesSnapshot.data().movies || [];
      filmStore.setFavorite(favorites)
      return favorites;
    } else {
      filmStore.setFavorite(favorites)
      return [];
    }
  } catch (error) {
    console.error('Ошибка при получении списка избранного:', error);
    filmStore.setFavorite(favorites)
    return [];
  }
}
