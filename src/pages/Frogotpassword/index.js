import React from "react";
import "./style.css";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Forget = () => {
  const auth = getAuth();

  const resetPass = () => {
    sendPasswordResetEmail(auth, formik.values.email)
      .then(() => {
        console.log("gese");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: () => {
      resetPass();
    },
    // Yup
    // validationSchema: signin,
  });
  console.log(formik);
  return (
    <>
      <div className="main_forget_wrapper">
        <div className="inner_forgot_box">
          <div className="forget_header">
            <h4>Reset your password</h4>
          </div>
          <div className="forget_pass_body">
            <form onSubmit={formik.handleSubmit}>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                className="w-70"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="email"
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                      borderColor: "#11175d",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#11175d",
                  },
                }}
                value={formik.values.email}
              />
              <div className="reset_btn">
                <Button type="submit" variant="contained">
                  Reset
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forget;
