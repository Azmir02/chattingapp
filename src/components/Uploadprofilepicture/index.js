import React, { useRef, useState } from "react";
import "./style.css";
import { IoIosImages } from "react-icons/io";
import ImageCropper from "./ImageCropper";
import "cropperjs/dist/cropper.css";

import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

import { getAuth, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Loginusers } from "../../features/Slice/LoginSlice";
import { json } from "react-router-dom";

const Uploadprofile = ({ setOpen }) => {
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const chooseFile = useRef(null);
  const user = useSelector((user) => user.login.loggedIn);
  const auth = getAuth();
  const storage = getStorage();
  const storageRef = ref(storage, "some-child");
  const dispatch = useDispatch();

  const handleUploadProfile = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            setOpen(false);
            dispatch(Loginusers({ ...user, photoURL: downloadURL }));
            localStorage.setItem(
              "users",
              JSON.stringify({ ...user, photoURL: downloadURL })
            );
          });
        });
      });
    }
  };
  return (
    <>
      <div className="upload-box">
        <input
          type="file"
          hidden
          ref={chooseFile}
          onChange={handleUploadProfile}
        />
        <div className="upload" onClick={() => chooseFile.current.click()}>
          <div className="upload_icon">
            <IoIosImages />
          </div>
          <p>Upload Photo</p>
        </div>
        {image && (
          <ImageCropper
            image={image}
            setCropper={setCropper}
            setImage={setImage}
            cropData={cropData}
            getCropData={getCropData}
          />
        )}
      </div>
    </>
  );
};

export default Uploadprofile;
