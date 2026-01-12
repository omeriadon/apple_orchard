import DeviceCard from "../DeviceCard";
import styles from "../deviceCard.module.css";
import { iPhone } from "@/types/iphone";

export default function IphoneCard({ device }: { device: iPhone }) {
	return (
		<DeviceCard device={device}>
			<div className={styles.grid}>
				<div>
					<strong>Screen</strong>
					<div>
						{device.screenSize}
						{"\u2033"} • {device.maxBrightness} nits •{" "}
						{device.proMotion ? "ProMotion" : "Standard"}
					</div>
				</div>

				<div>
					<strong>Performance</strong>
					<div>
						{device.processor} • {device.ram} GB RAM •{" "}
						{device.baseStorage} GB
					</div>
				</div>

				<div>
					<strong>Battery</strong>
					<div>{device.batteryMah} mAh</div>
				</div>

				<div>
					<strong>Port</strong>
					<div>
						{device.portType} •{" "}
						{device.magsafe ? "MagSafe" : "No MagSafe"}
					</div>
				</div>

				<div>
					<strong>Auth</strong>
					<div>{device.authentication}</div>
				</div>

				<div>
					<strong>Cameras</strong>
					<div>{device.amountOfCameras}</div>
				</div>
			</div>
		</DeviceCard>
	);
}
