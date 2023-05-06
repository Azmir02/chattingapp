import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "@mui/material/Button";
import Cropper from "react-cropper";

const ImageCropper = ({
  image,
  setCropper,
  setImage,
  cropData,
  getCropData,
}) => {
  console.log(image);
  return (
    <>
      <div className="crop_image_box">
        <div className="upload-header">
          <h4>Upload Profile Picture</h4>
          <div className="close" onClick={() => setImage()}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="preview-photo">
          <div className="img-preview" />
        </div>
        <div className="crop-images">
          <Cropper
            style={{ height: 400, width: "100%" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
        </div>

        <div className="upload-btn" onClick={getCropData}>
          <Button variant="contained">Upload Now</Button>
        </div>
      </div>
    </>
  );
};

export default ImageCropper;
