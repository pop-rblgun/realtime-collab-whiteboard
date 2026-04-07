import { io } from 'socket.io-client';
import { store } from './store/store';
import { setElements, remoteUpdateElement, Element } from './store/whiteboardSlice';

const socket = io('http://localhost:3001');

socket.on('whiteboard-state', (elements: Element[]) => {
  store.dispatch(setElements(elements));
});

socket.on('update-element', (element: Element) => {
  store.dispatch(remoteUpdateElement(element));
});

export const emitElementUpdate = (element: Element) => {
  socket.emit('update-element', element);
};

export default socket;
