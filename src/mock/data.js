const commentsData = {
  'id': ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  'author': [
    'Ilya O`Reilly',
    'Artem Kot',
    'Tomas Shelby',
    'Genry Ford',
    'Sarah Conor',
    'Ivan King',
    'Katya Mish',
  ],
  'comment': [
    'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    'CAR CAR CAR ....... !!! ',
    'XD Lorem Ipsum ahah ;-)',
    'eros vel aliquam faucibus, purus ex euismod diam, eu ',
    'Lorem Ipsum who? Что?',
    'Pen Pineapple apple pen',
    'XD.....',
  ],
  'date': [
    '2011-02-11T06:11:32.554Z',
    '2021-12-22T10:12:32.554Z',
    '2019-05-11T16:12:32.554Z',
    '2002-09-15T16:12:32.554Z',
    '2000-05-12T21:02:32.554Z',
  ],
  'emotion': [
    'smile',
    'puke',
    'angry',
    'sleeping'
  ]
};

const filmData = {
  id: [1, 3, 12, 31, 2, 21, 13],
  comments: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  filmInfo: {
    title: [
      'A Little Pony Without The Carpet',
      'Sagebrush Trail',
      'The Man with the Golden Arm',
      'Santa Claus Conquers the Martians',
      'The Dance of Life',
      'Popeye the Sailor Meets Sindbad the Sailor'
    ],
    alternativeTitle: [
      'A Little Pony Without The Carpet',
      'Sagebrush Trail',
      'The Man with the Golden Arm',
      'Santa Claus Conquers the Martians',
      'The Dance of Life',
      'Popeye the Sailor Meets Sindbad the Sailor'
    ],
    poster: [
      'images/posters/sagebrush-trail.jpg',
      'images/posters/made-for-each-other.png',
      'images/posters/popeye-meets-sinbad.png',
      'images/posters/the-dance-of-life.jpg',
      'images/posters/the-great-flamarion.jpg',
      'images/posters/the-man-with-the-golden-arm.jpg',
      'images/posters/santa-claus-conquers-the-martians.jpg'
    ],
    ageRating: ['0', '6', '12', '16', '18'],
    director: [
      'Tom Ford',
      'Optimus Prime',
      'Yuri Dud',
      'Fufel Shmertz',
      'Oleg Tinkoff'
    ],
    writers: [
      'Takeshi Kitano',
      'Lorem Ipsum',
      'Dolor Sit',
      'Amet Consectetur',
      'Adipiscing Elit',
    ],
    actors: [
      'Morgan Freeman',
      'Tom Holland',
      'Robert De Niro',
      'Johnny Depp',
      'Montgomery Clift',
      'Al Pacino',
      'Rita Hayworth',
      'Kirk Douglas',
      'Harrison Ford',
      'Gene Kelly'
    ],
    releaseDate: [
      '2019-05-11T00:00:00.000Z',
      '2012-12-13T00:00:00.000Z',
      '2001-02-14T00:00:00.000Z',
      '2021-03-13T00:00:00.000Z',
      '2022-05-11T00:00:00.000Z',
      '2022-05-10T00:00:00.000Z',
      '2022-05-09T00:00:00.000Z',
    ],
    releaseCountry: [
      'Finland',
      'USA',
      'Russia',
      'Spain',
      'Ukrain',
      'Turkey',
      'China',
      'Japan'
    ],
    genre: [
      'Comedy',
      'Drama',
      'Action',
      'Fantasy',
      'Melodrama',
      'Film-Noir',
      'Mystery'
    ],
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum laborum nemo non repellat, repudiandae sit suscipit velit? Cumque dolores ducimus quae quidem reiciendis velit. Alias at doloremque eius minima quasi!',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aperiam dignissimos eum facilis fugiat iste magnam maiores, minima mollitia nesciunt officia possimus quaerat repellendus rerum vero. Deserunt quisquam ratione similique?',
      'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой'
    ],
    userDetailsWatchlist: [false, true],
    userDetailsAlreadiWatched: [true, false],
    userDetailsWatchingDate:[
      '2019-05-11T16:12:32.554Z',
      '2022-05-11T16:12:32.554Z',
      '2022-05-10T16:12:32.554Z',
      '2022-05-09T16:12:32.554Z',
      '2022-05-03T16:12:32.554Z',
      '2022-05-01T16:12:32.554Z'
    ],
    userDetailsFavorite: [true, false]
  }
};

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

const getFilmInformation = (filmMockData) => {
  const comments = [];
  for (let i = 0; i < getRandom(0, 6); i++) {
    comments.push(i);
  }
  const filmInfo = {
    'id': '0',
    'comments': comments,
    'film_info': {
      'title': filmMockData.filmInfo.title[getRandom(0,filmMockData.filmInfo.title.length)],
      'alternative_title': filmMockData.filmInfo.alternativeTitle[getRandom(0,filmMockData.filmInfo.alternativeTitle.length)],
      'total_rating': getRandom(1, 10),
      'poster': filmMockData.filmInfo.poster[getRandom(0, filmMockData.filmInfo.poster.length)],
      'age_rating': filmMockData.filmInfo.ageRating[getRandom(0, filmMockData.filmInfo.ageRating.length)],
      'director': filmMockData.filmInfo.director[getRandom(0, filmMockData.filmInfo.director.length)],
      'writers': [
        filmMockData.filmInfo.writers[getRandom(0, filmMockData.filmInfo.writers.length)]
      ],
      'actors': [
        filmMockData.filmInfo.actors[getRandom(0, filmMockData.filmInfo.actors.length)]
      ],
      'release': {
        'date': filmMockData.filmInfo.releaseDate[getRandom(0, filmMockData.filmInfo.releaseDate.length)],
        'release_country': filmMockData.filmInfo.releaseCountry[getRandom(0, filmMockData.filmInfo.releaseCountry.length)],
      },
      'runtime': getRandom(54, 182),
      'genre': [
        filmMockData.filmInfo.genre[getRandom(0, filmMockData.filmInfo.genre.length)],
        filmMockData.filmInfo.genre[getRandom(0, filmMockData.filmInfo.genre.length)],
      ],
      'description': filmMockData.filmInfo.description[getRandom(0, filmMockData.filmInfo.description.length)]
    },
    'user_details': {
      'watchlist': filmMockData.filmInfo.userDetailsWatchlist[getRandom(0, filmMockData.filmInfo.userDetailsWatchlist.length)],
      'already_watched': filmMockData.filmInfo.userDetailsAlreadiWatched[getRandom(0, filmMockData.filmInfo.userDetailsAlreadiWatched.length)],
      'watching_date': filmMockData.filmInfo.userDetailsWatchingDate[getRandom(0, filmMockData.filmInfo.userDetailsWatchingDate.length)],
      'favorite': filmMockData.filmInfo.userDetailsFavorite[getRandom(0, filmMockData.filmInfo.userDetailsFavorite.length)]
    }
  };
  return filmInfo;
};

const getCommentInformation = (commentMockData, commentId) => {
  const newComment = {
    'id': commentId,
    'author': commentMockData.author[getRandom(0, commentMockData.author.length)],
    'comment': commentMockData.comment[getRandom(0, commentMockData.comment.length)],
    'date': commentMockData.date[getRandom(0, commentMockData.date.length)],
    'emotion': commentMockData.emotion[getRandom(0, commentMockData.emotion.length)]
  };
  return newComment;
};

export { getFilmInformation, getCommentInformation, commentsData, filmData };
