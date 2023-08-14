import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-7xl p-8 h-full">
      <div className="font-black text-2xl">👋 Welcome to Banquet</div>
      <div className="mt-5 font-semibold">
        Banquet is your ticket to a world of refined social connections and
        exclusive gatherings. Elevate your event experiences and forge
        meaningful connections with a community of like-minded individuals who
        share your passion for sophisticated interactions.
      </div>
      <div className="w-full">
        <div className="mt-5">
          <p>
            <span className="font-bold">⭐ Social Circle by Invitation:</span>{" "}
            Elevate your social circle through exclusive invitations from
            friends who are already a part of Banquet. Each connection adds a
            layer of authenticity and camaraderie to your experiences.
          </p>
        </div>
        <div className="mt-5">
          <p>
            <span className="font-bold">💬 Elegant Conversations:</span>
            {""} Engage in polished conversations that delve beyond the
            ordinary. Discuss art, philosophy, travel, and more with individuals
            who share your curiosity.
          </p>
        </div>
        <div className="mt-5">
          <p>
            <span className="font-bold">🔒 Exclusivity & Privacy:</span>{" "}
            Experience the exclusivity you deserve while safeguarding your
            privacy. Banquet's invite-only model ensures that your interactions
            remain among a community of like-minded individuals.
          </p>
        </div>
      </div>
      <div className="w-full mt-10">
        <Link href="/get-access">
          <button className="text-sm w-full py-3 font-black rounded-lg bg-black text-white">
            Get Access
          </button>
        </Link>
      </div>
    </main>
  );
}
