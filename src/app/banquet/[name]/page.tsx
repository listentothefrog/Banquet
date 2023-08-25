"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";

const CommunityPage = () => {
  const pathname = usePathname();
  const modifiedPath = pathname.replace(/^\/banquet\//, "");
  const [chats, setChats] = useState([]);
  useEffect(() => {
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
    fetchChats();
  }, [pathname]);

  return (
    <div className="max-w-7xl">
      {chats.map((chat: any, index) => (
        <div key={index} className="chat">
          {/* Render chat content here */}
          <p>{chat.message}</p>
          <p>{chat.uid}</p>
        </div>
      ))}
    </div>
  );
};

export default CommunityPage;
