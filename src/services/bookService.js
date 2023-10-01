import axios from 'axios';
import endpoint from './endpoint';

export const getBooks = async () => {
  try {
    const { data } = await axios.get(endpoint.libary);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
