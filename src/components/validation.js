import * as Yup from "yup";

export const signup = () =>
  Yup.object({
    name: Yup.string()
      .min(3, "Full Name Must Have 3 Character")
      .max(20)
      .required("Name is required*"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required*"),
    password: Yup.string()
      .min(6, "Password must have 6 character")
      .required("Password is required*"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Confirm Password must be match")
      .required("Confirm Password is required*"),
  });

export const signin = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required*"),
  password: Yup.string()
    .min(6, "Password must have 6 character")
    .required("Password is required*"),
});
