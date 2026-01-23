"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

interface PaymentButtonProps {
  orderId: string;
  onSuccess?: () => void;
  status: string;
}

export function PaymentButton({
  orderId,
  onSuccess,
  status,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create transaction");
      }

      const { token } = await response.json();

      window.snap.pay(token, {
        onSuccess: async () => {
          await fetch("/api/transaction/success", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId }),
          });
          toast.success("Pembayaran berhasil!");
          onSuccess?.();
          window.location.reload();
        },
        onPending: () => {
          toast.info("Menunggu pembayaran...");
        },
        onError: () => {
          toast.error("Pembayaran gagal");
        },
        onClose: () => {
          toast.info("Pembayaran dibatalkan");
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        error instanceof Error ? error.message : "Gagal memproses pembayaran"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant='outline'
      className='cursor-pointer'
      onClick={handlePayment}
      disabled={isLoading}>
      {isLoading
        ? "Memproses..."
        : status === "CREATED"
        ? "Bayar Sekarang"
        : "Lanjutkan Pembayaran"}
    </Button>
  );
}
