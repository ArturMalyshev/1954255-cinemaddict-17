import MovieModel from '../model/movieModel';
import CommentsModel from '../model/commentsModel';
import AbstractView from '../framework/view/abstract-view';

export default class PresenterMovie extends AbstractView{
  #renderPosition;
  #filmData;
  #renderFunction;
  #filmcardView;
  #popupView;
  #comments;
  #commentsArray;
  #movieModel;
  #filmcard;
  #popup;

  constructor(oneFilmData, renderFunction, renderPosition, filmcardView, popupView) {
    super();
    this.#filmData = oneFilmData;
    this.#renderFunction = renderFunction;
    this.#filmcardView = filmcardView;
    this.#popupView = popupView;
    this.#comments = new CommentsModel(oneFilmData.id);
    this.#movieModel = new MovieModel();
    this.#comments.init();
    this.#comments.addObserver(this.#handleModelEvent);
    this.#movieModel.addObserver(this.#handleModelEvent);
    this.#commentsArray = [];
    this.#renderPosition = renderPosition;
  }

  #handleModelEvent = (actionType, data) => {
    if (actionType === 'comments') {
      this.#commentsArray = data;
      this.#popup = new this.#popupView(this.#filmData, this.#commentsArray);
    } else if (actionType === 'updateFilm') {
      const object = this.#movieModel.adaptFromServer(data);
      object.commentCount = this.#filmData.commentCount;
      this.#filmcard.updateFilmcard(object);
    } else if (actionType === 'commentDelete') {
      this.#popup.deletingComment(data.commentID);
      data.promise.then(()=>{
        this.#popup.successfulDeleteComment(data.commentID);
        const filmcardData = {
          userDetails: {
            alreadyWatched : this.#filmData.userDetails.alreadyWatched,
            favorite : this.#filmData.userDetails.favorite,
            watchlist : this.#filmData.userDetails.watchlist,
          },
          commentCount : document.querySelector('.film-details__comments-count').textContent
        };
        this.#filmcard.updateFilmcard(filmcardData);
      },
      ()=>{
        this.#popup.normalizeDeleteButton(data.commentID);
      });
    } else if (actionType === 'commentCreate') {
      console.log(data);
    }
  };

  #createPopup = (filmcard) => {
    this.#renderFunction(this.#popup, document.querySelector('.main'), this.#renderPosition.BEFOREEND);

    this.#popup.closeButtonClickHandler(() => {
      document.querySelector('.film-details').remove();
      document.body.classList.remove('hide-overflow');
    });

    this.#popup.deleteCommentHandler(()=>{
      document.querySelectorAll('.film-details__comment-delete').forEach((button)=>{
        button.addEventListener('click', (evt)=>{
          evt.preventDefault();
          this.#comments.deleteComment(button.getAttribute('id'));
        });
      });
    });

    this.#popup.popupEmotionClickHandler();

    this.#popup.popupAddSaveCommentHandler(()=>{
      const pressed = new Set();
      document.addEventListener('keyup', (evt)=>{
        if (evt.key === 'Meta' || evt.key === 'Enter' || evt.key === 'Ctrl') {
          pressed.clear();
        }
      });
      document.addEventListener('keydown', (evt)=>{
        pressed.add(evt.key);
        const emojiField = document.querySelector('.film-details__add-emoji-label');
        const commentField = document.querySelector('.film-details__comment-input');
        if ((pressed.has('Meta') && (pressed.has('Enter'))) || (pressed.has('Ctrl') && (pressed.has('Enter')))) {
          if (emojiField.innerHTML !== ''){
            if (commentField.value !== '') {
              const emojiName = emojiField.firstChild.getAttribute('alt').slice(6);
              new CommentsModel().createComment(this.#filmData.id, commentField.value, emojiName);
              this.#popup.updatePopup(filmcard);
            }
          }
        } else {
          pressed.clear();
          if (evt.key === 'Meta') {
            pressed.add('Meta');
          } else if (evt.key === 'Enter') {
            pressed.add('Enter');
          } else if (evt.key === 'Ctrl') {
            pressed.add('Enter');
          }
          return;
        }
        pressed.clear();
      });
    });

    this.#popup.popupWatchlistClickHandler((evt)=>{
      evt.preventDefault();
      const watchListButton = this.#popup.element.querySelector('.film-details__control-button--watchlist');
      this.#filmCardWatchlistClickHandlerCallback();
      if (watchListButton.classList.contains('film-details__control-button--active')) {
        watchListButton.classList.remove('film-details__control-button--active');
        this.#filmData.userDetails.watchlist = false;
      } else {
        watchListButton.classList.add('film-details__control-button--active');
        this.#filmData.userDetails.watchlist = true;
      }
      this.#movieModel.updateFilmById(this.#filmData);
    }); //Popup watchlist click handler

    this.#popup.popupFavoriteClickHandler((evt)=>{
      evt.preventDefault();
      const favoriteButton = this.#popup.element.querySelector('.film-details__control-button--favorite');
      this.#filmCardFavoriteClickHandlerCallback();
      if (favoriteButton.classList.contains('film-details__control-button--active')) {
        favoriteButton.classList.remove('film-details__control-button--active');
        this.#filmData.userDetails.favorite = false;
      } else {
        favoriteButton.classList.add('film-details__control-button--active');
        this.#filmData.userDetails.favorite = true;
      }
      this.#movieModel.updateFilmById(this.#filmData);
    }); //Popup favorite click handler

    this.#popup.popupWatchedClickHandler((evt)=>{
      evt.preventDefault();
      const watchedButton = this.#popup.element.querySelector('.film-details__control-button--watched');
      this.#filmCardWatchedClickHandlerCallback();
      if (watchedButton.classList.contains('film-details__control-button--active')) {
        watchedButton.classList.remove('film-details__control-button--active');
        this.#filmData.userDetails.alreadyWatched = false;
      } else {
        watchedButton.classList.add('film-details__control-button--active');
        this.#filmData.userDetails.alreadyWatched = true;
      }
      this.#movieModel.updateFilmById(this.#filmData);
    }); //Popup watched click handler
  };

  #createFilmcard = (data) => {
    this.#filmcard = new this.#filmcardView(data);
    this.#filmcard.filmCardClickHandler(()=>{
      if (document.querySelector('.film-details')) {
        document.querySelector('.film-details').remove();
      }
      document.body.classList.add('hide-overflow');
      this.#createPopup(this.#filmcard);
    });

    this.#filmcard.filmCardFavoriteClickHandler((evt)=>{
      evt.preventDefault();
      this.#filmCardFavoriteClickHandlerCallback();
    }); //favorite button click Handler

    this.#filmcard.filmCardWatchedClickHandler((evt)=>{
      evt.preventDefault();
      this.#filmCardWatchedClickHandlerCallback();
    }); //watched button click Handler

    this.#filmcard.filmCardWatchlistClickHandler((evt)=>{
      evt.preventDefault();
      this.#filmCardWatchlistClickHandlerCallback();
    }); //watchList button click Handler

    this.#renderFunction(this.#filmcard, document.querySelector('.films-list__container'), this.#renderPosition.BEFOREEND);
  };

  #filmCardFavoriteClickHandlerCallback = () => {
    if (this.#filmData.userDetails.favorite === true) {
      this.#filmData.userDetails.favorite = false;
    } else {
      this.#filmData.userDetails.favorite = true;
    }
    this.#movieModel.updateFilmById(this.#filmData);
  };

  #filmCardWatchedClickHandlerCallback = () => {
    if (this.#filmData.userDetails.alreadyWatched === true) {
      this.#filmData.userDetails.alreadyWatched = false;
    } else {
      this.#filmData.userDetails.alreadyWatched = true;
    }
    this.#movieModel.updateFilmById(this.#filmData);
  };

  #filmCardWatchlistClickHandlerCallback = () => {
    if (this.#filmData.userDetails.watchlist === true) {
      this.#filmData.userDetails.watchlist = false;
    } else {
      this.#filmData.userDetails.watchlist = true;
    }
    this.#movieModel.updateFilmById(this.#filmData);
  };

  filmcard = (() => {
    this.#createFilmcard(this.#filmData);
  });

  get template() {
    return '';
  }
}
