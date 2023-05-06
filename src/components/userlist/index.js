import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import "./style.css";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";

const Userlist = () => {
  const [userlists, setUsetlists] = useState([]);
  const [frndreq, setFrndreq] = useState([]);
  const [frndlist, setFrndlist] = useState([]);
  const [filteruser, setFilteruser] = useState([]);
  const user = useSelector((users) => users.login.loggedIn);
  const db = getDatabase();

  console.log();
  useEffect(() => {
    const starCountRef = ref(db, "users");
    onValue(starCountRef, (snapshot) => {
      let userarr = [];
      snapshot.forEach((userlists) => {
        if (user.uid != userlists.key) {
          // frndlist?.map((frnd) => {
          //   const frndid = frnd?.includes(userlists.key);
          //   const userid = frnd?.includes(user.uid);
          //   console.log({ frndid, userid });
          //   if (!frndid && !userid) {
          //     userarr.push({ ...userlists.val(), id: userlists.key });
          //   }
          // });
          let frnds = frndlist.find(
            (frnd) => frnd?.includes(userlists.key) && frnd?.includes(user.uid)
          );
          if (!frnds) {
            userarr.push({ ...userlists.val(), id: userlists.key });
          }
        }
      });
      setUsetlists(userarr);
    });
  }, [frndlist]);

  // sentrequest
  const handleSentRequest = (item) => {
    set(push(ref(db, "friendrequest")), {
      sendername: user.displayName,
      senderid: user.uid,
      recivername: item.username,
      reciverid: item.id,
    });
  };

  // Show friendrequest
  useEffect(() => {
    const starCountRef = ref(db, "friendrequest");
    onValue(starCountRef, (snapshot) => {
      let reqArr = [];
      snapshot.forEach((item) => {
        reqArr.push(item.val().reciverid + item.val().senderid);
      });
      setFrndreq(reqArr);
    });
  }, []);

  // friendlist show

  useEffect(() => {
    const starCountRef = ref(db, "friends");
    onValue(starCountRef, (snapshot) => {
      let frndArr = [];
      snapshot.forEach((item) => {
        frndArr.push(item.val().reciverid + item.val().senderid);
      });
      setFrndlist(frndArr);
    });
  }, []);

  const handleSearch = (e) => {
    let arr = [];
    if (e.target.value.length == 0) {
      setFilteruser([]);
    }
    userlists.filter((item) => {
      if (item.username.toLowerCase().includes(e.target.value.toLowerCase())) {
        arr.push(item);
        setFilteruser(arr);
      }
    });
  };
  return (
    <>
      <div className="userlist">
        <div className="userlist_header">
          <h4>User lists</h4>
        </div>
        <div className="search_wrapper">
          <div className="search_icons">
            <BsSearch />
          </div>
          <div className="search_fildes">
            <input
              onChange={handleSearch}
              type="text"
              placeholder="search here...."
            />
          </div>
        </div>
        {filteruser.length > 0
          ? filteruser.map((item, i) => (
              <div key={i} className="userlist-wrapper">
                <div className="userlist-images"></div>
                <div className="userlist-name">
                  <h5>{item.username}</h5>
                </div>
                <div className="userlist-btn">
                  {/* {frndreq.includes(item.id + user.uid) ||
                frndreq.includes(user.uid + item.id) ? (
                  <button type="button" disabled>
                    friends
                  </button>
                ) : frndreq.includes(item.id + user.uid) ||
                  frndreq.includes(user.uid + item.id) ? (
                  <button type="button" onClick={() => handleSentRequest(item)}>
                    cancle request
                  </button>
                ) : (
                  <button type="button" onClick={() => handleSentRequest(item)}>
                    sent request
                  </button>
                )} */}

                  {frndlist.includes(item.id + user.uid) ||
                  frndlist.includes(user.uid + item.id) ? (
                    <button type="button" disabled>
                      friends
                    </button>
                  ) : frndreq.includes(item.id + user.uid) ||
                    frndreq.includes(user.uid + item.id) ? (
                    <button type="button" disabled>
                      cancle request
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSentRequest(item)}
                    >
                      sent request
                    </button>
                  )}
                </div>
              </div>
            ))
          : userlists.map((item, i) => (
              <div key={i} className="userlist-wrapper">
                <div className="userlist-images"></div>
                <div className="userlist-name">
                  <h5>{item.username}</h5>
                </div>
                <div className="userlist-btn">
                  {/* {frndreq.includes(item.id + user.uid) ||
                frndreq.includes(user.uid + item.id) ? (
                  <button type="button" disabled>
                    friends
                  </button>
                ) : frndreq.includes(item.id + user.uid) ||
                  frndreq.includes(user.uid + item.id) ? (
                  <button type="button" onClick={() => handleSentRequest(item)}>
                    cancle request
                  </button>
                ) : (
                  <button type="button" onClick={() => handleSentRequest(item)}>
                    sent request
                  </button>
                )} */}

                  {frndlist.includes(item.id + user.uid) ||
                  frndlist.includes(user.uid + item.id) ? (
                    <button type="button" disabled>
                      friends
                    </button>
                  ) : frndreq.includes(item.id + user.uid) ||
                    frndreq.includes(user.uid + item.id) ? (
                    <button type="button" disabled>
                      cancle request
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSentRequest(item)}
                    >
                      sent request
                    </button>
                  )}
                </div>
              </div>
            ))}
        {}
      </div>
    </>
  );
};

export default Userlist;
