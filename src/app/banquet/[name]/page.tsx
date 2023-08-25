"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";

const CommunityPage = () => {
  const pathname = usePathname();
  const modifiedPath = pathname.replace(/^\/banquet\//, "");

  useEffect(() => {
    const fetchChats = async () => {
      if (pathname) {
        const banquetDocRef = doc(db, "Banquet", modifiedPath);
        const chatsCollectionRef = collection(banquetDocRef, "chats");
        const querySnapshot = await getDocs(chatsCollectionRef);
        querySnapshot.forEach((doc) => {
          console.log("Document ID:", doc.id);
          console.log("Document Data:", doc.data());
        });
      }
    };
    fetchChats();
  }, [pathname]);

  return <div className="max-w-7xl">hello world</div>;
};

export default CommunityPage;
