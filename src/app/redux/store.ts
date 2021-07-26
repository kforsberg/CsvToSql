import { configureStore } from '@reduxjs/toolkit'
import columnReducer from '@/app/redux/slices/csvDataSlice';

const store = configureStore({
  reducer: {
      columns: columnReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;