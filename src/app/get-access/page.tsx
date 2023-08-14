import Google from "../../../public/Google.png";
import Twitter from "../../../public/Twitter.png";
import Apple from "../../../public/Apple.png";
import Image from "next/image";
import { auth } from "../../../firebase";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

const GoogleProvider = new GoogleAuthProvider();
const signInWithGoogle = () => {
  signInWithRedirect(auth, GoogleProvider)
    .then((result: any) => {
      const credential: any = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default function Home() {
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
        <button className=" font-extrabold h-12 w-full border-black border-2 rounded-lg flex items-center justify-center">
          <span className="mr-2">
            <Image src={Google} alt="Google Icon" width={20} />
          </span>
          Login with Google
        </button>

        <button className=" font-extrabold h-12 w-full border-black border-2 rounded-lg flex items-center justify-center mt-5">
          <span className="mr-2">
            <Image src={Twitter} alt="Google Icon" width={20} />
          </span>
          Login With Twitter
        </button>
        <button className=" font-extrabold h-12 w-full border-black border-2 rounded-lg flex items-center justify-center mt-5 ">
          <span className="mr-2">
            <Image src={Apple} alt="Google Icon" width={20} />
          </span>
          Login with Apple
        </button>
      </div>
      <div className="mt-5 text-sm">
        By logging in you accept our{" "}
        <span className="font-bold">Privacy Policy</span> and{" "}
        <span className="font-bold">Terms of Service</span>
      </div>
    </main>
  );
}
