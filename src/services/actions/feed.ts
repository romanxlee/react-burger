import { createAction } from "@reduxjs/toolkit";
import type { WebSocketMassage } from "../../types";

export const connect = createAction<string>("FEED_WS_CONNECT");
export const disconnect = createAction("FEED_WS_DISCONNECT");
export const wsConnecting = createAction("FEED_WS_CONNECTING");
export const wsOpen = createAction("FEED_WS_OPEN");
export const wsClose = createAction("FEED_WS_CLOSE");
export const wsMessage = createAction<WebSocketMassage, "FEED_WS_MESSAGE">(
  "FEED_WS_MESSAGE",
);
export const wsError = createAction<string, "FEED_WS_ERROR">("FEED_WS_ERROR");

export type WSFeedActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;
