"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const hasVisitedBefore =
      localStorage.getItem("whyeat_survey_done") === "true";
    router.replace(hasVisitedBefore ? "/home" : "/intro");
  }, [router]);

  return <div className="min-h-screen bg-cream" />;
}
