export var accesses = {
  authorized: "authorized",
  nonAuthorized: "non-authorized",
};

export var pages = {
  upload: {
    name: "Загрузка изображений",
    value: `${process.env.BASE_URL}/upload`,
    access: accesses.authorized,
  },
  detections: {
    name: "Распознанное",
    value: `${process.env.BASE_URL}/detections`,
    access: accesses.authorized,
  },
  login: {
    name: "Войти",
    value: `${process.env.BASE_URL}/login`,
    access: accesses.nonAuthorized,
  },
  register: {
    name: "Зарегистрироваться",
    value: `${process.env.BASE_URL}/register`,
    access: accesses.nonAuthorized,
  },
  logout: {
    name: "Выйти",
    value: `${process.env.BASE_URL}/logout`,
    access: accesses.authorized,
  },
};
