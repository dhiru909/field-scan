import { createSlice} from "@reduxjs/toolkit";
const latLng = localStorage.getItem('latlng')
  ? localStorage.getItem('latlng')
  : null

const initialState = {
    latLng:JSON.parse(latLng!)

}

export const latLngSlice = createSlice({
    name: "map",
    initialState,
    reducers:{
        setLatLng: (state, action) => {
            
            state.latLng = {...action.payload}
            
            console.log("state",state.latLng)
        },
       
    }
})
export const {setLatLng} = latLngSlice.actions
export default latLngSlice.reducer