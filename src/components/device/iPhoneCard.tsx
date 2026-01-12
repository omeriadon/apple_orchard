import DeviceCard from "../DeviceCard/DeviceCard";
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
import type { DeviceCardRowProps } from "../DeviceCardRow/DeviceCardRow";
import styles from "@/components/DeviceCardRow/deviceCardRow.module.css";

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
			value: (() => {
				if (device.maxBrightness < 3000) {
					return (
						<span className={styles.old}>
							{device.maxBrightness} nits
						</span>
					);
				}
				return <span>{device.maxBrightness} nits</span>;
			})(),
			icon: Sun,
		},
		{
			title: "Display Type",
			value: (() => {
				switch (device.proMotion) {
					case false:
						return <span className={styles.old}>60hz</span>;

					case true:
						return <div>ProMotion</div>;
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
			value: (() => {
				if (device.ram < 8) {
					return <span className={styles.old}>{device.ram} GB</span>;
				}
				return <span>{device.ram} GB</span>;
			})(),
			icon: MemoryStick,
		},
		{
			title: "Storage",
			value: (() => {
				if (device.baseStorage < 256) {
					return (
						<span className={styles.old}>
							{device.baseStorage} GB
						</span>
					);
				}
				return <span>{device.baseStorage} GB</span>;
			})(),
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
						return <span className={styles.old}>Lightning</span>;

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
						return <span className={styles.old}>Touch ID</span>;
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
