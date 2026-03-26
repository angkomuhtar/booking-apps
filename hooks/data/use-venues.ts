import {
  getVenueById,
  getVenueCourts,
  getAllVenues,
  getVenueProduct,
} from "@/lib/actions/venue";
import { useQuery } from "@tanstack/react-query";

export function useVenues() {
  return useQuery({
    queryKey: ["venues"],
    queryFn: () => getAllVenues(),
  });
}

export function useVenue(id: string) {
  return useQuery({
    queryKey: ["venue", id],
    queryFn: () => getVenueById(id),
    enabled: !!id,
  });
}

export function useCourts(venueId: string) {
  return useQuery({
    queryKey: ["courts", venueId],
    queryFn: () => getVenueCourts(venueId),
    enabled: !!venueId,
  });
}

export function useGetProducts(venueId: string) {
  return useQuery({
    queryKey: ["products", venueId],
    queryFn: () => getVenueProduct(venueId),
    enabled: !!venueId,
  });
}
