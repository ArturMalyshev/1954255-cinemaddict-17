import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

function getTimeFromMins(mins) {
  if (mins > 59) {
    return dayjs().minute(mins+60).format('H[h] m[m]');
  } else {
    return dayjs().minute(mins).format('m[m]');
  }
}

const EMOJI_SIZE_IN_PX = 55;

export default class Popup extends AbstractStatefulView{
  #name;
  #originalName;
  #img;
  #rating;
  #date;
  #duration;
  #genre;
  #description;
  #director;
  #authors;
  #actors;
  #country;
  #ageLimit;
  #comments;
  #watched;
  #favorite;
  #watchlist;
  #commentsArray;
  #watchedClass;
  #watchlistClass;
  #favoriteClass;
  #emoji;
  #filmId;
  #closeButtonHandler;
  #popupWatchlistHandler;
  #popupFavoriteHandler;
  #popupWatchedHandler;
  #addCommentHandler;
  constructor(filmInfoObject, commentsArray) {
    super();
    this._restoreHandlers = () => {
      const emotionPlace = document.querySelector('.film-details__add-emoji-label');
      const image = document.createElement('img');
      let emoji = null;
      switch (this.#emoji.emoji) {
        case 'emoji-smile':
          emoji = 'smile';
          break;
        case 'emoji-angry':
          emoji = 'angry';
          break;
        case 'emoji-puke':
          emoji = 'puke';
          break;
        case 'emoji-sleeping':
          emoji = 'sleeping';
          break;
      }
      image.src = `images/emoji/${ emoji }.png`;
      image.width = EMOJI_SIZE_IN_PX;
      image.alt = this.#emoji.emoji;
      emotionPlace.appendChild(image);

      document.querySelector(`#${ this.#emoji.emoji }`).setAttribute('checked', 'checked');

      this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeButtonHandler);

      this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#popupWatchlistHandler);

      this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#popupFavoriteHandler);

      this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#popupWatchedHandler);

      this.element.querySelectorAll('.film-details__emoji-item').forEach((smile)=>{
        smile.addEventListener('click', this.#EmotionToggleHandler);
      });

      this.element.querySelectorAll('.film-details__comment-delete').forEach((button)=>{
        button.addEventListener('click', this.#deleteCommentHandler);
      });

      this.#addCommentHandler();

      this.element.scrollBy(0, this.element.scrollHeight);
    };
    this.#filmId = filmInfoObject.id;
    this.#name = filmInfoObject.film_info.title;
    this.#originalName = filmInfoObject.film_info.alternative_title;
    this.#img = filmInfoObject.film_info.poster;
    this.#rating = filmInfoObject.film_info.total_rating;
    this.#date = filmInfoObject.film_info.release.date;
    this.#duration = getTimeFromMins(filmInfoObject.film_info.runtime);
    this.#genre = filmInfoObject.film_info.genre;
    this.#description = filmInfoObject.film_info.description;
    this.#director = filmInfoObject.film_info.director;
    this.#authors = filmInfoObject.film_info.writers;
    this.#actors = filmInfoObject.film_info.actors;
    this.#country = filmInfoObject.film_info.release.release_country;
    this.#ageLimit = filmInfoObject.film_info.age_rating;
    this.#comments = filmInfoObject.comments;
    this.#watched = filmInfoObject.user_details.alreadyWatched;
    this.#favorite = filmInfoObject.user_details.favorite;
    this.#watchlist = filmInfoObject.user_details.watchlist;
    this.#commentsArray = commentsArray;

    if (this.#watched) {
      this.#watchedClass = 'film-details__control-button--active';
    } else {
      this.#watchedClass = '';
    }

    if (this.#watchlist) {
      this.#watchlistClass = 'film-details__control-button--active';
    } else {
      this.#watchlistClass = '';
    }

    if (this.#favorite) {
      this.#favoriteClass = 'film-details__control-button--active';
    } else {
      this.#favoriteClass = '';
    }
  }

  get template() {
    const actors = this.#actors.join(', ');
    const authors = this.#authors.join(', ');
    const filmRelease = new Date(this.#date);
    const temp = `
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${  this.#img  }" alt="">
              <p class="film-details__age">${  this.#ageLimit  } +</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${  this.#name  }</h3>
                  <p class="film-details__title-original">Original: ${  this.#originalName  }</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${  this.#rating  }</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${  this.#director  }</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${  authors  }</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${  actors  }</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${  dayjs(filmRelease).format('D MMMM YYYY')  }</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${  this.#duration  }</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${  this.#country  }</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">

                  </td>
                </tr>
              </table>
              <p class="film-details__film-description">
                ${  this.#description  }
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <button type="button" class="film-details__control-button film-details__control-button--watchlist ${ this.#watchlistClass }" id="watchlist" name="watchlist">Add to watchlist</button>
            <button type="button" class="film-details__control-button film-details__control-button--watched ${ this.#watchedClass }" id="watched" name="watched">Already watched</button>
            <button type="button" class="film-details__control-button film-details__control-button--favorite ${ this.#favoriteClass }" id="favorite" name="favorite">Add to favorites</button>
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${ this.#comments.length }</span></h3>

            <ul class="film-details__comments-list">
            </ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>
`;
    const shell = document.createElement('div');
    shell.innerHTML = temp;

    const helperList = shell.querySelectorAll('.film-details__cell');
    for(let i = 0; i < this.#genre.length; i++) {
      const genreElement = document.createElement('span');
      genreElement.classList.add('film-details__genre');
      genreElement.textContent = this.#genre[i];
      helperList[helperList.length - 1].appendChild(genreElement);
    }

    this.#commentsArray.forEach((comment)=>{
      if(comment.id in this.#comments){
        const data = document.createElement('li');
        data.classList.add('film-details__comment');
        data.innerHTML = `<span class="film-details__comment-emoji">
                          <img src="./images/emoji/${ comment.emotion }.png" width="55" height="55" alt="emoji-smile">
                        </span>
                        <div>
                          <p class="film-details__comment-text">${ comment.comment }</p>
                          <p class="film-details__comment-info">
                            <span class="film-details__comment-author">${ comment.author }</span>
                            <span class="film-details__comment-day">${ dayjs(comment.date).fromNow() }</span>
                            <button class="film-details__comment-delete">Delete</button>
                          </p>
                        </div>`;
        shell.querySelector('.film-details__comments-list').appendChild(data);
      }
    });
    return shell.innerHTML;
  }

