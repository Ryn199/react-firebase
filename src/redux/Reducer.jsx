// const initialState = {
//   isLogin: false,
//   email: '',
//   password: '',
//   error: '',
// };

// const emailverify = "admin@gmail.com";
// const passwordverify = "admin";

// const loginReducer = (state = initialState, action) => {
//   switch (action.type) {
//       case "VALIDATE_LOGIN":
//           if (action.payload.email === emailverify && action.payload.password === passwordverify) {
//               return {
//                   ...state,
//                   isLogin: true,
//                   email: action.payload.email,
//                   password: action.payload.password,
//                   error: '',
//               };
//           } else {
//               return {
//                   ...state,
//                   isLogin: false,
//                   error: "Email atau Password anda salah",
//               };
//           }
//       default:
//           return state;
//   }
// };

// export default loginReducer;
// Reducer.jsx

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPokemonList = createAsyncThunk(
  "pokemon/fetchPokemonList",
  async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
    const data = await response.json();
    const pokemonDetails = await Promise.all(
      data.results.map(async (poke) => {
        const pokeResponse = await fetch(poke.url);
        return pokeResponse.json();
      })
    );
    return pokemonDetails;
  }
);

export const fetchPokemonDetail = createAsyncThunk(
  "pokemon/fetchPokemonDetail",
  async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemonList: [],
    isLoading: false,
    fetchError: null,
    pokemonDetail: null,
    isDetailLoading: false,
    detailError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.isLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.pokemonList = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchError = action.error.message;
      })
      .addCase(fetchPokemonDetail.pending, (state) => {
        state.isDetailLoading = true;
        state.detailError = null;
        state.pokemonDetail = null;
      })
      .addCase(fetchPokemonDetail.fulfilled, (state, action) => {
        state.pokemonDetail = action.payload;
        state.isDetailLoading = false;
      })
      .addCase(fetchPokemonDetail.rejected, (state, action) => {
        state.isDetailLoading = false;
        state.detailError = action.error.message;
      });
  },
});

export default pokemonSlice.reducer;
