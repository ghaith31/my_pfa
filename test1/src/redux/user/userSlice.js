import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    
}  

});

export const {
  signInStart,    // Action pour démarrer le processus de connexion
  signInSuccess,  // Action pour signaler une connexion réussie
  signInFailure,  // Action pour signaler une erreur lors de la connexion
} = userSlice.actions;

export default userSlice.reducer;