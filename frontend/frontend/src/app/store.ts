import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "../features/authenticate/authenticateSlice"
import { latLngSlice } from "@/features/map/mapSlice";
export const store = configureStore({
reducer: {
  authenticate: authenticateReducer,
  map: latLngSlice.reducer,
},

});
