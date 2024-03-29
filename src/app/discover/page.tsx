"use client";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Suspense, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import SpinnerComponent from "@/components/SpinnerComponent";

const BanquetCommunityCard = dynamic(
  () => import("@/components/BanquetCommunityCard"),
  {
    loading: () => {
      const SpinnerComponent = require("@/components/SpinnerComponent").default; // Import SpinnerComponent here
      return <SpinnerComponent />;
    },
    ssr: true,
  }
);
const HeaderComponent = dynamic(
  () => import("@/components/Navigation/HeaderComponent"),
  {
    ssr: false,
    loading: () => {
      const SpinnerComponent = require("@/components/SpinnerComponent").default; // Import SpinnerComponent here
      return <SpinnerComponent />;
    },
  }
);
const BottomNavigation = dynamic(
  () => import("@/components/Navigation/BottomNavigation"),
  {
    ssr: false,
    loading: () => {
      const SpinnerComponent = require("@/components/SpinnerComponent").default; // Import SpinnerComponent here
      return <SpinnerComponent />;
    },
  }
);

const Discover = () => {
  const router = useRouter();
  const [banquet, setBanquet] = useState([]);
  const [renderYourBanquet, setRenderYourBanquet] = useState(false);

  const [themePreference, setThemePreference] = useState(
    localStorage.getItem("themePreference") || "light"
  );

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
    const SpinnerComponent = require("@/components/SpinnerComponent").default;
    return <SpinnerComponent />;
  }
  if (!user) {
    router.push("/");
  }

  return (
    <div>
      <HeaderComponent profilePicture={user?.photoURL || ""} />
      <main
        className={`${
          themePreference === "dark" ? "dark:bg-black text-white" : ""
        } max-w-7xl h-screen`}
      >
        <div className="flex items-center justify-between w-11/12 ml-3 mb-5">
          <p
            onClick={() => setRenderYourBanquet(true)}
            className={`${
              renderYourBanquet
                ? "font-semibold text-base cursor-pointer"
                : "font-semibold text-base cursor-pointer opacity-50"
            }`}
          >
            Your Banquets 🥂
          </p>
          <p
            onClick={() => setRenderYourBanquet(false)}
            className={`${
              renderYourBanquet
                ? "font-semibold text-base cursor-pointer opacity-50"
                : "font-semibold text-base cursor-pointer"
            }`}
          >
            Popular Banquets 🥂
          </p>
        </div>
        {renderYourBanquet ? (
          <div>hello world</div>
        ) : (
          <div>
            <Suspense fallback={<SpinnerComponent />}>
              {banquet.map((data: any) => (
                <BanquetCommunityCard
                  key={data.id}
                  title={data.title}
                  description={data.description}
                  hashtags={data.hashtags}
                  passcode={data.passcode}
                />
              ))}
            </Suspense>
          </div>
        )}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Discover;
