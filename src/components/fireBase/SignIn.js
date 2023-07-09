import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "./FireBaseConfig";
const auth = getAuth(app);
const SignIn = (email, password) => {
  return new Promise((success, error) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user : ", user.accessToken);
        console.log("userAll : ", userCredential);
        // alert("succsefully SigIn");
        success(user);
        // ...
      })
      .catch((e) => {
        const errorCode = e.code;
        const errorMessage = e.message;
        console.log("error signin : ", errorCode);
        error(e);
        // ..
      });
  });
};

export default SignIn;
