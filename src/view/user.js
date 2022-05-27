import AbstractView from '../framework/view/abstract-view';

export default class User extends AbstractView{
  #name;
  #img;
  constructor(userInfo) {
    super();
    this.#name = userInfo.name;
    this.#img = userInfo.img;
  }

  get template() {
    return`
      <section class="header__profile profile">
        <p class="profile__rating">${  this.#name  }</p>
        <img class="profile__avatar" src="${  this.#img  }" alt="Avatar" width="35" height="35">
      </section>
      `;
  }
}

