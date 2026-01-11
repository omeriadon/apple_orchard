import { z } from "zod";

const ProductSchema = z.object({
	id: z.string(),
	name: z.string(),
	introduced: z.number().int(),
	deprecated: z.number().int().optional(),

	maxBrightness: z.number().int(),
	screenSize: z.number(),
	proMotion: z.boolean(),

	topStructure: z.enum(["none", "notch", "dynamicIsland"]),

	processor: z.string(),
	ram: z.number().int(),

	batteryMah: z.number().int().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
