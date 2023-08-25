"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import ChatHeader from "@/components/Navigation/ChatHeader";

const CommunityPage = () => {
  const pathname = usePathname();
  const modifiedPath = pathname.replace(/^\/banquet\//, "");
  const [chats, setChats] = useState([]);
  const [banquetName, setBanquetName] = useState("");

  useEffect(() => {
    const fetchBanquetName = async () => {
      const banquetRef = doc(db, "Banquet", modifiedPath);
      const docSnapshot = await getDoc(banquetRef);
      if (docSnapshot.exists()) {
        setBanquetName(docSnapshot.data().title);
      }
    };
    const fetchChats = async () => {
      if (pathname) {
        const banquetDocRef = doc(db, "Banquet", modifiedPath);

        const chatsCollectionRef = collection(banquetDocRef, "chats");
        const querySnapshot = await getDocs(chatsCollectionRef);
        const chatData: any = [];
        querySnapshot.forEach((doc) => {
          chatData.push(doc.data());
        });
        setChats(chatData);
      }
    };
    fetchBanquetName();
    fetchChats();
  }, [pathname]);

  return (
    <div className="max-w-7xl h-full">
      <ChatHeader banquetTitle={banquetName} />
    </div>
  );
};

export default CommunityPage;
