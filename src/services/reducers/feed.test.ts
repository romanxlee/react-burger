import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
} from "../actions/feed";
import feedReducer, { initialState } from "./feed";
import { WebSocketStatus } from "../../types";

describe("feedReducer", () => {
  test("should handle wsConnecting action", () => {
    const action = { type: wsConnecting.type };
    const expectedState = {
      ...initialState,
      status: WebSocketStatus.CONNECTING,
    };

    expect(feedReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle wsOpen action", () => {
    const action = { type: wsOpen.type };
    const expectedState = {
      ...initialState,
      status: WebSocketStatus.ONLINE,
      error: "",
    };

    expect(feedReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle wsClose action", () => {
    const action = { type: wsClose.type };
    const expectedState = { ...initialState, status: WebSocketStatus.OFFLINE };

    expect(feedReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle wsError action", () => {
    const action = { type: wsError.type, payload: "an error occurred" };
    const expectedState = { ...initialState, error: "an error occurred" };

    expect(feedReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle wsMessage action", () => {
    const action = {
      type: wsMessage.type,
      payload: { someData: "websocket message data" },
    };
    const expectedState = {
      ...initialState,
      orders: { someData: "websocket message data" },
    };

    expect(feedReducer(initialState, action)).toEqual(expectedState);
  });
});
