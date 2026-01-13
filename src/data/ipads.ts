import { iPad } from "@/types/ipad";

const _iPads: iPad[] = [
	//MARK: - 17
	{
		id: "air13M3",
		familyID: "2025",
		name: 'iPad Air 13" (M3)',
		introduced: 2025,
		supportedUntil: 2031,
		maxBrightness: 3000,
		screenSize: 6.9,
		proMotion: true,
		topStructure: "homeButton",
		processor: "A19 Pro",
		ram: 12,
		baseStorage: 256,
		portType: "usbC",
		authentication: "faceID",
		amountOfCameras: 3,
		batteryMah: 5088,
		appleIntelligence: false,
	},
];

export const iPads = _iPads.reverse();
