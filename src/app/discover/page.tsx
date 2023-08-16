"use client";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Discover = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    router.push("/");
  }
  return (
    <div>
      Hello {user?.displayName}
      <button className="ml-2" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    </div>
  );
};

export default Discover;
