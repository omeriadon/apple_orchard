"use client";
import { useState } from "react";
import IphoneCard from "../../components/device/iPhoneCard";
import { iPhones } from "@/data/iphones";
import DevicePage from "@/components/DevicePage";
import devicePageStyles from "@/components/devicePage.module.css";
import Image from "next/image";

type MarkerOrPreviewProps = {
	id: string;
	image?: string;
};

function MarkerOrPreview({ id, image }: MarkerOrPreviewProps) {
	if (image) {
		return (
			<div className={devicePageStyles.markerBox}>
				<Image
					src={image}
					alt={id}
					width={120}
					height={150}
					className={devicePageStyles.previewImg}
				/>
			</div>
		);
	}

	return (
		<div className={devicePageStyles.markerBox}>
			<div className={devicePageStyles.marker} />
		</div>
	);
}

export default function Page() {
	const [openId, setOpenId] = useState<string | null>(null);

	return (
		<DevicePage useTimeline>
			{iPhones.map((device) => (
				<div
					className={devicePageStyles.item}
					key={device.id}
					role="listitem"
				>
					<button
						type="button"
						className={devicePageStyles.itemButton}
						aria-expanded={openId === device.id}
						aria-controls={`popup-${device.id}`}
						onClick={() =>
							setOpenId(openId === device.id ? null : device.id)
						}
						aria-label={`Toggle ${device.name}`}
					>
						<MarkerOrPreview id={device.id} image={device.image} />
						<span className={devicePageStyles.label}>
							{device.name}
						</span>
					</button>

					<div
						id={`popup-${device.id}`}
						className={
							openId === device.id
								? `${devicePageStyles.popup} ${devicePageStyles.open}`
								: devicePageStyles.popup
						}
						role="dialog"
						aria-hidden={openId !== device.id}
					>
						<IphoneCard
							device={device}
							onClose={() => setOpenId(null)}
						/>
					</div>
				</div>
			))}
		</DevicePage>
	);
}
