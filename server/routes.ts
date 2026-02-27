import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.get(api.images.random.path, async (req, res) => {
    try {
      // A curated list of creepy/unsettling search terms for Wikimedia Commons
      const terms = [
        "vintage portrait", "gargoyle", "creepy doll", "catacombs", "skull", "victorian mourning",
        "plague doctor", "creepy mask", "cemetery statue", "weird face", "ghost",
        "abandoned asylum interior", "abandoned prison", "ruined building", "war ruins", "destroyed city"
      ];
      const randomTerm = terms[Math.floor(Math.random() * terms.length)];

      // Fetch from Wikimedia Commons API
      const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(randomTerm)}&gsrnamespace=6&gsrlimit=30&prop=imageinfo&iiprop=url&format=json`;

      const response = await fetch(url, {
        headers: { 'User-Agent': 'CreepyApp/1.0 (https://replit.com)' }
      });
      const data = await response.json();

      if (!data.query || !data.query.pages) {
        throw new Error("No images found");
      }

      const pages = Object.values(data.query.pages) as any[];
      // Filter out pages that might not have images
      const validPages = pages.filter(p => p.imageinfo && p.imageinfo[0] && p.imageinfo[0].url);

      if (validPages.length === 0) {
        throw new Error("No valid image URLs found");
      }

      const randomPage = validPages[Math.floor(Math.random() * validPages.length)];
      const imageUrl = randomPage.imageinfo[0].url;

      res.json({
        url: imageUrl,
        title: randomPage.title.replace('File:', '').replace(/\.[^/.]+$/, ""), // clean up title
        source: 'Wikimedia Commons'
      });
    } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).json({ message: "Failed to fetch creepy image" });
    }
  });

  return httpServer;
}
