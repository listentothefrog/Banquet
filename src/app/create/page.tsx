"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import { MoonLoader } from "react-spinners";
const HeaderComponent = dynamic(
  () => import("@/components/Navigation/HeaderComponent"),
  {
    loading: () => <MoonLoader color="#000000" size={25} speedMultiplier={1} />,
  }
);
const CreateBanquet = () => {
  const [user, loading] = useAuthState(auth);
  const [banquetTitle, setBanquetTitle] = useState("");
  const [banquetDescription, setBanquetDescription] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [hashtagsArray, setHashtagsArray] = useState([]);
  const [banquetPasscode, setBanquetPasscode] = useState("");

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [passcodeError, setPasscodeError] = useState("");

  const [themePreference, setThemePreference] = useState(
    localStorage.getItem("themePreference") || "light"
  );

  const router = useRouter();
  if (loading) {
    return <MoonLoader color="#000000" size={25} speedMultiplier={1} />;
  }
  if (!user) {
    router.push("/discover");
  }

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    inputValue.replace(/#/g, "");
    setHashtags(inputValue);

    const arrayFromInput = inputValue.split(" ");

    setHashtagsArray(arrayFromInput);
  };

  const createBanquet = async () => {
    if (!banquetTitle || !banquetDescription || !banquetPasscode) {
      setTitleError("Title is required");
      setDescriptionError("Description is required");
      setPasscodeError("Passcode is required");
      return;
    }

    if (banquetDescription.length < 5 || banquetDescription.length > 350) {
      setDescriptionError("Description must be between 5 and 350 characters");
      return;
    }
    if (banquetPasscode.length < 5) {
      setPasscodeError("Passcode must be at least 5 characters long");
      return;
    }

    const lowerCaseTitle = banquetTitle.toLowerCase();
    const formattedTitle = lowerCaseTitle.replace(/ /g, "");

    await setDoc(doc(db, "Banquet", formattedTitle), {
      title: banquetTitle,
      description: banquetDescription,
      hashtags: hashtagsArray,
      passcode: banquetPasscode,
      creatorUID: user?.uid,
    });

    const docRef = doc(db, "Banquet", formattedTitle);
    const subCollectionRef = collection(docRef, "members");
    const subCollectionData = {
      uid: user?.uid,
      role: "Owner",
      name: user?.displayName,
    };
    await setDoc(doc(subCollectionRef, user?.uid), subCollectionData);
    router.push(`banquet/${formattedTitle}`);
  };

  return (
    <div
      className={`${
        themePreference === "dark" ? "dark:bg-black dark:text-white" : ""
      } max-w-7xl flex flex-col h-screen`}
    >
      <HeaderComponent profilePicture={user?.photoURL || ""} />
      <div className="w-full ml-3">
        <div>
          <h1 className="text-xl font-semibold mt-2">Create your Banquet 🥂</h1>
        </div>
        <div className="mt-5 w-11/12">
          <h1 className="mb-2 text-base font-bold">Name of your Banquet</h1>
          <p className="font-semibold text-xs text-gray-500">
            Enter a captivating name for your exclusive banquet.{" "}
          </p>
        </div>
        <input
          onChange={(e) => setBanquetTitle(e.target.value)}
          value={banquetTitle}
          className={`${
            themePreference === "dark"
              ? "dark:text-white dark:border-2 dark:bg-black dark:border-white"
              : ""
          } w-11/12 mt-2 text-black border-2 px-3 text-sm rounded-lg border-black h-10`}
        />
        {titleError && (
          <p className="text-red-500 font-semibold text-sm mt-2">
            {titleError}
          </p>
        )}
        <div className="mt-5 w-11/12">
          <h1 className="mb-2 text-base font-bold">Add a description</h1>
          <p className="font-semibold text-xs text-gray-500">
            Write a compelling description that paints a vivid picture of what
            your banquet is all about. Let your guests know what to expect and
            why your event is a must-attend.
          </p>
        </div>
        <textarea
          onChange={(e) => setBanquetDescription(e.target.value)}
          value={banquetDescription}
          className={`${
            themePreference === "dark"
              ? "dark:text-white dark:border-2 dark:bg-black dark:border-white "
              : ""
          } w-11/12 mt-2 pt-2 text-black border-2 px-3 text-sm rounded-lg border-black h-44`}
        />
        {descriptionError && (
          <p className="text-red-500 font-semibold text-sm mt-2">
            {descriptionError}
          </p>
        )}
        <div className="mt-5 w-11/12">
          <h1 className="mb-2 text-base font-bold">Hashtags</h1>
          <p className="font-semibold text-xs text-gray-500">
            Use hashtags to categorize your banquet and make it easily
            discoverable.
          </p>
        </div>
        <input
          onChange={handleInputChange}
          value={hashtags}
          className={`${
            themePreference === "dark"
              ? "dark:text-white dark:border-2 dark:bg-black dark:border-white"
              : ""
          } w-11/12 mt-2 text-black border-2 px-3 text-sm rounded-lg border-black h-10`}
        />

        <div className="mt-5 w-11/12">
          <h1 className="mb-2 text-base font-bold">Passcode</h1>
          <p className="font-semibold text-xs text-gray-500">
            Set a secure passcode to ensure that only invited guests can join
            your private banquet.
          </p>
        </div>
        <input
          onChange={(e) => setBanquetPasscode(e.target.value)}
          value={banquetPasscode}
          className={`${
            themePreference === "dark"
              ? "dark:text-white dark:border-2 dark:bg-black dark:border-white"
              : ""
          } w-11/12 mt-2 text-black border-2 px-3 text-sm rounded-lg border-black h-10`}
        />
        {passcodeError && (
          <p className="text-red-500 text-sm mt-2">{passcodeError}</p>
        )}
        <div onClick={createBanquet} className="w-11/12 mt-5">
          <button
            className={`${
              themePreference === "dark" ? "dark:bg-white dark:text-black" : ""
            } w-full h-10 bg-black rounded-lg text-base font-bold text-white`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBanquet;
