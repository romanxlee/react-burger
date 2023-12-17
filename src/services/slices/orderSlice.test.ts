import orderReducer, { initialState } from "./orderSlice";

describe("orderFeedActionsSlice", () => {
  const orderSliceInitialState = initialState;

  it("should handle initial state", () => {
    const action = { type: "unknown" };

    expect(orderReducer(orderSliceInitialState, action)).toEqual(
      orderSliceInitialState,
    );
  });
});
