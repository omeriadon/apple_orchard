import { z } from "zod";
import { DeviceSchema } from "./device";

export const iPadSchema = DeviceSchema.extend({
	maxBrightness: z.number().int(),
	screenSize: z.number(),
	proMotion: z.boolean(),

	topStructure: z.enum(["homeButton", "none"]),

	processor: z.string(),
	ram: z.number().int(),
	baseStorage: z.number().int(),

	portType: z.enum(["lightning", "usbC"]),

	authentication: z.enum(["faceID", "touchID", "passcode"]),

	batteryMah: z.number().int().optional(),
});

export type iPad = z.infer<typeof iPadSchema>;
