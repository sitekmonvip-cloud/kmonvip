"use client";

import { useEffect } from "react";
import { captureAttributionOnce } from "@/lib/tracking/attribution";

/** Mounted once in the root locale layout — captures first-touch UTM/gclid/fbclid/referrer. */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttributionOnce();
  }, []);

  return null;
}
