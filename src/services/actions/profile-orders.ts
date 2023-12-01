import { createAction } from "@reduxjs/toolkit";
import type { WebSocketMassage } from "../../types";

export const connect = createAction<string>("PROFILE_ORDERS_WS_CONNECT");
export const disconnect = createAction("PROFILE_ORDERS_WS_DISCONNECT");
export const wsConnecting = createAction("PROFILE_ORDERS_WS_CONNECTING");
export const wsOpen = createAction("PROFILE_ORDERS_WS_OPEN");
export const wsClose = createAction("PROFILE_ORDERS_WS_CLOSE");
export const wsMessage = createAction<
  WebSocketMassage,
  "PROFILE_ORDERS_WS_MESSAGE"
>("PROFILE_ORDERS_WS_MESSAGE");
export const wsError = createAction<string, "PROFILE_ORDERS_WS_ERROR">(
  "PROFILE_ORDERS_WS_ERROR",
);

export type WSProfileOrdersActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;
