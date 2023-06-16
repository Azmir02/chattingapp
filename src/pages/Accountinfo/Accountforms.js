import React from "react";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import { Loginusers } from "../../features/Slice/LoginSlice";

const Accountforms = () => {
  const db = getDatabase();
  const auth = getAuth();
  const users = useSelector((user) => user.login.loggedIn);
  const dispatch = useDispatch();
  const currentuser = auth.currentUser;
  console.log(currentuser);
  const formik = useFormik({
    initialValues: {
      name: users.displayName,
      email: users.email,
      password: "",
    },
    onSubmit: () => {
      handleUpdateProfile();
    },
  });

  const handleUpdateProfile = async () => {
    await updateProfile(auth.currentUser, {
      displayName: formik.values.name,
    }).then(async () => {
      const userInfo = {
        // uid: auth.currentUser.uid,
        // email: auth.currentUser.email,
        displayName: auth.currentUser.displayName,
        // emailVerified: auth.currentUser.emailVerified,
        // photoURL: auth.currentUser.photoURL,
      };
      await update(ref(db, "users/" + users.uid), {
        username: userInfo.displayName,
      });
      await updatePassword(currentuser, formik.values.password).then(() => {
        console.log("newPassword");
      });
      dispatch(Loginusers({ ...users, displayName: formik.values.name }));
      localStorage.setItem(
        "users",
        JSON.stringify({
          ...users,
          displayName: formik.values.name,
        })
      );
    });
  };

  //   update(ref(db, "users/" + users.uid), {
  //     username: formik.values.name,
  //   });

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            type="text"
            label="Name"
            variant="outlined"
            name="name"
            fullWidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            name="email"
            fullWidth
            disabled
            margin="normal"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <TextField
            type="password"
            label="New password"
            variant="outlined"
            name="password"
            fullWidth
            margin="normal"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="update-btn"
          >
            Update Account
          </Button>
        </form>
      </div>
    </>
  );
};

export default Accountforms;
