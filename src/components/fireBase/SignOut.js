import { getAuth, signOut } from "firebase/auth";
import app from "./FireBaseConfig";

const auth = getAuth(app);
const SignOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export default SignOut;
