import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../../firebase";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const signInWithGoogle = (
  Provider: GoogleAuthProvider,
  router: AppRouterInstance
) => {
  signInWithRedirect(auth, Provider)
    .then(() => {
      router.push("/discover");
    })
    .catch(() => {
      return "An error occurred during sign in.";
    });
};

export const signInWithTwitter = (
  Provider: TwitterAuthProvider,
  router: AppRouterInstance
) => {
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
