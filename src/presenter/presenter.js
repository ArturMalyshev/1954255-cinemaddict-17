import { render, RenderPosition, remove } from '../framework/render.js';

import User from '../view/componentUser.js';
import Menu from '../view/componentMenu.js';
import Filmcard from '../view/componentFilmcard.js';
import Popup from '../view/componentPopup.js';
import EmptyList from '../view/componentEmptyList.js';
import SortMenu from '../view/componentSortMenu.js';
import ShowMoreButton from '../view/componentShowMoreButton.js';

import { filmsArrayFromModel, commentsArray, userInfo } from '../model/model.js';

const user = new User(userInfo);
const menuCopy = new Menu(filmsArrayFromModel);
const sortMenu = new SortMenu(filmsArrayFromModel);
const showMoreButton = new ShowMoreButton();

render(user, document.querySelector('.header'),);
render(sortMenu, document.querySelector('.main'), RenderPosition.AFTERBEGIN);
render(menuCopy, document.querySelector('.main'), RenderPosition.AFTERBEGIN);

const FILMCARD_COUNT_PER_STEP = 5;
let RenderedFilmcards = 5;

document.querySelectorAll('.sort__button').forEach((button)=>{
  button.addEventListener('click', (evt)=>{
    evt.preventDefault();
    document.querySelector('.sort__button--active').classList.remove('sort__button--active');
    if(!button.classList.contains('sort__button--active')) {
      button.classList.add('sort__button--active');
    }
    const films = sortMenu.filmList;

    document.querySelector('.films-list__container').innerHTML='';

    const renderer = (filmsArray, emptyTemplate) => {
      // const filmsArray = sortMenu.filmList;
      if (filmsArray.length === 0) {
        document.querySelector('.films-list').appendChild(emptyTemplate);
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

    menuCopy.menuClickHandler((evt) => {
      evt.preventDefault();
      document.querySelector('.films-list').innerHTML = '<div class="films-list__container"></div>';
      const goodFilms = [];
      Array.from(films).forEach((film)=>{
        goodFilms.push(film);
      });
      const lastSelectedMenu = document.querySelector('.main-navigation__item--active');
      lastSelectedMenu.classList.remove('main-navigation__item--active');
      document.querySelector('[href="#all"]').classList.add('main-navigation__item--active');
      renderer(goodFilms, new EmptyList().EmptyAllMovies);
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
      const lastSelectedMenu = document.querySelector('.main-navigation__item--active');
      lastSelectedMenu.classList.remove('main-navigation__item--active');
      document.querySelector('[href="#watchlist"]').classList.add('main-navigation__item--active');
      const content3 = new EmptyList().EmptyWatchlist;
      renderer(goodFilms, content3);
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
      const content4 = new EmptyList().EmptyHistory;
      renderer(goodFilms, content4);
      const lastSelectedMenu = document.querySelector('.main-navigation__item--active');
      lastSelectedMenu.classList.remove('main-navigation__item--active');
      document.querySelector('[href="#history"]').classList.add('main-navigation__item--active');
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
      renderer(goodFilms, new EmptyList().EmptyFavorites);
      const lastSelectedMenu = document.querySelector('.main-navigation__item--active');
      lastSelectedMenu.classList.remove('main-navigation__item--active');
      document.querySelector('[href="#favorites"]').classList.add('main-navigation__item--active');
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

    const content = new EmptyList().EmptyAllMovies;
    renderer(films.slice(), content);
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
  });
});

const films = sortMenu.filmList;

const renderer = (filmsArray, emptyTemplate) => {
  // const filmsArray = sortMenu.filmList;
  if (filmsArray.length === 0) {
    document.querySelector('.films-list').appendChild(emptyTemplate);
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

menuCopy.menuClickHandler((evt) => {
  evt.preventDefault();
  document.querySelector('.films-list').innerHTML = '<div class="films-list__container"></div>';
  const goodFilms = [];
  Array.from(films).forEach((film)=>{
    goodFilms.push(film);
  });
  const lastSelectedMenu = document.querySelector('.main-navigation__item--active');
  lastSelectedMenu.classList.remove('main-navigation__item--active');
  document.querySelector('[href="#all"]').classList.add('main-navigation__item--active');
  renderer(goodFilms, new EmptyList().EmptyAllMovies);
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
  const lastSelectedMenu = document.querySelector('.main-navigation__item--active');
  lastSelectedMenu.classList.remove('main-navigation__item--active');
  document.querySelector('[href="#watchlist"]').classList.add('main-navigation__item--active');
  const content3 = new EmptyList().EmptyWatchlist;
  renderer(goodFilms, content3);
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
  const content4 = new EmptyList().EmptyHistory;
  renderer(goodFilms, content4);
  const lastSelectedMenu = document.querySelector('.main-navigation__item--active');
  lastSelectedMenu.classList.remove('main-navigation__item--active');
  document.querySelector('[href="#history"]').classList.add('main-navigation__item--active');
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
  renderer(goodFilms, new EmptyList().EmptyFavorites);
  const lastSelectedMenu = document.querySelector('.main-navigation__item--active');
  lastSelectedMenu.classList.remove('main-navigation__item--active');
  document.querySelector('[href="#favorites"]').classList.add('main-navigation__item--active');
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

const content = new EmptyList().EmptyAllMovies;
renderer(films.slice(), content);
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
