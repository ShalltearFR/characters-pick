import { getUser } from "@/lib/auth.session";
import SignIn from "./SignIn";

export default async function LoginPage() {
  const user = await getUser();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignIn user={user} />
    </div>
  );
}
