import { configureStore } from '@reduxjs/toolkit'
import bodySlice from './bodySlice'
import tocSlice from './tocSlice'

export const store = configureStore({
  reducer: {
    toc: tocSlice,
    body: bodySlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
