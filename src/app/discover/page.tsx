"use client";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import BanquetCommunityCard from "@/components/BanquetCommunityCard";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import HeaderComponent from "@/components/HeaderComponet";

const Discover = () => {
  const router = useRouter();
  const [banquet, setBanquet] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const banquet: any = await getDocs(collection(db, "Banquet"));
      setBanquet(
        banquet.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getData();
  }, []);

  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    router.push("/");
  }
  return (
    <div className="max-w-7xl h-full">
      <HeaderComponent profilePicture={user?.photoURL || ""} />
      <main className="max-w-7xl h-full">
        <div className="ml-3 mt-2 mb-5">
          <p className="font-semibold text-xl">Popular Banquets 🥂</p>
        </div>
        {banquet.map((data: any) => (
          <BanquetCommunityCard
            title={data.title}
            description={data.description}
            hashtags={data.hashtags}
            passcode={data.passcode}
          />
        ))}

        <button onClick={() => auth.signOut()}>Sign out</button>
      </main>
    </div>
  );
};

export default Discover;
