class User {
  #name;
  #img;
  constructor(userInfo) {
    this.#name = userInfo.name;
    this.#img = userInfo.img;
  }

  get generate() {
    const element = document.createElement('section');
    element.classList.add('header__profile');
    element.classList.add('profile');
    element.innerHTML = `
      <p class="profile__rating">${  this.#name  }</p>
      <img class="profile__avatar" src="${  this.#img  }" alt="Avatar" width="35" height="35">
    `;
    return element;
  }
}

export { User };
