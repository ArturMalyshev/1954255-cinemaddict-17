export default class UserModel {
  #name;
  #img;
  constructor() {
    this.#name =  'Имя Имя';
    this.#img = 'images/bitmap@2x.png';
  }

  get template () {
    return {
      name: this.#name,
      img: this.#img,
      watchlistNum: 12,
      historyNum: 32,
      favoritesNum: 12
    };
  }
}
