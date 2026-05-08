"use client";

import { useRouter } from "next/navigation";
import type { Service } from "@/app/generated/prisma/client";

export default function RequestButton({
  service,
  isLoggedIn,
}: {
  service: Service;
  isLoggedIn: boolean;
}) {
  const router = useRouter();

  const handleClick = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    router.push(`/dashboard/nuova-richiesta?serviceId=${service.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
    >
      Richiedi
    </button>
  );
}
