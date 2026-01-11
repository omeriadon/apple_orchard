import { z } from "zod";

export const DeviceSchema = z.object({
	id: z.string(),
	familyID: z.string(),
	name: z.string(),
	introduced: z.number().int(),
	supportedUntil: z.number().int(),
});
