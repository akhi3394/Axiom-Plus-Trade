import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token } from '@/types/token';

interface UIState {
    isBuyModalOpen: boolean;
    selectedToken: Token | null;
}

const initialState: UIState = {
    isBuyModalOpen: false,
    selectedToken: null,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openBuyModal: (state, action: PayloadAction<Token>) => {
            state.isBuyModalOpen = true;
            state.selectedToken = action.payload;
        },
        closeBuyModal: (state) => {
            state.isBuyModalOpen = false;
            state.selectedToken = null;
        },
    },
});

export const { openBuyModal, closeBuyModal } = uiSlice.actions;
export default uiSlice.reducer;
