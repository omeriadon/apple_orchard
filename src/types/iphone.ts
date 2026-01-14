import { z } from "zod";
import { DeviceSchema } from "./device";

export const PriceBaseSchema = z.object({
	new: z.number().int().min(0),
	refurbished: z.number().int().min(0).optional(),
	storage: z.record(z.number().int(), z.number().int()),
});

export const RegionMultiplierSchema = z.object({
	multiplier: z.number().positive(),
	currency: z.string().optional(),
});

export const PricingSchema = z.object({
	base: PriceBaseSchema,
});

export type Pricing = z.infer<typeof PricingSchema>;

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

	videoPlaybackHours: z.number().int(),

	amountOfCameras: z.number().int().min(1).max(3),
	cameraControl: z.boolean(),
	macroPhotos: z.boolean(),
	frontCameraType: z.enum(["12 MP", "18 MP Center Stage"]),
	opticalZoomOptions: z.number().int().array(),
	cameraResolutions: z.number().int().array(),

	appleIntelligence: z.boolean(),

	pricing: PricingSchema.optional(),
});

export type iPhone = z.infer<typeof iPhoneSchema>;
