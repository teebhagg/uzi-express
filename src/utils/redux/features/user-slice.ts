import { UserWithIncludes } from '@/lib/prisma';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: Partial<UserWithIncludes> = {
    id: "anonymous",
    name: "Anonymous",
    email: "anonymous",
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserWithIncludes>) => {
            state = { ...state, ...action.payload };
            return state;
        },
        resetUser: () => initialState,
    },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
