import { z } from "zod";

export const imageResponseSchema = z.object({
  url: z.string(),
  title: z.string(),
  source: z.string()
});

export type ImageResponse = z.infer<typeof imageResponseSchema>;
