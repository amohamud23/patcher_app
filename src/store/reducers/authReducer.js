const defaultState = {
  email: null,
  id: null,
  name: null,
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
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.avatar = action.payload.avatar;
      state.approved = action.payload.approved;
      state.company = action.payload.company;
      state.companyID = action.payload.companyID;
      state.employeeType = action.payload.employeeType;
      state.address = action.payload.address;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.zipcode = action.payload.zipcode;
      state.status = "Successfully Signed In";

      return { ...state };
    case "AUTH_LOGOUT":
      state.email = null;
      state.id = null;
      state.name = null;
      state.age = null;
      state.avatar = null;
      state.approved = null;
      state.company = null;
      state.companyID = null;
      state.employeeType = null;
      state.address = null;
      state.city = null;
      state.zipcode = null;
      state.status = "Successfully Signed Out";

      return { ...state };
    case "AUTH_FAIL":
      state.status = action.status;

      return { ...state };

    default:
      return state;
  }
};

export default authReducer;
