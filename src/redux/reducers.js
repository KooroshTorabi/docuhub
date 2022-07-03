let initialState = {
  items: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return { items: [...state.items, action.payload] };
    default:
      return state;
  }
};
