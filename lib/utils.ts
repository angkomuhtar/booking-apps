import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Court } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "CREATED":
      return { color: "bg-yellow-500", text: "Menunggu Pembayaran" };
    case "BOOKED":
      return { color: "bg-green-500", text: "Booked" };
    case "COMPLETED":
      return { color: "bg-blue-500", text: "Selesai" };
    case "CANCELLED":
      return { color: "bg-red-500", text: "Dibatalkan" };
    case "REFUNDED":
      return { color: "bg-gray-500", text: "Dikembalikan" };
    default:
      return { color: "bg-purple-500", text: "Diproses" };
  }
};

export const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const minutesToTime = (minutes: number) => {
  const hrs = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const mins = (minutes % 60).toString().padStart(2, "0");
  return `${hrs}:${mins}`;
};

export const generateTimeSlots = (
  court: Court,
  startTime?: string,
  endTime?: string,
  selectedDate?: string,
) => {
  const slots = [];
  const startHour = timeToMinutes(startTime || "06:00");
  const endHour = timeToMinutes(endTime || "23:00");
  const duration = court.sessionDuration;

  for (let hour = startHour; hour < endHour; hour += duration) {
    const slotStartTime = minutesToTime(hour);
    const slotEndTime = minutesToTime(hour + duration);
    if (timeToMinutes(slotEndTime) > endHour) break;

    slots.push({
      id: `${court.id}-${selectedDate}-${slotStartTime}-${slotEndTime}`,
      startTime: slotStartTime,
      endTime: slotEndTime,
      duration,
      price: court.pricePerHour,
    });
  }
  return slots;
};
