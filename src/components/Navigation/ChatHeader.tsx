import Link from "next/link";
import React, { FC } from "react";
interface ChatHeaderProps {
  banquetTitle: string;
}

const ChatHeader: FC<ChatHeaderProps> = ({ banquetTitle }) => {
  return (
    <div className="flex items-center mt-3">
      <div className="flex items-start justify-center ml-3">
        <Link href="/discover">👈</Link>
      </div>
      <div className="w-full flex items-center justify-center">
        <p className="text-center font-bold text-base">{banquetTitle}</p>
      </div>
      <div className="flex items-start justify-center mr-3">
        <Link href={`${banquetTitle}/settings`}>⚙️</Link>
      </div>
    </div>
  );
};

export default ChatHeader;
