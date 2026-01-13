import { z } from "zod";
import { DeviceSchema } from "./device";

export const iPhoneSchema = DeviceSchema.extend({
	maxBrightness: z.number().int(),
	screenSize: z.number(),
	proMotion: z.boolean(),
	displayShield: z.enum(["ceramicShield", "ceramicShield2"]),

	topStructure: z.enum(["notch", "dynamicIsland"]),

	processor: z.string(),
	ram: z.number().int(),
	baseStorage: z.number().int(),

	portType: z.enum(["lightning", "usbC"]),
	magsafe: z.boolean(),
	actionButton: z.boolean(),

	authentication: z.enum(["faceID", "touchID"]),

	videoPlaybackHours: z.number().int(),

	amountOfCameras: z.number().int().min(1).max(3),
	cameraControl: z.boolean(),
	macroPhotos: z.boolean(),
	frontCameraType: z.enum(["12 MP", "18 MP Center Stage"]),
	opticalZoomOptions: z.number().int().array(),
	cameraResolutions: z.number().int().array(),

	appleIntelligence: z.boolean(),
});

export type iPhone = z.infer<typeof iPhoneSchema>;
