import type { Middleware } from "redux";
import type { RootState } from "../slices";
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";
import { userInfo } from "../slices/authSlice";
import { AnyAction } from "redux";

export type WSActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsSendMessage?: ActionCreatorWithPayload<any>;
  wsConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
};

export const socketMiddleware = (
  wsActions: WSActionTypes,
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";

    return (next) => (action) => {
      const { dispatch } = store;
      url = action.payload;
      const {
        wsConnect,
        wsConnecting,
        wsDisconnect,
        wsSendMessage,
        onClose,
        onError,
        onMessage,
        onOpen,
      } = wsActions;

      if (wsConnect.match(action)) {
        socket = new WebSocket(url);
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch(onOpen());
          isConnected = true;
          dispatch(wsConnecting());
        };

        socket.onerror = (event: Event) => {
          dispatch(onError("Error"));
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          if (data.message === "Invalid or missing token") {
            dispatch(userInfo() as unknown as AnyAction);
          } else {
            dispatch(onMessage(parsedData));
          }
        };

        socket.onclose = (event: CloseEvent) => {
          if (event.code !== 1000) {
            dispatch(onError(event.code.toString()));
          }
          dispatch(onClose());

          if (isConnected) {
            dispatch(wsConnecting());
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, 3000);
          }
        };

        if (wsSendMessage && wsSendMessage.match(action)) {
          const payload = action.payload;
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }

        if (wsDisconnect.match(action)) {
          clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
