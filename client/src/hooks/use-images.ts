import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useRandomImage() {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: [api.images.random.path],
    queryFn: async () => {
      const res = await fetch(api.images.random.path, { credentials: "include" });
      if (!res.ok) {
        throw new Error('Something went wrong in the dark...');
      }
      const data = await res.json();
      return api.images.random.responses[200].parse(data);
    },
    // Refetch every 15 seconds to keep the unsettling vibe going automatically
    refetchInterval: 15000,
    // Ensure we don't spam if they leave the tab, but keep it feeling alive
    refetchOnWindowFocus: true,
  });
}

export function useTriggerNextImage() {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.invalidateQueries({ queryKey: [api.images.random.path] });
  };
}
