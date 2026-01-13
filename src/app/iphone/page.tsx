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

	const pinnedDevices = iPhones.filter((device) => pinnedIds.has(device.id));

	return (
		<DevicePage
			useTimeline
			footer={
				pinnedDevices.length > 0 ? (
					<div className={styles.pinnedShelf}>
						{pinnedDevices.map((device) => (
							<IphoneCard
								key={`pinned-${device.id}`}
								device={device}
								open
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
								onPromote={() => bringToFront(device.id)}
								zIndex={zMap[device.id]}
								variant="pinned"
							/>
						))}
					</div>
				) : null
			}
		>
			{iPhones.map((device) => {
				const isPinned = pinnedIds.has(device.id);
				const isOpen = activeId === device.id || isPinned;
				const floatingOpen = isOpen && !isPinned;

				return (
					<div className={styles.item} key={device.id}>
						<button
							type="button"
							className={styles.itemButton}
							onClick={() => {
								setActiveId((cur) => {
									const next =
										cur === device.id ? null : device.id;
									if (next === device.id)
										bringToFront(device.id);
									return next;
								});
							}}
						>
							<MarkerOrPreview
								id={device.id}
								familyID={device.familyID}
							/>
							<span className={styles.label}>{device.name}</span>
						</button>

						<IphoneCard
							device={device}
							open={floatingOpen}
							zIndex={zMap[device.id]}
							onPin={() => {
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
