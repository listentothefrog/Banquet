"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import HeaderComponent from "@/components/Navigation/HeaderComponent";
import SpinnerComponent from "@/components/SpinnerComponent";

const SettingsPage = () => {
  const [themePreference, setThemePreference] = useState(
    localStorage.getItem("themePreference") || "light"
  );

  useEffect(() => {
    localStorage.setItem("themePreference", themePreference);
  }, [themePreference]);

  const handleThemeChange = (theme: any) => {
    setThemePreference(theme);
  };

  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <SpinnerComponent />;
  }

  if (!user) {
    auth.signOut();
    router.push("/");
  }

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div
      className={`${
        themePreference === "dark" ? "dark:bg-black text-white" : ""
      } max-w-7xl flex flex-col h-screen`}
    >
      <HeaderComponent profilePicture={user?.photoURL || ""} />
      <div className="mt-6 ml-3">
        <h1 className="text-2xl font-bold">Account Settings</h1>
      </div>
      <div className="w-11/12 mt-6 ml-3">
        <div className="mb-3">
          <p className="font-semibold text-lg">Name:</p>
        </div>
        <div className="mt-2">
          <input
            disabled
            className="w-full px-4 py-2 border-2 border-black rounded-lg"
            value={user?.displayName || ""}
          />
        </div>
      </div>
      <div className="w-11/12 mt-6 ml-3">
        <div className="mb-3">
          <p className="font-semibold text-lg">Email:</p>
        </div>
        <div className="mt-2">
          <input
            disabled
            className="w-full px-4 py-2 border-2 border-black rounded-lg"
            value={user?.email || ""}
          />
        </div>
      </div>
      <div className="w-11/12 mt-6 ml-3">
        <div className="mb-3">
          <p className="font-semibold text-lg">Signed In With:</p>
        </div>
        <div className="mt-2">
          <input
            disabled
            className="w-full px-4 py-2 border-2 border-black rounded-lg"
            value={user?.providerData[0]?.providerId || ""}
          />
        </div>
      </div>
      <div className="w-11/12 mt-6 ml-3">
        <div className="mb-3">
          <p className="text-2xl font-bold">Themes</p>
        </div>
        <div className="mt-2 space-y-2 w-full">
          <div
            className={`${
              themePreference === "dark" ? "border-white" : ""
            } px-2 flex items-center justify-between h-16 border-2 border-black rounded-lg`}
          >
            <div>
              <span className="text-lg cursor-pointer">☀️ Light Theme</span>
              <p className="text-sm text-gray-500 ml-2">
                Embrace the light side! Bright and refreshing.
              </p>
            </div>
            <div className="flex cursor-pointer items-end">
              <input
                type="radio"
                value="light"
                checked={themePreference === "light"}
                onChange={() => handleThemeChange("light")}
                className="mr-2 cursor-pointer"
              />
            </div>
          </div>
          <div
            className={`${
              themePreference === "dark" ? "border-white text-white" : ""
            } px-2 flex items-center justify-between text-black h-16 border-2 border-black rounded-lg`}
          >
            <div>
              <span className="text-lg cursor-pointer">🌙 Dark Theme</span>
              <p className="text-sm text-gray-500 ml-2">
                Dive into the dark abyss! Perfect for night owls.
              </p>
            </div>
            <div className="flex cursor-pointer items-end">
              <input
                type="radio"
                value="dark"
                checked={themePreference === "dark"}
                onChange={() => handleThemeChange("dark")}
                className="mr-2 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 mt-6 ml-3">
        <div className="mb-3">
          <p className="text-2xl font-bold text-red-500">Danger Zone ⚠️</p>
        </div>
        <div className="mt-2">
          <button
            onClick={signOut}
            className={`${
              themePreference === "dark" ? "border-white text-white" : ""
            } mt-3 font-semibold w-full px-4 py-2 border-2 border-black text-black rounded-lg`}
          >
            Sign Out
          </button>
          <button
            className={`${
              themePreference === "dark" ? "dark:bg-white dark:text-black" : ""
            } mt-3 font-semibold w-full px-4 py-2 bg-black text-white rounded-lg`}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
