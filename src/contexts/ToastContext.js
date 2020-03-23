import React, { createContext, useReducer, useContext } from 'react';
import { createPortal } from 'react-dom';
import Toast from '../components/Toast';
import '../styles/toast.scss';

export const ToastContext = createContext();

const initialState = [];

export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const REMOVE_ALL = 'REMOVE_ALL';

export const toastReducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        {
          id: +new Date(),
          content: action.payload.content,
          type: action.payload.type
        }
      ];
    case REMOVE:
      return state.filter(t => t.id !== action.payload.id);
    case REMOVE_ALL:
      return initialState;
    default:
      return state;
  }
};

export const ToastProvider = props => {
  const [toast, toastDispatch] = useReducer(toastReducer, initialState);
  const toastData = { toast, toastDispatch };
  return (
    <ToastContext.Provider value={toastData}>
      {props.children}

      {createPortal(<Toast toast={toast} />, document.body)}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  return useContext(ToastContext);
};
