/**
 * @jest-environment jsdom
 */

import authReducer, { initialState } from "./authSlice";

describe("orderFeedActionsSlice", () => {
  const authSliceInitialState = initialState;

  it("should handle initial state", () => {
    const action = { type: "unknown" };

    expect(authReducer(authSliceInitialState, action)).toEqual(
      authSliceInitialState,
    );
  });
});
