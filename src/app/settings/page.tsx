"use client";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import SpinnerComponent from "@/components/SpinnerComponent";

const SettingsPage = () => {
  const [user, loading] = useAuthState(auth);

  return <div>hello world</div>;
};

export default SettingsPage;
