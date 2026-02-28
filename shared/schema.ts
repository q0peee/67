import { z } from "zod";

export const imageResponseSchema = z.object({
  url: z.string(),
  title: z.string(),
  source: z.string()
});

export type ImageResponse = z.infer<typeof imageResponseSchema>;

// Client-side implementation for GitHub Pages (no backend)
export async function fetchRandomCreepyImage(): Promise<ImageResponse> {
  const terms = [
    "vintage mugshot", "19th century prisoner", "historical crime scene",
    "abandoned asylum interior", "ruined building", "war ruins", "destroyed city",
    "victorian mourning portrait", "historical medical oddity", "vintage police photo"
  ];
  const randomTerm = terms[Math.floor(Math.random() * terms.length)];
  const url = `https://commons.wikimedia.org/w/api.php?origin=*&action=query&generator=search&gsrsearch=${encodeURIComponent(randomTerm)}&gsrnamespace=6&gsrlimit=30&prop=imageinfo&iiprop=url&format=json`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.query || !data.query.pages) {
    throw new Error("No images found");
  }

  const pages = Object.values(data.query.pages) as any[];
  const validPages = pages.filter(p => p.imageinfo && p.imageinfo[0] && p.imageinfo[0].url);

  if (validPages.length === 0) {
    throw new Error("No valid image URLs found");
  }

  const randomPage = validPages[Math.floor(Math.random() * validPages.length)];
  return {
    url: randomPage.imageinfo[0].url,
    title: randomPage.title.replace('File:', '').replace(/\.[^/.]+$/, ""),
    source: 'Wikimedia Commons'
  };
}
