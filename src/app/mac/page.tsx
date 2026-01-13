"use client";
import { useState } from "react";
import MarkerOrPreview from "@/components/MarkerOrPreview/MarkerOrPreview";
import IphoneCard from "../../components/device/iPhoneCard";
import { iPhones } from "@/data/iphones";
import DevicePage from "@/components/DevicePage/DevicePage";
import styles from "@/components/DevicePage/devicePage.module.css";

export default function Page() {
	const [openId, setOpenId] = useState<string | null>(null);

	return (
		<DevicePage>
			{iPhones.map((device) => {
				const isOpen = openId === device.id;

				return (
					<div
						className={styles.item}
						key={device.id}
						role="listitem"
					>
						<button
							type="button"
							className={styles.itemButton}
							aria-expanded={isOpen}
							aria-controls={`popup-${device.id}`}
							onClick={() => setOpenId(isOpen ? null : device.id)}
							aria-label={`Toggle ${device.name}`}
						>
							<MarkerOrPreview
								id={device.id}
								familyID={device.familyID}
							/>
							<span className={styles.label}>{device.name}</span>
						</button>

						<IphoneCard
							device={device}
							onClose={() => setOpenId(null)}
							open={isOpen}
						/>
					</div>
				);
			})}
		</DevicePage>
	);
}
