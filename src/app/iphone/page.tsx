"use client";
import { useState } from "react";
import IphoneCard from "../../components/iPhoneCard";
import { iPhones } from "@/data/iphones";
import timelineStyles from "@/components/scroll-timeline.module.css";
import DevicePage from "@/components/DevicePage";
import Image from "next/image";
import ScrollTimeline from "@/components/ScrollTimeline";

type MarkerOrPreviewProps = {
	id: string;
	image?: string;
};

function MarkerOrPreview({ id, image }: MarkerOrPreviewProps) {
	if (image) {
		return (
			<div className={timelineStyles.markerBox}>
				<Image
					src={image}
					alt={id}
					width={120}
					height={150}
					className={timelineStyles.previewImg}
				/>
			</div>
		);
	}

	return (
		<div className={timelineStyles.markerBox}>
			<div className={timelineStyles.marker} />
		</div>
	);
}

export default function Page() {
	const [openId, setOpenId] = useState<string | null>(null);

	return (
		<DevicePage>
			<ScrollTimeline>
				{iPhones.map((device) => (
					<div
						className={timelineStyles.item}
						key={device.id}
						role="listitem"
					>
						<button
							type="button"
							className={timelineStyles.itemButton}
							aria-expanded={openId === device.id}
							aria-controls={`popup-${device.id}`}
							onClick={() =>
								setOpenId(
									openId === device.id ? null : device.id
								)
							}
							aria-label={`Toggle ${device.name}`}
						>
							<MarkerOrPreview
								id={device.id}
								image={device.image}
							/>
							<span className={timelineStyles.label}>
								{device.name}
							</span>
						</button>

						<div
							id={`popup-${device.id}`}
							className={
								openId === device.id
									? `${timelineStyles.popup} ${timelineStyles.open}`
									: timelineStyles.popup
							}
							role="dialog"
							aria-hidden={openId !== device.id}
						>
							<div>
								<button
									type="button"
									className={timelineStyles.close}
									onClick={() => setOpenId(null)}
								>
									✕
								</button>
								<IphoneCard device={device} />
							</div>
						</div>
					</div>
				))}
			</ScrollTimeline>
		</DevicePage>
	);
}
