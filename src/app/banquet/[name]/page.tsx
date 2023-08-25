"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import Link from "next/link";

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
    <div className="max-w-7xl h-full">
      <div className="flex items-center mt-3">
        <div className="flex items-start justify-center ml-3">
          <Link href="/discover">👈</Link>
        </div>
        <div className="w-full flex items-center justify-center">
          <p className="text-center">{modifiedPath}</p>
        </div>
        <div className="flex items-start justify-center mr-3">
          <Link href={`${modifiedPath}/settings`}>⚙️</Link>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
