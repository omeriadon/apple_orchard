import { iPad } from "@/types/ipad";

const _iPads: iPad[] = [
	//MARK: - 17
	{
		id: "17ProMax",
		familyID: "17",
		name: "iPhone 17 Pro Max",
		introduced: 2025,
		supportedUntil: 2033,
		maxBrightness: 3000,
		screenSizes: [6.9, 7, 8],
		proMotion: true,
		topStructure: "homeButton",
		processor: "A19 Pro",
		ram: 12,
		baseStorage: 256,
		portType: "usbC",
		authentication: "faceID",
		amountOfCameras: 3,
		batteryMah: 5088,
		appleIntelligence: false
	},
];

export const iPads = _iPads.reverse();
