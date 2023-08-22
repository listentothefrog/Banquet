import Link from "next/link";
import React from "react";

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 w-full px-3 border-2 border-t-black flex items-center justify-between h-16">
      <div className="flex flex-col items-center">
        <Link href={"/discover"}>
          <p className="text-xl text-center">🧭</p>
          <p className="text-base font-semibold">Discover</p>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <Link href={"/create"}>
          <p className="text-xl text-center">🌟</p>
          <p className="text-base font-semibold">Create</p>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <Link href={"/invite"}>
          <p className="text-xl text-center">🔗</p>
          <p className="text-base font-semibold">Invite</p>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
