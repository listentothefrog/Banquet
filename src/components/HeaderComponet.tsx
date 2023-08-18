import React from "react";
import Image from "next/image";

interface HeaderComponentProfilePictureProps {
  profilePicture: string;
}

const HeaderComponent: React.FC<HeaderComponentProfilePictureProps> = ({
  profilePicture,
}) => {
  return (
    <header className="w-full h-14 mt-2">
      <div className="w-full flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">🚪{""}Banquet</p>
        </div>
        <div className="mr-7">
          <Image
            src={profilePicture}
            alt="User's profile picture"
            width={35}
            height={35}
            className="rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
