const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = async (route, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, { method, body });
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

const getPhotos = async () => await load(Route.GET_DATA);

const createPhoto = async (body) => await load(Route.SEND_DATA, Method.POST, body);

export { getPhotos, createPhoto };
