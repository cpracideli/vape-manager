const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  userEmail: null,
  userFullName: null,
  userPhotoUrl: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { 
        ...state,
        isSignedIn: true,
        userId: action.userId,
        userEmail: action.userEmail,
        userFullName: action.userFullName,
        userPhotoUrl: action.userPhotoUrl
      };
    case SIGN_OUT:
      return { 
        ...state,
        isSignedIn: false,
        userId: null,
        userEmail: null,
        userFullName: null,
        userPhotoUrl: null
      };
    default:
      return state;
  }
};

export const signIn = (userId, userEmail, userFullName, userPhotoUrl) => {
  return {
    type: SIGN_IN,
    userId: userId,
    userEmail: userEmail,
    userFullName: userFullName,
    userPhotoUrl: userPhotoUrl
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};