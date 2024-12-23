import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import homeGamesReducer from './slices/homeGamesSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    homeGames: homeGamesReducer,
    user: userReducer,
  },
});

export default store;
