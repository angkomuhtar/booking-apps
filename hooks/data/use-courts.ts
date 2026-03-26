import { getBookedSlots } from "@/lib/actions/court";
import { useQuery } from "@tanstack/react-query";

export function useGetBookedSlots(courtIds: string[], date: string) {
  return useQuery({
    queryKey: ["bookedSlots", courtIds, date],
    queryFn: () => getBookedSlots(courtIds, date),
    enabled: courtIds.length > 0 && !!date,
  });
}
