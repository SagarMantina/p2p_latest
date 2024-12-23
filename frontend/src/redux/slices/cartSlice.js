
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
// Initial state
const initialState = {
  cart: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Thunks for async API calls
export const fetchCartGames = createAsyncThunk(
  'cart/fetchCartGames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/getcartgames`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart games');
      }

      const data = await response.json();
      return data; // Assuming the API returns an array of cart games
    } catch (error) {
      return rejectWithValue(error.message || 'Error fetching cart games');
    }
  }
);


export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (game, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/addtocart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart_games: { game_name: game } }), // Send game_name in the correct structure
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to add game to cart');
      }

      const data = await response.json();
      console.log(data);
      return { game, successMsg: data.successMsg };
    } catch (error) {
      return rejectWithValue(error.message || 'Error adding to cart');
    }
  }
);


export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (game, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/removetocart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart_games: game }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to remove game from cart');
      }

      const data = await response.json();
      return { game, successMsg: data.successMsg };
    } catch (error) {
      return rejectWithValue(error.message || 'Error removing from cart');
    }
  }
);

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart Games
      .addCase(fetchCartGames.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCartGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCartGames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'added';
        state.cart.push(action.payload.game);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Remove from Cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter(
          (item) => item.game_name !== action.payload.game
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
