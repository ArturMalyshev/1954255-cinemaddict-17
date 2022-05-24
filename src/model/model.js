import { getFilmInformation, getCommentInformation, commentsData, filmData } from '../mock/data.js';

const FILM_COUNT = 9;
const MAX_COMMENT_COUNT = 6;
const films = [];

for (let i = 0; i < FILM_COUNT; i++){
  const newFilm = getFilmInformation(filmData);
  films.push(newFilm);
}

const commentsArray = [];
for (let i = 0; i < MAX_COMMENT_COUNT; i++){
  const newComment = getCommentInformation(commentsData, i);
  commentsArray.push(newComment);
}

const userInfo = {
  name: 'Имя Имя',
  img: 'images/bitmap@2x.png',
  watchlistNum: 12,
  historyNum: 32,
  favoritesNum: 12
};

export {films, commentsArray, userInfo};
