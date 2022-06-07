import AbstractView from '../framework/view/abstract-view';

export default class PresenterMovie extends AbstractView{
  //умеет выдавать свою карточку
  //умеет по клику выдавть попап
  #renderPosition;
  #filmData;
  #renderFunction;
  #filmcardView;
  #popupView;
  #commentsArray;

  constructor(oneFilmData, comments, renderFunction, renderPosition, filmcardView, popupView) {
    super();
    this.#filmData = oneFilmData;
    this.#renderFunction = renderFunction;
    this.#filmcardView = filmcardView;
    this.#popupView = popupView;
    this.#commentsArray = comments;
    this.#renderPosition = renderPosition;
  }

  #createPopup = (filmcard) => {
    const popup = new this.#popupView(this.#filmData, this.#commentsArray);
    this.#renderFunction(popup, document.querySelector('.main'), this.#renderPosition.BEFOREEND);

    popup.closeButtonClickHandler(() => {
      document.querySelector('.film-details').remove();
      document.body.classList.remove('hide-overflow');
    });

    popup.popupEmotionClickHandler();

    popup.popupWatchlistClickHandler((evt)=>{
      evt.preventDefault();
      const watchListButton = popup.element.querySelector('.film-details__control-button--watchlist');
      filmcard.filmCardWatchListButtonHandler();
      if (watchListButton.classList.contains('film-details__control-button--active')) {
        watchListButton.classList.remove('film-details__control-button--active');
        this.#filmData.user_details.watchlist = false;
      } else {
        watchListButton.classList.add('film-details__control-button--active');
        this.#filmData.user_details.watchlist = true;
      }
    }); //Popup watchlist click handler

    popup.popupFavoriteClickHandler((evt)=>{
      evt.preventDefault();
      const favoriteButton = popup.element.querySelector('.film-details__control-button--favorite');
      filmcard.filmCardFavoriteButtonHandler();
      if (favoriteButton.classList.contains('film-details__control-button--active')) {
        favoriteButton.classList.remove('film-details__control-button--active');
        this.#filmData.user_details.favorite = false;
      } else {
        favoriteButton.classList.add('film-details__control-button--active');
        this.#filmData.user_details.favorite = true;
      }
    }); //Popup favorite click handler

    popup.popupWatchedClickHandler((evt)=>{
      evt.preventDefault();
      const watchedButton = popup.element.querySelector('.film-details__control-button--watched');
      filmcard.filmCardWatchedButtonHandler();
      if (watchedButton.classList.contains('film-details__control-button--active')) {
        watchedButton.classList.remove('film-details__control-button--active');
        this.#filmData.user_details.alreadyWatched = false;
      } else {
        watchedButton.classList.add('film-details__control-button--active');
        this.#filmData.user_details.alreadyWatched = true;
      }
    }); //Popup watched click handler
  };

  #createFilmcard = (data) => {
    const filmcard = new this.#filmcardView(data);
    filmcard.filmCardClickHandler(()=>{
      if (document.querySelector('.film-details')) {
        document.querySelector('.film-details').remove();
      }
      document.body.classList.add('hide-overflow');
      this.#createPopup(filmcard);
    });

    filmcard.filmCardFavoriteClickHandler((evt)=>{
      evt.preventDefault();
      filmcard.editFavoriteConditions();
      const favoriteButton = filmcard.element.querySelector('.film-card__controls-item--favorite');
      if (favoriteButton.classList.contains('film-card__controls-item--active')) {
        favoriteButton.classList.remove('film-card__controls-item--active');
        this.#filmData.user_details.favorite = false;
      } else {
        favoriteButton.classList.add('film-card__controls-item--active');
        this.#filmData.user_details.favorite = true;
      }
    }); //favorite button click Handler

    filmcard.filmCardWatchedClickHandler((evt)=>{
      evt.preventDefault();
      const watchedButton = filmcard.element.querySelector('.film-card__controls-item--mark-as-watched');
      if (watchedButton.classList.contains('film-card__controls-item--active')) {
        watchedButton.classList.remove('film-card__controls-item--active');
        this.#filmData.user_details.alreadyWatched = false;
      } else {
        watchedButton.classList.add('film-card__controls-item--active');
        this.#filmData.user_details.alreadyWatched = true;
      }
    }); //watched button click Handler

    filmcard.filmCardWatchlistClickHandler((evt)=>{
      evt.preventDefault();
      const watchListButton = filmcard.element.querySelector('.film-card__controls-item--add-to-watchlist');
      if (watchListButton.classList.contains('film-card__controls-item--active')) {
        watchListButton.classList.remove('film-card__controls-item--active');
        this.#filmData.user_details.watchlist = false;
      } else {
        watchListButton.classList.add('film-card__controls-item--active');
        this.#filmData.user_details.watchlist = true;
      }
    }); //watchList button click Handler

    this.#renderFunction(filmcard, document.querySelector('.films-list__container'), this.#renderPosition.BEFOREEND);
  };

  filmcard = (() => {
    this.#createFilmcard(this.#filmData);
  });

  get template() {
    return '';
  }
}
