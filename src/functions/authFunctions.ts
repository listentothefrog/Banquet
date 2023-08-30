import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import router from "next/router";
import { auth } from "../../firebase";

export const signInWithGoogle = (Provider: GoogleAuthProvider) => {
  signInWithRedirect(auth, Provider)
    .then(() => {
      router.push("/discover");
    })
    .catch(() => {
      return "An error occurred during sign in.";
    });
};

export const signInWithTwitter = (Provider: TwitterAuthProvider) => {
  signInWithRedirect(auth, Provider)
    .then((result: any) => {
      router.push("/discover");
    })
    .catch(() => {
      return "An error occurred during sign in.";
    });
};

export const signOut = () => {
  auth.signOut().catch(() => {
    return "An error during the signing out process.";
  });
};
