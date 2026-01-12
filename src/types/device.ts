import { z } from "zod";

export const DeviceSchema = z.object({
	id: z.string(),
	familyID: z.string(),
	name: z.string(),
	introduced: z.number().int(),
	supportedUntil: z.number().int(),
	// Optional image path (relative to /public). Use a string like '/images/iphones/17.png'
	image: z.string().optional(),
});

export type Device = z.infer<typeof DeviceSchema>;
