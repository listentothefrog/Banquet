"use client";
import { useRouter } from "next/navigation";
import Google from "../../../public/Google.png";
import Twitter from "../../../public/Twitter.png";
import Image from "next/image";
import { auth } from "../../../firebase";
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import SpinnerComponent from "@/components/SpinnerComponent";

const GoogleProvider = new GoogleAuthProvider();
const TwitterProvider = new TwitterAuthProvider();

const GetAccess = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  if (loading) {
    return <SpinnerComponent />;
  }
  if (user) {
    router.push("/discover");
  }

  const signInWithGoogle = () => {
    signInWithRedirect(auth, GoogleProvider)
      .then((result: any) => {
        router.push("/discover");
      })
      .catch(() => {
        setErrorMessage("An error occurred during sign-in");
      });
  };

  const signInWithTwitter = () => {
    signInWithRedirect(auth, TwitterProvider)
      .then((result: any) => {
        router.push("/discover");
      })
      .catch(() => {
        setErrorMessage("An error occurred during sign-in");
      });
  };

  return (
    <main className="max-w-7xl p-8 h-full">
      <div className="font-black text-3xl">🔐 Get Access</div>
      <div className="mt-5 font-semibold">
        Here, conversations are laced with intellectual curiosity, and
        connections are woven with the threads of shared interests. Engage with
        like-minded individuals who appreciate the subtleties, the nuances, and
        the exquisite layers that life has to offer. In the realm of Banquet,
        the ordinary is transformed into the extraordinary. Discover an
        exclusive gathering of individuals who appreciate the subtle symphonies
        of art, the intricate flavors of cuisine, and the depth of cultural
        exploration.
      </div>
      <div className="w-full mt-10">
        <button
          onClick={signInWithGoogle}
          className=" font-extrabold h-12 w-full border-black border-2 rounded-lg flex items-center justify-center"
        >
          <span className="mr-2">
            <Image src={Google} alt="Google Icon" width={20} />
          </span>
          Login with Google
        </button>

        <button
          onClick={signInWithTwitter}
          className=" font-extrabold h-12 w-full border-black border-2 rounded-lg flex items-center justify-center mt-5"
        >
          <span className="mr-2">
            <Image src={Twitter} alt="Google Icon" width={20} />
          </span>
          Login With Twitter
        </button>
        <div className="mt-2 flex items-center justify-center">
          <p className="text-red-500 font-bold text-sm">{errorMessage}</p>
        </div>
      </div>
      <div className="mt-10 text-sm">
        By logging in you accept our{" "}
        <span className="font-bold">Privacy Policy</span> and{" "}
        <span className="font-bold">Terms of Service</span>
      </div>
    </main>
  );
};

export default GetAccess;
