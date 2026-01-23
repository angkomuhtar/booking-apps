declare module "midtrans-client" {
  interface SnapOptions {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  interface TransactionDetails {
    order_id: string;
    gross_amount: number;
  }

  interface ItemDetails {
    id: string;
    price: number;
    quantity: number;
    name: string;
  }

  interface CustomerDetails {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  }

  interface TransactionParameter {
    transaction_details: TransactionDetails;
    item_details?: ItemDetails[];
    customer_details?: CustomerDetails;
    callbacks?: {
      finish?: string;
    };
  }

  interface NotificationResponse {
    order_id: string;
    transaction_status: string;
    fraud_status: string;
    payment_type: string;
    transaction_id: string;
    gross_amount: string;
  }

  class Snap {
    constructor(options: SnapOptions);
    createTransaction(
      parameter: TransactionParameter
    ): Promise<{ token: string; redirect_url: string }>;
    transaction: {
      notification(notificationJson: unknown): Promise<NotificationResponse>;
    };
  }

  const midtrans: {
    Snap: typeof Snap;
  };

  export = midtrans;
}
