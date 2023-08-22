"use client";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import BanquetCommunityCard from "@/components/BanquetCommunityCard";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import HeaderComponent from "@/components/Navigation/HeaderComponent";
import BottomNavigation from "@/components/Navigation/BottomNavigation";

const Discover = () => {
  const router = useRouter();
  const [banquet, setBanquet] = useState([]);
  const [renderYourBanquet, setRenderYourBanquet] = useState(false);

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
        <div className="flex items-center justify-between w-11/12 ml-3 mt-2 mb-5">
          <p
            onClick={() => setRenderYourBanquet(true)}
            className="font-semibold text-base cursor-pointer"
          >
            Your Banquets 🥂
          </p>
          <p
            onClick={() => setRenderYourBanquet(false)}
            className="font-semibold text-base cursor-pointer"
          >
            Popular Banquets 🥂
          </p>
        </div>
        {renderYourBanquet ? (
          <div className="">hello world</div>
        ) : (
          <div className="">
            {banquet.map((data: any) => (
              <BanquetCommunityCard
                key={data.id}
                title={data.title}
                description={data.description}
                hashtags={data.hashtags}
                passcode={data.passcode}
              />
            ))}
          </div>
        )}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Discover;
