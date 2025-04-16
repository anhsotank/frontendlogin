import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: {
      allComments: null,
      isfetching: false,
      error: false,
    },
    // addcomment: {
    //   isfetching: false,
    //   error: false,
    //   success: false,
    // },

    msg: "",
  },
  reducers: {
    getcommentsStart: (state) => {
      state.comments.isfetching = true;
    },
    getcommentsSuccess: (state, action) => {
      state.comments.isfetching = false;
      state.comments.allComments = action.payload;
      state.comments.error = false;
    },
    getcommentsFailed: (state) => {
      state.comments.isfetching = false;
      state.comments.error = true;
    },

    addcommentsStart: (state) => {
      state.comments.isfetching = true;
    },
    addcommentsSuccess: (state) => {
      state.comments.isfetching = false;

      state.comments.error = false;
    },
    addcommentsFailed: (state) => {
      state.comments.isfetching = false;
      state.comments.error = true;
    },

    deletecommentsStart: (state) => {
      state.comments.isfetching = true;
    },
    deletecommentsSuccess: (state, action) => {
      state.comments.isfetching = false;
      state.msg = action.payload;
    },
    deletecommentsFailed: (state, action) => {
      state.comments.isfetching = false;
      state.comments.error = true;
      state.msg = action.payload;
    },

    updatecommentsStart: (state) => {
      state.isfetching = true;
      state.error = false;
    },
    updatecommentsSuccess: (state, action) => {
      state.comments.isfetching = false;
      state.msg = action.payload;
    },
    updatecommentsFailed: (state, action) => {
      state.comments.isfetching = false;
      state.comments.error = true;
      state.msg = action.payload;
    },
  },
});

export const {
  getcommentsStart,
  getcommentsSuccess,
  getcommentsFailed,
  addcommentsStart,
  addcommentsSuccess,
  addcommentsFailed,
  deletecommentsStart,
  deletecommentsSuccess,
  deletecommentsFailed,
  updatecommentsStart,
  updatecommentsSuccess,
  updatecommentsFailed,
} = commentSlice.actions;

export default commentSlice.reducer;
