import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./Modal.css";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";

interface BanquetCommunityCardProps {
  title: string;
  hashtags: string[];
  description: string;
  passcode: string;
}

const BanquetCommunityCard: React.FC<BanquetCommunityCardProps> = ({
  title,
  hashtags,
  description,
  passcode,
}) => {
  const lowerCaseTitle = title.toLowerCase();
  const formattedTitle = lowerCaseTitle.replace(/ /g, "");
  console.log(formattedTitle);
  const router = useRouter();
  const [userInputPasscode, setUserInputPasscode] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const validPasscode = () => {
    if (userInputPasscode === passcode) {
      router.push(`banquet/${formattedTitle}`);
    } else {
      setStatusMessage("The passcode is invalid 🔒");
    }
  };
  return (
    <div className="w-11/12 flex flex-col ml-3 border-2 border-black rounded-lg">
      <div className="m-4">
        <div>
          <p className="text-lg font-black">{title}</p>
        </div>
        <div className="flex items-center">
          <div className="flex items-center justify-center space-x-2 mt-2">
            {hashtags.map((hashtag, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-5 w-24 font-bold text-xs bg-black text-white text-center rounded-full"
              >
                #{hashtag}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm font-semibold">{description}</p>
        </div>
        <div className="flex w-full flex-col mt-2">
          <button className="bg-black h-10 rounded-lg text-white font-bold">
            Share With Friends
          </button>
          <Popup
            trigger={
              <button className="mt-2 border-2 border-black h-10 rounded-lg font-bold">
                Join 🎟️
              </button>
            }
            modal
            nested
          >
            {(close: any) => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header"> Join {title} Banquet </div>
                <div className="content">{description}</div>
                <div className="w-full">
                  <input
                    onChange={(e) => setUserInputPasscode(e.target.value)}
                    value={userInputPasscode}
                    className="w-full border-2 border-black text-gray-500 px-2 ml-1 h-10 rounded-lg text-sm"
                    placeholder="Enter Passcode"
                  />
                  <button
                    onClick={validPasscode}
                    className="w-full mt-2 bg-black text-white ml-1 rounded-lg h-10 font-bold"
                  >
                    Join
                  </button>
                  <div className="mt-2 flex items-center justify-center">
                    <p className="text-red-500 font-bold text-sm">
                      {statusMessage}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default BanquetCommunityCard;