import Layout from "@/components/Layout";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{session?.user?.email}</b>
        </h2>
        <div className="flex bg-gray-200 text-black gap-1 rounded-lg overflow-hidden">
          <img src={session.user.image} alt="user image" className="w-6 h-6 " />
          <span className=" px-2">
            <b>{session.user.name}</b>
          </span>
        </div>
      </div>
    </Layout>
  );
  
}
