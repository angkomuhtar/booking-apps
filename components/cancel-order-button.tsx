"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cancelOrder } from "@/lib/actions/order";

interface CancelOrderButtonProps {
  orderId: string;
}

export function CancelOrderButton({ orderId }: CancelOrderButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = async () => {
    // toast("Memproses pembatalan order...", { id: "canceling" });
    setIsLoading(true);
    const result = await cancelOrder(orderId);
    setIsLoading(false);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Button
      variant='outline'
      className='cursor-pointer'
      onClick={handleCancel}
      disabled={isLoading}>
      {isLoading ? "Memproses..." : "Batalkan Order"}
    </Button>
  );
}
