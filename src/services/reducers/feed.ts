import { WebSocketMassage, WebSocketStatus } from "../../types";
import { createReducer } from "@reduxjs/toolkit";
import {
  wsConnecting,
  wsMessage,
  wsClose,
  wsError,
  wsOpen,
} from "../actions/feed";
import { RootState } from "../slices/";

type FeedOrdersState = {
  status: WebSocketStatus;
  orders: WebSocketMassage | null;
  error: string;
};

export const initialState: FeedOrdersState = {
  status: WebSocketStatus.OFFLINE,
  orders: null,
  error: "",
};

const feedReducer = createReducer(initialState, (builder) => {
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

export const feedOrders = (state: RootState) => state.feed.orders;

export default feedReducer;
