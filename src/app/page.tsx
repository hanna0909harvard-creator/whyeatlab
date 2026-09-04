import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const cookieStore = await cookies();
  const hasCompletedIntro = cookieStore.get("intro_completed")?.value === "1";
  redirect(hasCompletedIntro ? "/home" : "/intro");
}
