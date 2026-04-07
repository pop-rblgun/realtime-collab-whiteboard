import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Element {
  id: string;
  type: 'rect' | 'circle';
  x: number;
  y: number;
  color: string;
}

interface WhiteboardState {
  elements: Element[];
  history: Element[][];
}

const initialState: WhiteboardState = {
  elements: [],
  history: [],
};

const whiteboardSlice = createSlice({
  name: 'whiteboard',
  initialState,
  reducers: {
    setElements: (state, action: PayloadAction<Element[]>) => {
      state.elements = action.payload;
    },
    updateElement: (state, action: PayloadAction<Element>) => {
      // Save current state to history before update for Undo
      state.history.push([...state.elements]);
      if (state.history.length > 20) state.history.shift();

      const index = state.elements.findIndex(e => e.id === action.payload.id);
      if (index === -1) {
        state.elements.push(action.payload);
      } else {
        state.elements[index] = action.payload;
      }
    },
    remoteUpdateElement: (state, action: PayloadAction<Element>) => {
      // Update from server - don't add to local undo history to avoid loops
      const index = state.elements.findIndex(e => e.id === action.payload.id);
      if (index === -1) {
        state.elements.push(action.payload);
      } else {
        state.elements[index] = action.payload;
      }
    },
    undo: (state) => {
      if (state.history.length > 0) {
        const previous = state.history.pop();
        if (previous) {
          state.elements = previous;
        }
      }
    },
  },
});

export const { setElements, updateElement, remoteUpdateElement, undo } = whiteboardSlice.actions;
export default whiteboardSlice.reducer;
