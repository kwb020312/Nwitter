import React, { useEffect, useState } from "react";
import { authService, dbService } from "../fbase";
import { useHistory } from "react-router-dom";

export default function Profile({ userObj, refreshUser }) {
  const history = useHistory();
  let userName;
  if (userObj.displayName !== null) {
    userName = userObj.displayName;
  } else {
    userName = userObj.email;
  }
  const [newDisplayName, setNewDisplayName] = useState(userName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
  };
  useEffect(() => {
    getMyNweets();
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
    refreshUser();
  };
  const onChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          value={newDisplayName}
          onChange={onChange}
          type="text"
          className="formInput"
          autoFocus
          placeholder="Display name"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
}
