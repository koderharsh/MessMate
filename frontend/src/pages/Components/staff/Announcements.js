import React, { useState } from "react";
import { postStaffNotification } from "../../../util/notifApi";
import { isAuthenticated } from "../../../util/staffApi";
import "../student/studentComponentStyles.css";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";

const Announcements = () => {
  const token = isAuthenticated() && isAuthenticated().stafftoken;
  const [description, setDescription] = useState("");

  const handleNotifChange = (event) => {
    setDescription(event.target.value);
  };

  const postNotif = (event) => {
    event.preventDefault();
    postStaffNotification(token, { description }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        //console.log(data)
        setDescription("");
      }
    });
  };
  return (
    <div>
      <h3 className='student-card-heading'>Make Announcements</h3>
      <textarea
        value={description}
        name='description'
        onChange={handleNotifChange}
        rows='3'
        style={{
          marginTop: "1.5rem",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "rgba(255, 255, 255, 0.9)",
          border: "solid 2px rgba(255, 255, 255, 0.6)",
          padding: "8px 8px 8px 18px",
          width: "calc(100% - 20px)",
          minWidth: "max-content",
          fontSize: 18,
          borderRadius: 12,
          outline: "none",
          textAlign: "left",
        }}
        className='taAnnouncement'
      />
      <Button
        variant='contained'
        color='primary'
        className='feedback__button'
        endIcon={<SendIcon />}
        onClick={postNotif}
        style={{
          marginTop: 20,
          backgroundColor: "rgba(var(--accent), 0.9)",
          borderRadius: 8,
          padding: "6px 40px",
          margin: "20px 0px",
        }}
      >
        Send
      </Button>
    </div>
  );
};

export default Announcements;
