import { WebSocketMassage, WebSocketStatus } from "../../types";
import { createReducer } from "@reduxjs/toolkit";
import {
  wsConnecting,
  wsMessage,
  wsClose,
  wsError,
  wsOpen,
} from "../actions/profile-orders";
import { RootState } from "../slices/";

type ProfileOrdersState = {
  status: WebSocketStatus;
  orders: WebSocketMassage | null;
  error: string;
};

const initialState: ProfileOrdersState = {
  status: WebSocketStatus.OFFLINE,
  orders: null,
  error: "",
};

const profileOrdersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state = {
        ...state,
        status: WebSocketStatus.CONNECTING,
      };

      return state;
    })
    .addCase(wsOpen, (state) => {
      state = {
        ...state,
        status: WebSocketStatus.ONLINE,
        error: "",
      };

      return state;
    })
    .addCase(wsClose, (state) => {
      state = {
        ...state,
        status: WebSocketStatus.OFFLINE,
      };

      return state;
    })
    .addCase(wsError, (state, action) => {
      state = {
        ...state,
        error: action.payload,
      };

      return state;
    })
    .addCase(wsMessage, (state, action) => {
      state = {
        ...state,
        orders: action.payload,
      };

      return state;
    });
});

export const profileOrders = (state: RootState) => state.profileOrders.orders;

export default profileOrdersReducer;
