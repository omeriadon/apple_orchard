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
	Brain,
	ShieldPlus,
	Circle,
	Aperture,
	Microscope,
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
	onPin?: () => void;
};

export default function IphoneCard({
	device,
	open,
	onClose,
	onPromote,
	zIndex,
	variant = "floating",
	onPin,
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
		{
			title: "Display Shield",
			value:
				device.displayShield === "ceramicShield" ? (
					<span className={styles.old}>Ceramic Shield</span>
				) : (
					<span>Ceramic Shield 2</span>
				),
			icon: ShieldPlus,
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
			value: `${device.videoPlaybackHours} hr`,
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
			title: "Action Button",
			value: !device.actionButton ? (
				<span className={styles.old}>No</span>
			) : (
				<div>Yes</div>
			),
			icon: Circle,
		},
		{
			title: "Apple Intelligence",
			value: device.appleIntelligence ? (
				<div>Yes</div>
			) : (
				<span className={styles.old}>No</span>
			),
			icon: Brain,
		},
		{
			title: "Cameras",
			value:
				device.amountOfCameras < 2 ? (
					<span className={styles.bad}>{device.amountOfCameras}</span>
				) : (
					<span>{device.amountOfCameras}</span>
				),
			icon: Aperture,
		},
		{
			title: "Camera Control",
			value: !device.cameraControl ? (
				<span className={styles.old}>No</span>
			) : (
				<span>Yes</span>
			),
			icon: Camera,
		},
		{
			title: "Macro",
			value: !device.macroPhotos ? (
				<span className={styles.bad}>No</span>
			) : (
				<span>Yes</span>
			),
			icon: Microscope,
		},
		{
			title: "Front Camera",
			value:
				device.frontCameraType == "12 MP" ? (
					<span className={styles.old}>12 MP</span>
				) : (
					<span>18 MP Center Stage</span>
				),
			icon: Microscope,
		},
		{
			title: "Front Camera",
			value:
				device.frontCameraType == "12 MP" ? (
					<span className={styles.old}>12 MP</span>
				) : (
					<span>18 MP Center Stage</span>
				),
			icon: Microscope,
		},
		{
			title: "Optical Zoom Options",
			value:
				device.opticalZoomOptions.length < 3 ? (
					<span className={styles.bad}>
						{device.opticalZoomOptions.join(", ")}
					</span>
				) : (
					<span>{device.opticalZoomOptions.join(", ")}</span>
				),
			icon: Microscope,
		},
		{
			title: "Camera Resolutions",
			value: device.cameraResolutions.includes(12) ? (
				<span className={styles.bad}>
					{device.cameraResolutions.join(" MP, ")} MP
				</span>
			) : (
				<span>{device.cameraResolutions.join(" MP, ")} MP</span>
			),
			icon: Microscope,
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
			onPin={onPin}
		/>
	);
}
