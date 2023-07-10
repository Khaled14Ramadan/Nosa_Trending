import React, { useState } from "react";
import { Button } from "antd";
import { Form, Input } from "formik-antd";
import { Formik } from "formik";
import * as Yup from "yup";
import SignUp from "../fireBase/SignUp";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password is required"),
});
function SignUpForm({ notify }) {
  const [load, setLoad] = useState(false);
  let navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const handleSubmit = async (e) => {
    // console.log(e);
    try {
      setLoad(true);
      const response = await SignUp(e.email, e.password);
      console.log("response :", response);
      if (response) {
        navigate("/Login");
        notify("Success Register", "success");
      }
    } catch (e) {
      console.log(e.code.split("/")[1].replaceAll("-", " "));
      const errorMSG = e.code.split("/")[1].replaceAll("-", " ");
      notify(errorMSG, "error");
    } finally {
      setLoad(false);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
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
            <h2 className="text-center my-4">Register Now</h2>
            {load ? <div className="overlay2"></div> : ""}
            <Form layout="vertical" className="m-auto w-50">
              <Form.Item name="name" label="Name">
                <Input name="name" onChange={handleChange} />
              </Form.Item>

              <Form.Item name="email" label="Email" required>
                <Input name="email" onChange={handleChange} />
              </Form.Item>

              <Form.Item name="password" label="Password" required>
                <Input.Password name="password" onChange={handleChange} />
              </Form.Item>

              <Form.Item
                name="passwordConfirmation"
                label="Confirm Password"
                required
              >
                <Input.Password
                  name="passwordConfirmation"
                  onChange={handleChange}
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="btn btn-outline-info my-1 py-1"
              >
                {load ? <i className="fas fa-spinner fa-spin"></i> : "SignUp"}
              </Button>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

export default SignUpForm;
