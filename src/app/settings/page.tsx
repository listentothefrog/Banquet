"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import HeaderComponent from "@/components/Navigation/HeaderComponent";
import SpinnerComponent from "@/components/SpinnerComponent";
import Popup from "reactjs-popup";

const SettingsPage = () => {
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
    <div className="max-w-7xl flex flex-col">
      <HeaderComponent profilePicture={user?.photoURL || ""} />
      <div className="mt-6 ml-3">
        <h1 className="text-2xl font-bold">Account Settings</h1>
      </div>
      <div className="w-11/12 mt-8 ml-3">
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
          <p className="font-semibold text-lg text-red-500">Danger Zone ⚠️</p>
        </div>
        <div className="mt-2">
          <button
            onClick={signOut}
            className="font-semibold w-full px-4 py-2 border-2 border-black rounded-lg"
          >
            Sign Out
          </button>
          <button className="mt-3 font-semibold w-full px-4 py-2 bg-black text-white rounded-lg">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