  deleteComment = () => {
    this.element.querySelectorAll('.film-details__comment-delete').forEach((button)=>{
      button.addEventListener('click', this.#deleteCommentHandler);
    });
  };

  #deleteCommentHandler = (evt) => {
    evt.preventDefault();
    evt.path[3].remove();
    let value = document.querySelector('.film-details__comments-count').textContent;
    value -= 1;
    document.querySelector('.film-details__comments-count').textContent = value;
  };

  closeButtonClickHandler = (callback) => {
    this.#closeButtonHandler = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', callback);
  };

  popupWatchlistClickHandler = (callback) => {
    this.#popupWatchlistHandler = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', callback);
  };

  popupFavoriteClickHandler = (callback) => {
    this.#popupFavoriteHandler = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', callback);
  };

  popupWatchedClickHandler = (callback) => {
    this.#popupWatchedHandler = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', callback);
  };

  popupEmotionClickHandler = () => {
    this.element.querySelectorAll('.film-details__emoji-item').forEach((smile)=>{
      smile.addEventListener('click', this.#EmotionToggleHandler);
    });
  };

  #EmotionToggleHandler = (evt) => {
    evt.srcElement.setAttribute('checked', 'true');
    this.#emoji = {
      emoji: evt.srcElement.getAttribute('id')
    };
    this.updateElement(this.#emoji);
  };

  popupAddSaveCommentHandler = (callback) => {
    this.#addCommentHandler = callback;
    callback();
  };

  updatePopup = (data) => {
    this.updateElement(data);
  };
}


export { Popup };
