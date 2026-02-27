// We don't need database storage for this app since it just serves stateless random images from an external API.
// This is a minimal stub to satisfy any potential imports.
export interface IStorage {}

export class MemStorage implements IStorage {
  constructor() {}
}

export const storage = new MemStorage();
