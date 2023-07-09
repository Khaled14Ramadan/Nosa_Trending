import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "./FireBaseConfig";
const auth = getAuth(app);
const SignUp = (email, password) => {
  return new Promise((success, error) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user : ", user);
        alert("succsefully SigUp");
        success(true);
        // ...
      })
      .catch((e) => {
        const errorCode = e.code;
        const errorMessage = e.message;
        console.log("error signup : ", errorCode);
        error(e);
        // ..
      });
  });
};

export default SignUp;
