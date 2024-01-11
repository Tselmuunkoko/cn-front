import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  phone: string | null;
  email: string | null;
}

const initialState: UserState = {
  phone: null,
  email: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
        state.email = action.payload;
    },
    setPhone(state, action: PayloadAction<string>) {
        state.phone = action.payload;
    }
  },
});

export const { setEmail, setPhone } = userSlice.actions;

export default userSlice.reducer;
