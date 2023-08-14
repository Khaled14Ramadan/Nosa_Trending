import React, { useContext, useState } from "react";
import { Button } from "antd";
import { Form, Input } from "formik-antd";
import { Formik } from "formik";
import * as Yup from "yup";
import SignIn from "../fireBase/SignIn";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../DataCenter/MyProvider";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
function SignInForm() {
  const { notify } = useContext(MyContext);
  const [load, setLoad] = useState(false);
  let navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (e) => {
    console.log(e);
    try {
      setLoad(true);
      const response = await SignIn(e.email, e.password);
      console.log("response :", response);
      if (response) {
        localStorage.setItem("userToken", response.accessToken);
        navigate("/Home");
        notify("Success LogIn", "success");
      }
    } catch (e) {
      console.log(e.code);
      notify("invalid Password Or Email", "error");
    } finally {
      setLoad(false);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
  };

  const btnClick = () => {
    console.log("khaled test signin");
  };

  // const notify = (msg) => toast(msg);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      //   innerRef={formRef}
    >
      {(handleSubmit) => {
        return (
          <>
            <h2 className="text-center my-4">Login Now</h2>
            {load ? <div className="overlay2"></div> : ""}
            <Form layout="vertical" className="m-auto w-50">
              <Form.Item name="email" label="Email" required>
                <Input name="email" onChange={handleChange} />
              </Form.Item>

              <Form.Item name="password" label="Password" required>
                <Input.Password name="password" onChange={handleChange} />
              </Form.Item>

              <div className="d-flex justify-content-between align-items-ceneter">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn btn-outline-info my-1 py-1"
                  onClick={btnClick}
                >
                  {load ? <i className="fas fa-spinner fa-spin"></i> : "SignIn"}
                </Button>
                <div className="py-1 text-light">
                  don't have account ?
                  <Link to="register" className="text-decoration-underline">
                    {" "}
                    Register
                  </Link>
                </div>
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

export default SignInForm;
