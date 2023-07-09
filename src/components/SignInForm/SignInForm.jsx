import React, { useState } from "react";
import { Button } from "antd";
import { Form, Input } from "formik-antd";
import { Formik } from "formik";
import * as Yup from "yup";
import SignIn from "../fireBase/SignIn";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
function SignInForm() {
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
        localStorage.setItem("userToken", "tokenTest");
        navigate("/Home");
      }
    } catch (e) {
      console.log(e.code);
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
            <Form layout="vertical" className="m-auto vh-100 w-50">
              <Form.Item name="email" label="Email" required>
                <Input name="email" onChange={handleChange} />
              </Form.Item>

              <Form.Item name="password" label="Password" required>
                <Input.Password name="password" onChange={handleChange} />
              </Form.Item>

              <Button type="primary" htmlType="submit" onClick={btnClick}>
                {load ? <i className="fas fa-spinner fa-spin"></i> : "SignIn"}
              </Button>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

export default SignInForm;
