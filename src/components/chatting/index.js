import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical, BsPlusLg } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import ModalImage from "react-modal-image";
import { RxCross1 } from "react-icons/rx";
import { BsEmojiSmile } from "react-icons/bs";
import { TfiGallery } from "react-icons/tfi";
import { MdKeyboardVoice } from "react-icons/md";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import Lottie from "lottie-react";
import "react-html5-camera-photo/build/css/index.css";
import "./style.css";
import EmojiPicker from "emoji-picker-react";
import conversation from "../../svg/coversation.json";
import { useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { AudioRecorder } from "react-audio-voice-recorder";

import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
  uploadString,
  uploadBytes,
} from "firebase/storage";

const Chatting = () => {
  const [open, setOpen] = useState(false);
  const [openCam, setOpenCam] = useState(false);
  const [openGal, setOpenGal] = useState(false);
  const [msg, setMsg] = useState("");
  const [msglist, setMsglist] = useState([]);
  const [grpmsglist, setGrpmsgsglist] = useState([]);
  const [grpmembers, setGrpmembers] = useState([]);
  const [audioURL, setAudioURL] = useState("");
  const [blob, setBlob] = useState("");
  const [showAudio, setShowAudio] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [captureImage, setCaptureImage] = useState("");
  const scrollMsg = useRef();
  const db = getDatabase();
  const storage = getStorage();

  const activeChatName = useSelector((active) => active.activeChat.active);
  const user = useSelector((users) => users.login.loggedIn);
  // camera capture function
  function handleTakePhoto(dataUri) {
    setCaptureImage(dataUri);
    const storageRef = sref(storage, uuidv4());
    uploadString(storageRef, dataUri, "data_url").then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, "singlemsg")), {
          whosendid: user.uid,
          whosendname: user.displayName,
          whoreciveid: activeChatName?.id,
          whorecivename: activeChatName?.name,
          img: downloadURL,
          date: `${new Date().getFullYear()} - ${
            new Date().getMonth() + 1
          } - ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`,
        }).then(() => {
          setOpenCam(false);
        });
      });
    });
  }

  // fileimageupload
  let handleImageUpload = (e) => {
    // console.log(e.target.files[0].name);
    const storageRef = sref(storage, e.target.files[0].name);

    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log("errpr", error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          set(push(ref(db, "singlemsg")), {
            whosendid: user.uid,
            whosendname: user.displayName,
            whoreciveid: activeChatName?.id,
            whorecivename: activeChatName?.name,
            img: downloadURL,
            date: `${new Date().getFullYear()} - ${
              new Date().getMonth() + 1
            } - ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`,
          });
        });
      }
    );
  };
  // send Message
  const handleSendMsg = () => {
    if (activeChatName?.status == "single") {
      set(push(ref(db, "singlemsg")), {
        whosendid: user.uid,
        whosendname: user.displayName,
        whoreciveid: activeChatName?.id,
        whorecivename: activeChatName?.name,
        msg: msg,
        date: `${new Date().getFullYear()} - ${
          new Date().getMonth() + 1
        } - ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`,
      });
    } else {
      set(push(ref(db, "groupmsg")), {
        whosendid: user.uid,
        whosendname: user.displayName,
        whoreciveid: activeChatName?.id,
        whorecivename: activeChatName?.name,
        adminid: activeChatName?.adminid,
        msg: msg,
        date: `${new Date().getFullYear()} - ${
          new Date().getMonth() + 1
        } - ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`,
      });
    }
  };

  // get single message
  useEffect(() => {
    onValue(ref(db, "singlemsg"), (snapshot) => {
      let singlemsgArr = [];
      snapshot.forEach((item) => {
        if (
          (item.val().whosendid == user.uid &&
            item.val().whoreciveid == activeChatName?.id) ||
          (item.val().whoreciveid == user.uid &&
            item.val().whosendid == activeChatName?.id)
        ) {
          singlemsgArr.push(item.val());
        }
        setMsglist(singlemsgArr);
      });
    });
  }, [activeChatName?.id]);

  // get groupmembers
  useEffect(() => {
    onValue(ref(db, "groupmembers"), (snapshot) => {
      let membersArr = [];
      snapshot.forEach((item) => {
        membersArr.push(item.val().groupid + item.val().userid);
      });
      setGrpmembers(membersArr);
    });
  }, []);

  // get group message
  useEffect(() => {
    onValue(ref(db, "groupmsg"), (snapshot) => {
      let grpmsgArr = [];
      snapshot.forEach((item) => {
        grpmsgArr.push(item.val());
      });
      setGrpmsgsglist(grpmsgArr);
    });
  }, [activeChatName?.id]);

  const handleEnterPress = (e) => {
    if (e.key == "Enter") {
      handleSendMsg();
    }
  };

  // for audio part
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudioURL(url);
    setBlob(blob);
    // const audio = document.createElement("audio");
    // audio.src = url;
    // audio.controls = true;
    // document.body.appendChild(audio);
  };

  const handleAudioUpload = () => {
    const audiostorageRef = sref(storage, audioURL);

    // 'file' comes from the Blob or File API
    uploadBytes(audiostorageRef, blob).then((snapshot) => {
      getDownloadURL(audiostorageRef).then((downloadURL) => {
        set(push(ref(db, "singlemsg")), {
          whosendid: user.uid,
          whosendname: user.displayName,
          whoreciveid: activeChatName?.id,
          whorecivename: activeChatName?.name,
          audio: downloadURL,
          date: `${new Date().getFullYear()} - ${
            new Date().getMonth() + 1
          } - ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`,
        }).then(() => {
          setAudioURL("");
        });
      });
    });
  };

  // Emoji select
  const handleEmojiSelect = (emoji) => {
    setMsg(msg + emoji.emoji);
  };

  // scrolmsg
  useEffect(() => {
    scrollMsg?.current?.scrollIntoView({ behavior: "smooth" });
  }, [msglist]);

  console.log(grpmembers);
  console.log(activeChatName?.id + user.uid);

  return (
    <>
      <div className="chatting_box">
        <div className="active_user_status">
          <div className="user_image">
            <div className="image"></div>
            <div className="info">
              <h4>{activeChatName?.name}</h4>
              <span>Online</span>
            </div>
          </div>
          <div className="info_bar">
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className="message">
          {activeChatName?.status == "single"
            ? msglist.map((item, i) => (
                <div ref={scrollMsg} key={i}>
                  {item.whosendid == user.uid ? (
                    item.msg ? (
                      <>
                        <div className="right_msg" key={i}>
                          <div className="right_text">
                            <p>{item.msg}</p>
                          </div>
                          <span>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </span>
                        </div>
                      </>
                    ) : item.img ? (
                      <div className="right_msg">
                        <div className="right_image">
                          <ModalImage small={item.img} large={item.img} />
                        </div>
                        <span>
                          {" "}
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                      </div>
                    ) : (
                      <div className="right_msg">
                        <audio controls src={item.audio}></audio>
                        <span>
                          {" "}
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                      </div>
                    )
                  ) : item.msg ? (
                    <>
                      <div className="left_msg" key={i}>
                        <div className="left_text">
                          <p>{item.msg}</p>
                        </div>
                        <span>
                          {" "}
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                      </div>
                    </>
                  ) : item.img ? (
                    <div className="left_msg">
                      <div className="left_image">
                        <ModalImage small={item.img} large={item.img} />
                      </div>
                      <span>
                        {" "}
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      </span>
                    </div>
                  ) : (
                    <div className="left_msg">
                      <audio controls src={item.audio}></audio>
                      <span>
                        {" "}
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      </span>
                    </div>
                  )}
                </div>
              ))
            : user?.uid == activeChatName?.adminid ||
              grpmembers.includes(activeChatName?.id + user.uid)
            ? grpmsglist.map((item, i) => (
                <div key={i}>
                  {item.whosendid == user.uid
                    ? item.whoreciveid == activeChatName?.id && (
                        <div className="right_msg" key={i}>
                          <div className="right_text">
                            <p>{item.msg}</p>
                          </div>
                          <span>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </span>
                        </div>
                      )
                    : item.whoreciveid == activeChatName?.id && (
                        <div className="left_msg" key={i}>
                          <div className="left_text">
                            <p>{item.msg}</p>
                          </div>
                          <span>
                            {" "}
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </span>
                        </div>
                      )}
                </div>
              ))
            : "Not a Group Member"}
        </div>

        {activeChatName?.status == "single" ? (
          <div className="message-inputs">
            {!showAudio && !audioURL && (
              <div className="text_inputs">
                <input
                  type="text"
                  onKeyUp={handleEnterPress}
                  onChange={(e) => setMsg(e.target.value)}
                  value={msg}
                />
                <div className="emoji" onClick={() => setShowEmoji(!showEmoji)}>
                  <BsEmojiSmile />
                </div>
                {showEmoji && (
                  <div className="emoji-pickers">
                    <EmojiPicker onEmojiClick={handleEmojiSelect} />
                  </div>
                )}
                <div className="options">
                  <div onClick={() => setOpen(!open)}>
                    <BsPlusLg />
                  </div>
                </div>
                {open && (
                  <div className="more">
                    <div className="camera">
                      <div onClick={() => setOpenCam(true)}>
                        <CiCamera />
                      </div>
                    </div>
                    <label>
                      <input hidden onChange={handleImageUpload} type="file" />
                      <TfiGallery />
                    </label>

                    <div className="voiceRecorder">
                      <div>
                        <MdKeyboardVoice />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div
              className="recorder-btn"
              onClick={() => setShowAudio(!showAudio)}
            >
              <AudioRecorder
                onRecordingComplete={(blob) => addAudioElement(blob)}
              />
            </div>
            {!showAudio && !audioURL && (
              <button type="button" onClick={handleSendMsg}>
                <FaTelegramPlane />
              </button>
            )}
            {audioURL && (
              <>
                <div className="audio_wrapper">
                  <audio controls src={audioURL}></audio>
                  <div className="send_audio" onClick={handleAudioUpload}>
                    <button>Send</button>
                  </div>
                  <div className="delete_audio" onClick={() => setAudioURL("")}>
                    <button>Delete</button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : user?.uid == activeChatName?.adminid ||
          grpmembers.includes(activeChatName?.id + user.uid) ? (
          <div className="message-inputs">
            {!showAudio && !audioURL && (
              <div className="text_inputs">
                <input
                  type="text"
                  onKeyUp={handleEnterPress}
                  onChange={(e) => setMsg(e.target.value)}
                  value={msg}
                />
                <div className="emoji" onClick={() => setShowEmoji(!showEmoji)}>
                  <BsEmojiSmile />
                </div>
                {showEmoji && (
                  <div className="emoji-pickers">
                    <EmojiPicker onEmojiClick={handleEmojiSelect} />
                  </div>
                )}
                <div className="options">
                  <div onClick={() => setOpen(!open)}>
                    <BsPlusLg />
                  </div>
                </div>
                {open && (
                  <div className="more">
                    <div className="camera">
                      <div onClick={() => setOpenCam(true)}>
                        <CiCamera />
                      </div>
                    </div>
                    <label>
                      <input hidden onChange={handleImageUpload} type="file" />
                      <TfiGallery />
                    </label>
                    <div className="voiceRecorder">
                      <div>
                        <MdKeyboardVoice />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div
              className="recorder-btn"
              onClick={() => setShowAudio(!showAudio)}
            >
              <AudioRecorder
                onRecordingComplete={(blob) => addAudioElement(blob)}
              />
            </div>
            {!showAudio && !audioURL && (
              <button type="button" onClick={handleSendMsg}>
                <FaTelegramPlane />
              </button>
            )}
            {audioURL && (
              <>
                <div className="audio_wrapper">
                  <audio controls src={audioURL}></audio>
                  <div className="send_audio" onClick={handleAudioUpload}>
                    <button>Send</button>
                  </div>
                  <div className="delete_audio" onClick={() => setAudioURL("")}>
                    <button>Delete</button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          "nai"
        )}

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
