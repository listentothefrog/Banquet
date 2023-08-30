import { doc, collection, setDoc } from "firebase/firestore";
import router from "next/router";
import { db } from "../../firebase";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const validPasscode = async (
  userInputPasscode: string,
  passcode: string,
  formattedTitle: string,
  user: any,
  setStatusMessage: any,
  router: AppRouterInstance
) => {
  if (userInputPasscode === passcode) {
    const docRef = doc(db, "Banquet", formattedTitle);
    const subCollectionRef = collection(docRef, "members");
    const subCollectionData = {
      uid: user?.uid,
      role: "Member",
      name: user?.displayName,
    };
    await setDoc(doc(subCollectionRef, user?.uid), subCollectionData);
    router.push(`banquet/${formattedTitle}`);
  } else {
    setStatusMessage("The passcode is invalid 🔒");
  }
};
