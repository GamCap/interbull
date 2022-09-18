import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/types';

export interface ICommonState {
	counter: number;
}

const initialState: ICommonState = {
	counter: 0,
};

export const {
	actions: { setCounter },
	reducer,
} = createSlice({
	name: 'common',
	initialState,
	reducers: {
		setCounter: (state, data: PayloadAction<number>) => {
			state.counter = data.payload;
		},
	},
});

export const counterSelector = (state: RootState) => state.Common.counter;
