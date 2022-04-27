const getWord = () => {
  return fetch('https://clientes.api.greenborn.com.ar/public-random-word')
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export default getWord;
