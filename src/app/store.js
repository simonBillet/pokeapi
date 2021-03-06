import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from '../features/Service/pokemonsSlice';

export default configureStore({
  reducer: {
    pokemons: pokemonsReducer
  },
});
