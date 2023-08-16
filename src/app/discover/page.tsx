"use client";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

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
    <div className="max-w-7xl h-full">
      <header className="w-full h-14 mt-2">
        <div className="w-full flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">🚪{""}Banquet</p>
          </div>
          <div className="mr-7">
            <Image
              src={user?.photoURL}
              alt="User's profile picture"
              width={35}
              height={35}
              className="rounded-full"
            />
          </div>
        </div>
      </header>
      <main className="max-w-7xl h-full">
        <button onClick={() => auth.signOut()}>Sign out</button>
      </main>
    </div>
  );
};

export default Discover;
