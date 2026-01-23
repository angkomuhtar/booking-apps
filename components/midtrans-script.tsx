"use client";

import Script from "next/script";

const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
const MIDTRANS_IS_PRODUCTION =
  process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true";

export function MidtransScript() {
  const snapUrl = MIDTRANS_IS_PRODUCTION
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";

  return (
    <Script
      src={snapUrl}
      data-client-key={MIDTRANS_CLIENT_KEY}
      strategy='lazyOnload'
    />
  );
}
