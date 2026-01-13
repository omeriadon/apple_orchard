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

type Props = {
	device: iPhone;
	open: boolean;
	onClose?: () => void;
	onPromote?: () => void;
	zIndex?: number;
	variant?: "floating" | "pinned";
};

export default function IphoneCard({
	device,
	open,
	onClose,
	onPromote,
	zIndex,
	variant = "floating",
}: Props) {
	const infoRows: DeviceCardRowProps[] = [
		{ title: "Screen Size", value: `${device.screenSize}"`, icon: Monitor },
		{
			title: "Brightness",
			value:
				device.maxBrightness < 3000 ? (
					<span className={styles.old}>
						{device.maxBrightness} nits
					</span>
				) : (
					<span>{device.maxBrightness} nits</span>
				),
			icon: Sun,
		},
		{
			title: "Display Type",
			value: device.proMotion ? (
				<div>ProMotion</div>
			) : (
				<span className={styles.old}>60hz</span>
			),
			icon: RefreshCcw,
		},
		{ title: "CPU", value: device.processor, icon: Cpu },
		{
			title: "RAM",
			value:
				device.ram < 8 ? (
					<span className={styles.old}>{device.ram} GB</span>
				) : (
					<span>{device.ram} GB</span>
				),
			icon: MemoryStick,
		},
		{
			title: "Storage",
			value:
				device.baseStorage < 256 ? (
					<span className={styles.old}>{device.baseStorage} GB</span>
				) : (
					<span>{device.baseStorage} GB</span>
				),
			icon: HardDrive,
		},
		{
			title: "Battery",
			value: `${device.batteryMah} mAh`,
			icon: BatteryCharging,
		},
		{
			title: "Port",
			value:
				device.portType === "lightning" ? (
					<span className={styles.old}>Lightning</span>
				) : (
					<div>USB-C</div>
				),
			icon: Plug,
		},
		{
			title: "Authentication",
			value:
				device.authentication === "touchID" ? (
					<span className={styles.old}>Touch ID</span>
				) : (
					<div>Face ID</div>
				),
			icon: ScanFace,
		},
		{
			title: "Cameras",
			value:
				device.amountOfCameras < 2 ? (
					<span className={styles.bad}>{device.amountOfCameras}</span>
				) : (
					<span>{device.amountOfCameras}</span>
				),
			icon: Camera,
		},
	];

	return (
		<DeviceCard
			device={device}
			infoRows={infoRows}
			open={open}
			onClose={onClose}
			onPromote={onPromote}
			zIndex={zIndex}
			variant={variant}
		/>
	);
}
