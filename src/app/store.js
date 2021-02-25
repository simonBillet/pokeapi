import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from '../features/documents/pokemonsSlice';

export default configureStore({
  reducer: {
    pokemons: pokemonsReducer
  },
});
