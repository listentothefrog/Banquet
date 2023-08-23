import Link from "next/link";
import React, { useState } from "react";

const BottomNavigation = () => {
  const [themePreference, setThemePreference] = useState(
    localStorage.getItem("themePreference") || "light"
  );
  return (
    <div
      className={`${
        themePreference === "dark"
          ? "dark:border-2 dark:border-t-white dark:bg-black dark:text-white"
          : ""
      } fixed bottom-0 w-full px-3 border-2 border-t-black flex items-center justify-between h-16`}
    >
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
