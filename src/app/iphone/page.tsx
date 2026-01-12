"use client";
import { useRef, useState } from "react";
import MarkerOrPreview from "@/components/MarkerOrPreview/MarkerOrPreview";
import IphoneCard from "@/components/device/iPhoneCard";
import { iPhones } from "@/data/iphones";
import DevicePage from "@/components/DevicePage/DevicePage";
import styles from "@/components/DevicePage/devicePage.module.css";

export default function Page() {
	const [activeId, setActiveId] = useState<string | null>(null);
	const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());
	const [zMap, setZMap] = useState<Record<string, number>>({});
	const zCounter = useRef(30);

	const bringToFront = (id: string) => {
		zCounter.current += 1;
		setZMap((prev) => ({
			...prev,
			[id]: zCounter.current,
		}));
	};

	return (
		<DevicePage useTimeline>
			{iPhones.map((device) => {
				const isPinned = pinnedIds.has(device.id);
				const isOpen = activeId === device.id || isPinned;

				return (
					<div className={styles.item} key={device.id}>
						<button
							type="button"
							className={styles.itemButton}
							onClick={() =>
								setActiveId((cur) =>
									cur === device.id ? null : device.id,
								)
							}
						>
							<MarkerOrPreview
								id={device.id}
								familyID={device.familyID}
							/>
							<span className={styles.label}>{device.name}</span>
						</button>

						<IphoneCard
							device={device}
							open={isOpen}
							zIndex={zMap[device.id]}
							onPromote={() => {
								setPinnedIds((prev) => {
									if (prev.has(device.id)) return prev;
									const next = new Set(prev);
									next.add(device.id);
									return next;
								});
								bringToFront(device.id);
							}}
							onClose={() => {
								setPinnedIds((prev) => {
									const next = new Set(prev);
									next.delete(device.id);
									return next;
								});
								setActiveId((cur) =>
									cur === device.id ? null : cur,
								);
							}}
						/>
					</div>
				);
			})}
		</DevicePage>
	);
}
