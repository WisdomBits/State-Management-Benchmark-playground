import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    reset: (state) => {
      state.count = state.count + 0;
    },
  },
});

// Export actions
export const { increment, reset } = counterSlice.actions;

// Configure store
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
