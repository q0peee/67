import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchRandomCreepyImage } from "@shared/schema";

export function useRandomImage() {
  return useQuery({
    queryKey: ["/api/images/random"],
    queryFn: fetchRandomCreepyImage,
    // Refetch every 15 seconds to keep the unsettling vibe going automatically
    refetchInterval: 15000,
    // Ensure we don't spam if they leave the tab, but keep it feeling alive
    refetchOnWindowFocus: true,
  });
}

export function useTriggerNextImage() {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.invalidateQueries({ queryKey: ["/api/images/random"] });
  };
}
