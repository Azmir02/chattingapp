import React, { useState } from "react";
import { BsThreeDotsVertical, BsPlusLg } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import ModalImage from "react-modal-image";
import { RxCross1 } from "react-icons/rx";
import { TfiGallery } from "react-icons/tfi";
import { MdKeyboardVoice } from "react-icons/md";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import "./style.css";
import { useRef } from "react";
import { useSelector } from "react-redux";

const Chatting = () => {
  const [open, setOpen] = useState(false);
  const [openCam, setOpenCam] = useState(false);
  const [openGal, setOpenGal] = useState(false);
  const chooseFile = useRef(null);
  const activeChatName = useSelector((active) => active.activeChat.active);
  // camera capture function
  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log(dataUri);
  }

  return (
    <>
      <div className="chatting_box">
        <div className="active_user_status">
          <div className="user_image">
            <div className="image"></div>
            <div className="info">
              <h4>{activeChatName.name}</h4>
              <span>Online</span>
            </div>
          </div>
          <div className="info_bar">
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className="message">
          {/* LEft Message Start */}
          <div className="left_msg">
            <div className="left_text">
              <p>Hello Bro How Are You!</p>
            </div>
            <span>Today, 2:01pm</span>
          </div>
          {/* LEft Message End */}
          {/* Right Message Start */}
          <div className="right_msg">
            <div className="right_text">
              <p>I'm Fine Thank you. What About You?</p>
            </div>
            <span>Today, 2:10pm</span>
          </div>
          <div className="right_msg">
            <div className="right_text">
              <p>
                Hey Whats about your work progress. Can you please give me the
                final update
              </p>
            </div>
            <span>Today, 2:10pm</span>
          </div>
          {/* Right Message End */}
          {/* LEft Message Start */}
          <div className="left_msg">
            <div className="left_image">
              <ModalImage
                small={"/img/demochatimg.jpg"}
                large={"/img/demochatimg.jpg"}
              />
              {/* <img src="/img/demochatimg.jpg" alt="" /> */}
            </div>
            <span>Today, 3:01pm</span>
          </div>
          {/* LEft Message End */}
          {/* Right Message Start */}
          <div className="right_msg">
            <div className="right_image">
              <ModalImage
                small={"/img/demochatimg.jpg"}
                large={"/img/demochatimg.jpg"}
              />
              {/* <img src="/img/demochatimg.jpg" alt="" /> */}
            </div>
            <span>Today, 2:10pm</span>
          </div>
          {/* Right Message End */}
          {/* Right Message Start */}
          <div className="right_msg">
            <audio controls></audio>
            <span>Today, 2:10pm</span>
          </div>
          {/* Right Message End */}
          {/* LEft Message Start */}
          <div className="left_msg">
            <audio controls></audio>
            <span>Today, 3:01pm</span>
          </div>
          {/* LEft Message End */}
          {/* LEft Message Start */}
          <div className="left_msg">
            <video controls></video>
            <span>Today, 3:01pm</span>
          </div>
          {/* LEft Message End */}
        </div>
        <div className="message-inputs">
          <div className="text_inputs">
            <input type="text" />
            <div className="options">
              <div onClick={() => setOpen(!open)}>
                <BsPlusLg />
              </div>
              {open && (
                <div className="more">
                  <div className="camera">
                    <div onClick={() => setOpenCam(true)}>
                      <CiCamera />
                    </div>
                  </div>
                  <div className="gal">
                    <div onClick={() => chooseFile.current.click()}>
                      <TfiGallery />
                    </div>
                    <input hidden type="file" ref={chooseFile} />
                  </div>
                  <div className="voiceRecorder">
                    <div>
                      <MdKeyboardVoice />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button type="button">
            <FaTelegramPlane />
          </button>
        </div>
        {openCam && (
          <div className="capture_image">
            <div className="close" onClick={() => setOpenCam(false)}>
              <RxCross1 />
            </div>
            <Camera
              onTakePhoto={(dataUri) => {
                handleTakePhoto(dataUri);
              }}
              isFullscreen={false}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Chatting;
