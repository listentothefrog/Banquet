"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import HeaderComponent from "@/components/Navigation/HeaderComponent";
import Popup from "reactjs-popup";
import "../../components/Modal.css";

const SettingsPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
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
    const SpinnerComponent = require("@/components/SpinnerComponent").default; // Import SpinnerComponent here
    return <SpinnerComponent />;
  }

  if (!user) {
    router.push("/");
  }

  return (
    <div
      className={`${
        themePreference === "dark" ? "dark:bg-black text-white" : "light-theme"
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
              <span className="text-lg cursor-pointer">
                🌙 Dark Theme <span className="text-sm">(Comming Soon)</span>
              </span>
              <p className="text-sm text-gray-500 ml-2">
                Dive into the dark abyss! Perfect for night owls.
              </p>
            </div>
            <div className="flex cursor-pointer items-end">
              <input
                type="radio"
                value="dark"
                disabled
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
            onClick={() =>
              import("@/functions/authFunctions").then((module) => {
                module.signOut();
              })
            }
            className={`${
              themePreference === "dark" ? "border-white text-white" : ""
            } mt-3 font-semibold w-full px-4 py-2 border-2 border-black text-black rounded-lg`}
          >
            Sign Out
          </button>
          <Popup
            trigger={
              <button
                className={`${
                  themePreference === "dark"
                    ? "dark:bg-white dark:text-black"
                    : ""
                } mt-3 font-semibold w-full px-4 py-2 bg-black text-white rounded-lg`}
              >
                Delete Account
              </button>
            }
            modal
            nested
          >
            {(close) => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header">Warning: Deleting Account</div>
                <div className="content font-semibold">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                  <p className="text-red-500 mt-2 font-semibold">
                    Warning: Deleting your account will also delete all the
                    banquets you've created and joined.
                  </p>
                </div>
                <div className="actions">
                  <button
                    className="font-semibold w-full bg-black text-white h-10 rounded-lg"
                    onClick={() => {
                      close();
                    }}
                  >
                    Delete Account
                  </button>
                  <p className="text-red-500 text-center">{errorMessage}</p>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
