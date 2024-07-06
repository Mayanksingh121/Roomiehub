import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    userDetails: null,
    watchList: [],
    search: null,
  },

  reducers: {
    setIsLoggedIn: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setWatchList: (state, action) => {
      state.watchList = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUserDetails, setWatchList } =
  userSlice.actions;
export default userSlice.reducer;
