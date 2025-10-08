import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  userId: number | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null,
  isAdmin: localStorage.getItem('isAdmin') === 'true',
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // userId may be missing from some backend responses; accept nullable userId
    loginSuccess: (state, action: PayloadAction<{ token: string; role: string; userId?: number | null }>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId ?? null;
      state.isAdmin = action.payload.role === 'ADMIN';
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      // only persist userId if it's non-null/undefined
      if (action.payload.userId != null) {
        localStorage.setItem('userId', action.payload.userId.toString());
      }
      localStorage.setItem('isAdmin', action.payload.role === 'ADMIN' ? 'true' : 'false');
    },
    
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.isAdmin = false;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('isAdmin');
    },
    
    loadUser: (state) => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const isAdmin = localStorage.getItem('isAdmin');
      
      if (token) {
        state.token = token;
        state.userId = userId ? Number(userId) : null;
        state.isAdmin = isAdmin === 'true';
        state.isAuthenticated = true;
      }
    },
  },
});

export const { loginSuccess, logout, loadUser } = authSlice.actions;
export default authSlice.reducer;
