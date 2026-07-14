"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PracticePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/practice/openings");
  }, [router]);

  return null;
}
