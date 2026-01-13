import { z } from "zod";
import { DeviceSchema } from "./device";

export const iPhoneSchema = DeviceSchema.extend({
	maxBrightness: z.number().int(),
	screenSize: z.number(),
	proMotion: z.boolean(),

	topStructure: z.enum(["none", "notch", "dynamicIsland"]),

	processor: z.string(),
	ram: z.number().int(),
	baseStorage: z.number().int(),

	portType: z.enum(["lightning", "usbC"]),
	magsafe: z.boolean(),

	authentication: z.enum(["faceID", "touchID"]),

	batteryMah: z.number().int(),

	amountOfCameras: z.number().int().min(1).max(3),
});

export type iPhone = z.infer<typeof iPhoneSchema>;
