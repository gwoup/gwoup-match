const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';

const getRandomKey = (length) => {
  let result = [];

  const charactersLength = CHARSET.length;
  for (let i = 0; i < length; i++) {
    result.push(CHARSET.charAt(Math.floor(Math.random() * charactersLength)));
  }

  return result.join('');
};

export {
  getRandomKey
};