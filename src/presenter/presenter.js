import { render, RenderPosition, remove } from '../framework/render.js';

import User from '../view/componentUser.js';
import Menu from '../view/componentMenu.js';
import Filmcard from '../view/componentFilmcard.js';
import Popup from '../view/componentPopup.js';
import EmptyList from '../view/componentEmptyList.js';
import SortMenu from '../view/componentSortMenu.js';
import ShowMoreButton from '../view/componentShowMoreButton.js';

import { films, commentsArray, userInfo } from '../model/model.js';

const user = new User(userInfo);
const menuCopy = new Menu(films);
const sortMenu = new SortMenu();
const showMoreButton = new ShowMoreButton();
const FILMCARD_COUNT_PER_STEP = 5;
let RenderedFilmcards = 5;

const renderer = (filmsArray) => {
  if (filmsArray.length === 0) {
    const content = new EmptyList();
    render(content, document.querySelector('.films-list'), RenderPosition.BEFOREEND);
  } else if (filmsArray.length <= FILMCARD_COUNT_PER_STEP){
    for (let i = 0; i < filmsArray.length; i++) {
      const filmcard = new Filmcard(filmsArray[i]);
      filmcard.filmCardClickHandler(() => {
        if (document.querySelector('.film-details')) {
          document.querySelector('.film-details').remove();
        }
        const popap = new Popup(filmsArray[i], commentsArray);
        render(popap, document.querySelector('.main'), RenderPosition.BEFOREEND);
        popap.closeButtonClickHandler(()=>{
          document.querySelector('.film-details').remove();
          document.body.classList.remove('hide-overflow');
        });
        document.body.classList.add('hide-overflow');
      });
      render(filmcard, document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
    }
  } else {
    for (let i = 0; i < FILMCARD_COUNT_PER_STEP; i++) {
      const filmcard = new Filmcard(filmsArray[i]);
      filmcard.filmCardClickHandler(() => {
        if (document.querySelector('.film-details')) {
          document.querySelector('.film-details').remove();
        }
        const popap = new Popup(films[i], commentsArray);
        render(popap, document.querySelector('.main'), RenderPosition.BEFOREEND);
        popap.closeButtonClickHandler(()=>{
          document.querySelector('.film-details').remove();
          document.body.classList.remove('hide-overflow');
        });
        document.body.classList.add('hide-overflow');
      });
      render(filmcard, document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
    }
    render(showMoreButton, document.querySelector('.films-list'), RenderPosition.BEFOREEND);
  }
};

render(user, document.querySelector('.header'),);
render(sortMenu, document.querySelector('.main'), RenderPosition.AFTERBEGIN);
render(menuCopy, document.querySelector('.main'), RenderPosition.AFTERBEGIN);

menuCopy.menuClickHandler((evt) => {
  evt.preventDefault();
  document.querySelector('.films-list').innerHTML = '<div class="films-list__container"></div>';
  const goodFilms = [];
  Array.from(films).forEach((film)=>{
    goodFilms.push(film);
  });
  // console.log(goodFilms);
  renderer(goodFilms);
  showMoreButton.setClickHandler(() => {
    let RenderedFilmcards2 = 5;
    goodFilms.slice(RenderedFilmcards2, RenderedFilmcards + FILMCARD_COUNT_PER_STEP)
      .forEach((task) => {
        const filmcard = new Filmcard(task);
        render(filmcard, document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
        filmcard.filmCardClickHandler(() => {
          if (document.querySelector('.film-details')) {
            document.querySelector('.film-details').remove();
          }
          const popap = new Popup(task, commentsArray);
          render(popap, document.querySelector('.main'), RenderPosition.BEFOREEND);
          popap.closeButtonClickHandler(()=>{
            document.querySelector('.film-details').remove();
            document.body.classList.remove('hide-overflow');
          });
          document.body.classList.add('hide-overflow');
        });
      });

    RenderedFilmcards2 += FILMCARD_COUNT_PER_STEP;

    if (RenderedFilmcards2 >= goodFilms.length) {
      remove(showMoreButton);
    }
  });
}, '[href="#all"]');

menuCopy.menuClickHandler((evt) => {
  evt.preventDefault();
  document.querySelector('.films-list').innerHTML = '<div class="films-list__container"></div>';
  const goodFilms = [];
  Array.from(films).forEach((film)=>{
    if(film.user_details.watchlist){
      goodFilms.push(film);
    }
  });
  renderer(goodFilms);
  showMoreButton.setClickHandler(() => {
    if (goodFilms.length > FILMCARD_COUNT_PER_STEP) {
      let RenderedFilmcards3 = FILMCARD_COUNT_PER_STEP;
      goodFilms.slice(RenderedFilmcards3, RenderedFilmcards3 + FILMCARD_COUNT_PER_STEP)
        .forEach((task) => {
          const filmcard = new Filmcard(task);
          render(filmcard, document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
          filmcard.filmCardClickHandler(() => {
            if (document.querySelector('.film-details')) {
              document.querySelector('.film-details').remove();
            }
            const popap = new Popup(task, commentsArray);
            render(popap, document.querySelector('.main'), RenderPosition.BEFOREEND);
            popap.closeButtonClickHandler(()=>{
              document.querySelector('.film-details').remove();
              document.body.classList.remove('hide-overflow');
            });
            document.body.classList.add('hide-overflow');
          });
        });

      RenderedFilmcards3 += FILMCARD_COUNT_PER_STEP;

      if (RenderedFilmcards3 >= goodFilms.length) {
        remove(showMoreButton);
      }
    } else {
      let RenderedFilmcards3 = goodFilms.length;
      goodFilms.slice(RenderedFilmcards3, RenderedFilmcards3 + FILMCARD_COUNT_PER_STEP)
        .forEach((task) => {
          const filmcard = new Filmcard(task);
          render(filmcard, document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
          filmcard.filmCardClickHandler(() => {
            if (document.querySelector('.film-details')) {
              document.querySelector('.film-details').remove();
            }
            const popap = new Popup(task, commentsArray);
            render(popap, document.querySelector('.main'), RenderPosition.BEFOREEND);
            popap.closeButtonClickHandler(()=>{
              document.querySelector('.film-details').remove();
              document.body.classList.remove('hide-overflow');
            });
            document.body.classList.add('hide-overflow');
          });
        });

      RenderedFilmcards3 += FILMCARD_COUNT_PER_STEP;

      if (RenderedFilmcards3 >= goodFilms.length) {
        remove(showMoreButton);
      }
    }
  });
}, '[href="#watchlist"]');

menuCopy.menuClickHandler((evt) => {
  evt.preventDefault();
  document.querySelector('.films-list').innerHTML = '<div class="films-list__container"></div>';
  const goodFilms = [];
  Array.from(films).forEach((film)=>{
    if(film.user_details.already_watched){
      goodFilms.push(film);
    }
  });
  renderer(goodFilms);
  showMoreButton.setClickHandler(() => {
    if (goodFilms.length > FILMCARD_COUNT_PER_STEP) {
      let RenderedFilmcards3 = FILMCARD_COUNT_PER_STEP;
      goodFilms.slice(RenderedFilmcards3, RenderedFilmcards3 + FILMCARD_COUNT_PER_STEP)
        .forEach((task) => {
          const filmcard = new Filmcard(task);
          render(filmcard, document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
          filmcard.filmCardClickHandler(() => {
            if (document.querySelector('.film-details')) {
              document.querySelector('.film-details').remove();
            }
            const popap = new Popup(task, commentsArray);
            render(popap, document.querySelector('.main'), RenderPosition.BEFOREEND);
            popap.closeButtonClickHandler(()=>{
              document.querySelector('.film-details').remove();
              document.body.classList.remove('hide-overflow');
            });
            document.body.classList.add('hide-overflow');
          });
        });

      RenderedFilmcards3 += FILMCARD_COUNT_PER_STEP;

      if (RenderedFilmcards3 >= goodFilms.length) {
        remove(showMoreButton);
      }
    } else {
      let RenderedFilmcards3 = goodFilms.length;
      goodFilms.slice(RenderedFilmcards3, RenderedFilmcards3 + FILMCARD_COUNT_PER_STEP)
        .forEach((task) => {
          const filmcard = new Filmcard(task);
          render(filmcard, document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
          filmcard.filmCardClickHandler(() => {
            if (document.querySelector('.film-details')) {
              document.querySelector('.film-details').remove();
            }
            const popap = new Popup(task, commentsArray);
            render(popap, document.querySelector('.main'), RenderPosition.BEFOREEND);
            popap.closeButtonClickHandler(()=>{
              document.querySelector('.film-details').remove();
              document.body.classList.remove('hide-overflow');
            });
            document.body.classList.add('hide-overflow');
          });
        });

      RenderedFilmcards3 += FILMCARD_COUNT_PER_STEP;

      if (RenderedFilmcards3 >= goodFilms.length) {
        remove(showMoreButton);
      }
    }
  });
}, '[href="#history"]');

menuCopy.menuClickHandler((evt) => {
  evt.preventDefault();
  document.querySelector('.films-list').innerHTML = '<div class="films-list__container"></div>';
  const goodFilms = [];
  Array.from(films).forEach((film)=>{
    if(film.user_details.favorite){
      goodFilms.push(film);
    }
  });
  renderer(goodFilms);
  showMoreButton.setClickHandler(() => {
    if (goodFilms.length > FILMCARD_COUNT_PER_STEP) {
      let RenderedFilmcards3 = FILMCARD_COUNT_PER_STEP;
      goodFilms.slice(RenderedFilmcards3, RenderedFilmcards3 + FILMCARD_COUNT_PER_STEP)
        .forEach((task) => {
          const filmcard = new Filmcard(task);
          render(filmcard, document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
          filmcard.filmCardClickHandler(() => {
            if (document.querySelector('.film-details')) {
              document.querySelector('.film-details').remove();
            }
            const popap = new Popup(task, commentsArray);
            render(popap, document.querySelector('.main'), RenderPosition.BEFOREEND);
            popap.closeButtonClickHandler(()=>{
              document.querySelector('.film-details').remove();
              document.body.classList.remove('hide-overflow');
            });
            document.body.classList.add('hide-overflow');
          });
        });

      RenderedFilmcards3 += FILMCARD_COUNT_PER_STEP;

      if (RenderedFilmcards3 >= goodFilms.length) {
        remove(showMoreButton);
      }
    } else {
      let RenderedFilmcards3 = goodFilms.length;
      goodFilms.slice(RenderedFilmcards3, RenderedFilmcards3 + FILMCARD_COUNT_PER_STEP)
        .forEach((task) => {
          const filmcard = new Filmcard(task);
          render(filmcard, document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
          filmcard.filmCardClickHandler(() => {
            if (document.querySelector('.film-details')) {
              document.querySelector('.film-details').remove();
            }
            const popap = new Popup(task, commentsArray);
            render(popap, document.querySelector('.main'), RenderPosition.BEFOREEND);
            popap.closeButtonClickHandler(()=>{
              document.querySelector('.film-details').remove();
              document.body.classList.remove('hide-overflow');
            });
            document.body.classList.add('hide-overflow');
          });
        });

      RenderedFilmcards3 += FILMCARD_COUNT_PER_STEP;

      if (RenderedFilmcards3 >= goodFilms.length) {
        remove(showMoreButton);
      }
    }
  });
}, '[href="#favorites"]');

renderer(films.slice());
showMoreButton.setClickHandler(() => {
  films.slice(RenderedFilmcards, RenderedFilmcards + FILMCARD_COUNT_PER_STEP)
    .forEach((task) => {
      const filmcard = new Filmcard(task);
      render(filmcard, document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
      filmcard.filmCardClickHandler(() => {
        if (document.querySelector('.film-details')) {
          document.querySelector('.film-details').remove();
        }
        const popap = new Popup(task, commentsArray);
        render(popap, document.querySelector('.main'), RenderPosition.BEFOREEND);
        popap.closeButtonClickHandler(()=>{
          document.querySelector('.film-details').remove();
          document.body.classList.remove('hide-overflow');
        });
        document.body.classList.add('hide-overflow');
      });
    });

  RenderedFilmcards += FILMCARD_COUNT_PER_STEP;

  if (RenderedFilmcards >= films.length) {
    remove(showMoreButton);
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
      document.body.classList.remove('hide-overflow');
    }
  }
});
