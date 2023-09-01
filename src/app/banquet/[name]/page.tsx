"use client";

import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../../../../firebase";
const ChatHeader = dynamic(() => import("@/components/Navigation/ChatHeader"), {
  loading: () => <SpinnerComponent />,
  ssr: false,
});
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import SpinnerComponent from "@/components/SpinnerComponent";
import Image from "next/image";
import dots from "../../../../public/3dots.png";

const CommunityPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const modifiedPath = pathname.replace(/^\/banquet\//, "");
  const [userText, setUserText] = useState("");
  const [banquetName, setBanquetName] = useState("");
  const [user] = useAuthState(auth);

  // if (!user) {
  //   router.push("/");
  // }

  const banquetDocRef = doc(db, "Banquet", modifiedPath);
  const chatsCollectionRef = collection(banquetDocRef, "chats");
  const q = query(chatsCollectionRef, orderBy("createdAt"), limit(25));

  const [messages] = useCollectionData(q);

  useEffect(() => {
    const checkMembership = async () => {
      const user = auth.currentUser;

      const banquetDocRef = doc(db, "Banquet", modifiedPath);
      const membersCollectionRef = collection(banquetDocRef, "members");

      const membersQuerySnapshot = await getDocs(membersCollectionRef);

      const userIsMember = membersQuerySnapshot.docs.some(
        (doc) => doc.data().uid === user?.uid
      );

      if (userIsMember) {
        return;
      } else {
        router.push("/discover");
      }
    };
    const fetchBanquetName = async () => {
      const banquetRef = doc(db, "Banquet", modifiedPath);
      const docSnapshot = await getDoc(banquetRef);
      if (docSnapshot.exists()) {
        setBanquetName(docSnapshot.data().title);
      }
    };
    checkMembership();
    fetchBanquetName();
  }, [pathname]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    import("@/functions/createFunctions").then((module) => {
      module.sendMessage(modifiedPath, userText, user, setUserText);
    });
  };

  return (
    <div className="max-w-7xl h-full">
      <Suspense fallback={<SpinnerComponent />}>
        <ChatHeader banquetTitle={banquetName} />
      </Suspense>

      <Suspense fallback={<SpinnerComponent />}>
        <div className="h-screen ml-4 mr-4 mt-3 max-w-7xl">
          {messages &&
            messages.map((chat: any, index) => (
              <div
                key={index}
                className={`flex items-center mt-2 ${
                  chat.uid === user?.uid ? "flex-row-reverse" : ""
                }`}
              >
                {chat.uid === user?.uid ? (
                  <div className="hover:ml-3 opacity-0 hover:opacity-100 hover:cursor-pointer text-gray-500">
                    <Image
                      src={dots}
                      width={18}
                      height={18}
                      alt="Chat settings"
                    />
                  </div>
                ) : (
                  ""
                )}
                {chat.uid !== user?.uid && (
                  <Image
                    className="mr-2 rounded-full"
                    src={chat.photoURL}
                    alt="Profile Picture"
                    width={32}
                    height={32}
                  />
                )}
                <p
                  className={`${
                    chat.uid === user?.uid ? "sent" : "received"
                  } p-2 rounded-lg ${
                    chat.uid === user?.uid
                      ? "bg-black text-white"
                      : "border-2 border-black text-black"
                  }`}
                >
                  {chat.text}
                </p>
                <div className="flex-grow"></div>
              </div>
            ))}
        </div>
      </Suspense>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 flex items-center w-full border-2 border-t-black h-16"
      >
        <input
          className="disabled:border-t-red-500 w-full bg-transparent text-black font-semibold px-4"
          placeholder="What's on your mind?"
          value={userText}
          disabled={userText.length < 0 && userText.length > 300}
          onChange={(e) => setUserText(e.target.value)}
        />
        <button
          className="mr-3 w-28 text-center bg-black font-semibold text-white h-8 rounded-lg"
          type="submit"
        >
          Send 💨
        </button>
      </form>
    </div>
  );
};

export default CommunityPage;
