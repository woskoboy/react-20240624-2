import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getReviews } from "./get-reviews";

const entityAdapter = createEntityAdapter();

export const ReviewSlice = createSlice({
  name: "review",
  initialState: entityAdapter.getInitialState({
    requestStatus: "idle",
  }),
  selectors: {
    selectReviewIds: (state) => state.ids,
    selectReviewById: (state, id) => state.entities[id],
  },
  extraReducers: (builder) =>
    builder
      .addCase(getReviews.pending, (state) => {
        state.requestStatus = "pending";
      })
      .addCase(getReviews.fulfilled, (state, { payload }) => {
        state.requestStatus = "fulfilled";

        entityAdapter.addMany(state, payload);
      })
      .addCase(getReviews.rejected, (state) => {
        state.requestStatus = "rejected";
      }),
});

export const { selectReviewIds, selectReviewById } = ReviewSlice.selectors;
