import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderComponentProfilePictureProps {
  profilePicture: string;
}

const HeaderComponent: React.FC<HeaderComponentProfilePictureProps> = ({
  profilePicture,
}) => {
  const [themePreference, setThemePreference] = useState(
    localStorage.getItem("themePreference") || "light"
  );
  return (
    <header
      className={`${
        themePreference === "dark" ? "dark:bg-black dark:text-white" : ""
      } w-full h-14`}
    >
      <div className="w-full flex items-center justify-between">
        <div className="mt-2">
          <Link href="/discover">
            <p className="text-3xl font-bold">🚪{""}Banquet</p>
          </Link>
        </div>
        <Link href="/settings">
          <div className="mr-7 mt-2">
            <Image
              src={profilePicture}
              alt="User's profile picture"
              width={35}
              height={35}
              className="rounded-full"
            />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default HeaderComponent;
