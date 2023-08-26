"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import ChatHeader from "@/components/Navigation/ChatHeader";
import { useAuthState } from "react-firebase-hooks/auth";

const CommunityPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const modifiedPath = pathname.replace(/^\/banquet\//, "");
  const [chats, setChats] = useState([]);
  const [userText, setUserText] = useState("");
  const [banquetName, setBanquetName] = useState("");
  const [user] = useAuthState(auth);

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
    const fetchChats = () => {
      if (pathname) {
        const banquetDocRef = doc(db, "Banquet", modifiedPath);
        const chatsCollectionRef = collection(banquetDocRef, "chats");

        const unsubscribe = onSnapshot(chatsCollectionRef, (querySnapshot) => {
          const chatData: any = [];
          querySnapshot.forEach((doc) => {
            chatData.push(doc.data());
          });
          setChats(chatData);
        });

        return unsubscribe;
      }
    };
    checkMembership();
    fetchBanquetName();
    const unsubscribe: any = fetchChats();

    return () => {
      unsubscribe();
    };
  }, [pathname]);

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    const banquetDocRef = doc(db, "Banquet", modifiedPath);
    const chatsCollectionRef = collection(banquetDocRef, "chats");
    event.preventDefault();
    if (userText.length > 0 && userText.length < 300) {
      await addDoc(chatsCollectionRef, {
        sender: user?.displayName,
        uid: user?.uid,
        photoURL: user?.photoURL,
        text: userText,
      });
      setUserText("");
    } else {
      console.log("Cant send");
      return;
    }
  };
  return (
    <div className="max-w-7xl h-full">
      <ChatHeader banquetTitle={banquetName} />
      <div className="w-11/12 h-screen ml-4 mt-3">
        {chats.map((chat: any, index) => (
          <div key={index} className="chat">
            <p>{chat.text}</p>
          </div>
        ))}
      </div>
      <form
        onSubmit={sendMessage}
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
