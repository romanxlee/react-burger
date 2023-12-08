import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice";
import ordersReducer from "./orderSlice";
import authReducer from "./authSlice";
import { socketMiddleware } from "../middleware/socket-middleware";
import { combineReducers } from "@reduxjs/toolkit";
import feedReducer from "../reducers/feed";
import profileOrdersReducer from "../reducers/profileOrders";

import {
  connect as feedConnect,
  disconnect as feedDisconnect,
  wsClose as feedWSClose,
  wsConnecting as feedWSConnecting,
  wsError as feedWSError,
  wsMessage as feedWSMessage,
  wsOpen as FEED_WS_OPEN,
} from "../actions/feed";

import {
  connect as profileOrdersConnect,
  disconnect as profileOrdersDisconnect,
  wsClose as profileOrdersWSClose,
  wsConnecting as profileOrdersWSConnecting,
  wsError as profileOrdersWSError,
  wsMessage as profileOrdersWSMessage,
  wsOpen as profileOrdersWSOpen,
} from "../actions/profile-orders";

const profileSocketMiddleware = socketMiddleware({
  wsConnect: profileOrdersConnect,
  wsDisconnect: profileOrdersDisconnect,
  wsConnecting: profileOrdersWSConnecting,
  onError: profileOrdersWSError,
  onMessage: profileOrdersWSMessage,
  onOpen: profileOrdersWSOpen,
  onClose: profileOrdersWSClose,
});

const feedSocketMiddleware = socketMiddleware({
  wsConnect: feedConnect,
  wsDisconnect: feedDisconnect,
  wsConnecting: feedWSConnecting,
  onError: feedWSError,
  onMessage: feedWSMessage,
  onOpen: FEED_WS_OPEN,
  onClose: feedWSClose,
});

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  auth: authReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      feedSocketMiddleware,
      profileSocketMiddleware,
    ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
