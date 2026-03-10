import { Order, OrderItem, Venue } from "@prisma/client";

export type OrderWithItems = Order & {
  venue: Venue;
  items: OrderItem[];
};
