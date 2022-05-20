function getTimeFromMins(mins) {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  return `${  hours  }h ${  minutes  }m`;
}

class Popup {
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
  constructor(filmInfoObject, commentsArray) {
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
    this.#watched = filmInfoObject.user_details.already_watched;
    this.#favorite = filmInfoObject.user_details.favorite;
    this.#watchlist = filmInfoObject.user_details.watchlist;
    this.#commentsArray = commentsArray;
  }

  get generate() {
    const element = document.createElement('section');
    element.classList.add('film-details');
    const actors = this.#actors.join(', ');
    const authors = this.#authors.join(', ');
    const filmRelease = new Date(this.#date);
    const popupDateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const commentDateOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    element.innerHTML = `
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
                  <td class="film-details__cell">${  new Intl.DateTimeFormat('en-GB', popupDateOptions).format(filmRelease) }</td>
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
            <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
            <button type="button" class="film-details__control-button film-details__control-button--watched" id="watched" name="watched">Already watched</button>
            <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
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

    const helperList = element.querySelectorAll('.film-details__cell');
    for (let i = 0; i < this.#genre.length; i++) {
      const genreElement = document.createElement('span');
      genreElement.classList.add('film-details__genre');
      genreElement.textContent = this.#genre[i];
      helperList[helperList.length - 1].appendChild(genreElement);
    }

    for (const commentId of this.#comments) {
      for (const commentData of this.#commentsArray) {
        if (commentData.id === commentId) {
          const newComment = document.createElement('li');
          newComment.classList.add('film-details__comment');
          const commentDate = new Date(commentData.date);
          newComment.innerHTML = `
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${ commentData.emotion }.png" width="55" height="55" alt="emoji-${ commentData.emotion }">
            </span>
            <div>
              <p class="film-details__comment-text">${ commentData.comment }</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${ commentData.author }</span>
                <span class="film-details__comment-day">${ new Intl.DateTimeFormat('en-GB', commentDateOptions).format(commentDate) }</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          `;
          element.querySelector('.film-details__comments-list').appendChild(newComment);
        }
      }
    }
    if (this.#watchlist) {
      element.querySelector('#watchlist').classList.add('film-details__control-button--active');
    }
    if (this.#favorite) {
      element.querySelector('#favorite').classList.add('film-details__control-button--active');
    }
    if (this.#watched) {
      element.querySelector('#watched').classList.add('film-details__control-button--active');
    }
    element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      element.remove();
    });
    return element;
  }
}

export { Popup };
