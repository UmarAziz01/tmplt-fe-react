import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Cache valid selama 5 menit
      gcTime: 1000 * 60 * 10, // Hapus cache yang tidak dipakai setelah 10 menit
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
