import axios from "axios";
import md5 from "md5";

const API_BASE_URL = "http://gateway.marvel.com/v1/public";
const PUBLIC_API_KEY = `5a843e5875bac85ae7e7c6c896c29cfb`;
const PRIVATE_API_KEY = `006ad8d16694f22e4c3ca94365129fe282a5bc9d`;
const time = Number(new Date());

const hash = md5(time + PRIVATE_API_KEY + PUBLIC_API_KEY);

const instance = axios.create({
  baseURL: API_BASE_URL,
});

const getCharacters = async (limit, offset, nameStartsWith) => {
  try {
    const params = {
      ts: time,
      apikey: PUBLIC_API_KEY,
      hash: hash,
      limit,
      offset,
    };

    // Se nameStartsWith não estiver vazio, incluir na chamada à API
    if (nameStartsWith) {
      params.nameStartsWith = nameStartsWith;
    }

    const response = await instance.get("/characters", {
      params: params,
    });

    return response.data.data;
  } catch (error) {
    throw new Error("Erro ao obter a lista de personagens");
  }
};

const getCharacterById = async (characterId) => {
  try {
    const response = await instance.get(`/characters/${characterId}`, {
      params: {
        ts: time,
        apikey: PUBLIC_API_KEY,
        hash: hash,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Erro ao obter os detalhes do personagem");
  }
};

export { getCharacters, getCharacterById };
