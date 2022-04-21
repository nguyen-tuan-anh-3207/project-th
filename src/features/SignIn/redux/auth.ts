import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from 'src/interfaces/role';

export interface Auth {
  userName: string;
  role: Role | '';
  isAuth: boolean;
}

const initialState: Auth = {
  userName: '',
  role: '',
  isAuth: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ userName: string; role: Role }>) => {
      state.userName = action.payload.userName;
      state.role = action.payload.role;
      state.isAuth = true;
    },
    clearAuth: (state) => {
      state.userName = '';
      state.role = '';
      state.isAuth = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setAuth, clearAuth } = authSlice.actions;

const { reducer: authReducer } = authSlice;

export default authReducer;
