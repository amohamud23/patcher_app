const defaultState = {
  email: null,
  id: null,
  firstname: null,
  lastname: null,
  age: null,
  avatar: null,
  approved: null,
  company: null,
  companyID: null,
  employeeType: null,
  address: null,
  city: null,
  state: null,
  zipcode: null,
  status: null,
};
const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      state.email = action.payload.email;
      state.status = "Successfully Signed In";

      return { ...state };

    default:
      return state;
  }
};

export default authReducer;
