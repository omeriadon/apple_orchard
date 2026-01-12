import DeviceCard from "../DeviceCard";
import { iPhone } from "@/types/iphone";
import {
	BatteryCharging,
	Camera,
	Cpu,
	Monitor,
	ScanFace,
	Plug,
	Sun,
	RefreshCcw,
	MemoryStick,
	HardDrive,
} from "lucide-react";
import type { DeviceCardRowProps } from "../DeviceCardRow";
import { DEVICE_CARD_ICON_SIZE } from "../DeviceCardRow";

export default function IphoneCard({
	device,
	onClose,
}: {
	device: iPhone;
	onClose?: () => void;
}) {
	const infoRows: DeviceCardRowProps[] = [
		{
			title: "Screen Size",
			value: `${device.screenSize}"`,
			icon: Monitor,
		},
		{
			title: "Brightness",
			value: `${device.maxBrightness} nits`,
			icon: Sun,
		},
		{
			title: "Display Type",
			value: (() => {
				switch (device.proMotion) {
					case false:
						return (
							<span>
								60hz{" "}
								<span
									style={{
										fontSize: "0.8rem",
										opacity: 0.5,
										textTransform: "uppercase",
										marginLeft: "0.2rem",
									}}
								>
									Old
								</span>
							</span>
						);

					case true:
						return <div>ProMotion</div>;

					default:
						return null;
				}
			})(),
			icon: RefreshCcw,
		},
		{
			title: "CPU",
			value: `${device.processor}`,
			icon: Cpu,
		},
		{
			title: "RAM",
			value: `${device.ram} GB`,
			icon: MemoryStick,
		},
		{
			title: "Storage",
			value: `${device.baseStorage} GB`,
			icon: HardDrive,
		},
		{
			title: "Battery",
			value: `${device.batteryMah} mAh`,
			icon: BatteryCharging,
		},
		{
			title: "Port",
			value: (() => {
				switch (device.portType) {
					case "lightning":
						return (
							<span>
								Lightning{" "}
								<span
									style={{
										fontSize: "0.8rem",
										opacity: 0.5,
										textTransform: "uppercase",
										marginLeft: "0.2rem",
									}}
								>
									Old
								</span>
							</span>
						);

					case "usbC":
						return <div>USB-C</div>;

					default:
						return null;
				}
			})(),
			icon: Plug,
		},
		{
			title: "Authentication",
			value: (() => {
				switch (device.authentication) {
					case "touchID":
						return (
							<span>
								Touch ID{" "}
								<span
									style={{
										fontSize: "0.8rem",
										opacity: 0.5,
										textTransform: "uppercase",
										marginLeft: "0.2rem",
									}}
								>
									Old
								</span>
							</span>
						);
					case "faceID":
						return <div>Face ID</div>;

					default:
						return null;
				}
			})(),
			icon: ScanFace,
		},
		{
			title: "Cameras",
			value: `${device.amountOfCameras}`,
			icon: Camera,
		},
	];

	return <DeviceCard device={device} infoRows={infoRows} onClose={onClose} />;
}
