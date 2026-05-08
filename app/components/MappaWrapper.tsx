"use client";

import dynamic from "next/dynamic";
import type { AppuntamentoPin } from "./MappaAppuntamenti";

const MappaAppuntamenti = dynamic(() => import("./MappaAppuntamenti"), { ssr: false });

export default function MappaWrapper({ appuntamenti }: { appuntamenti: AppuntamentoPin[] }) {
  return <MappaAppuntamenti appuntamenti={appuntamenti} />;
}
