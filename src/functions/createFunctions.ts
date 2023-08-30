import {
  setDoc,
  doc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const EMOJI_REGEX = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

export const createBanquet = async (
  banquetTitle: string,
  banquetDescription: string,
  banquetPasscode: string,
  hashtagsArray: any,
  user: any,
  setTitleError: any,
  setDescriptionError: any,
  setPasscodeError: any,
  router: AppRouterInstance
) => {
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

  if (EMOJI_REGEX.test(banquetTitle)) {
    setTitleError("Emojis are not allowed in the title");
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

export const sendMessage = async (
  modifiedPath: string,
  userText: string,
  user: any,
  setUserText: any
) => {
  const banquetDocRef = doc(db, "Banquet", modifiedPath);
  const chatsCollectionRef = collection(banquetDocRef, "chats");

  if (userText.length > 0 && userText.length < 300) {
    await addDoc(chatsCollectionRef, {
      sender: user?.displayName,
      uid: user?.uid,
      photoURL: user?.photoURL,
      text: userText,
      createdAt: serverTimestamp(),
    });
    setUserText("");
  } else {
    return;
  }
};
