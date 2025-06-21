import Link from "next/link";

export default function Home() {
  return (
    <div className="text-xl ml-10 mt-10">
      <p className="mb-4 font-medium hover:underline hover:text-blue-500 hover:font-bold">
        <Link href={"/auth/login"}>Login</Link>
      </p>
      <p className="font-medium hover:underline hover:text-blue-500 hover:font-bold">
        <Link href="/dashboard/">Dashboard</Link>
      </p>
    </div>
  );
}
