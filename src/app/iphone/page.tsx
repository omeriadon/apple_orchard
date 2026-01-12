"use client";
import { useState } from "react";
import MarkerOrPreview from "@/components/MarkerOrPreview/MarkerOrPreview";
import IphoneCard from "../../components/device/iPhoneCard";
import { iPhones } from "@/data/iphones";
import DevicePage from "@/components/DevicePage/DevicePage";
import styles from "@/components/DevicePage/devicePage.module.css";

export default function Page() {
	const [activeId, setActiveId] = useState<string | null>(null);
	const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());

	return (
		<DevicePage useTimeline>
			{iPhones.map((device) => {
				const isOpen =
					activeId === device.id || pinnedIds.has(device.id);

				return (
					<div
						className={styles.item}
						key={device.id}
						role="listitem"
					>
						<button
							type="button"
							className={styles.itemButton}
							aria-expanded={activeId === device.id}
							aria-controls={`popup-${device.id}`}
							onClick={() =>
								setActiveId((cur) =>
									cur === device.id ? null : device.id
								)
							}
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
							onClose={() => {
								setPinnedIds((prev) => {
									const next = new Set(prev);
									next.delete(device.id);
									return next;
								});
								setActiveId((cur) =>
									cur === device.id ? null : cur
								);
							}}
							open={isOpen}
							onPromote={() =>
								setPinnedIds((prev) => {
									if (prev.has(device.id)) return prev;
									const next = new Set(prev);
									next.add(device.id);
									return next;
								})
							}
						/>
					</div>
				);
			})}
		</DevicePage>
	);
}
