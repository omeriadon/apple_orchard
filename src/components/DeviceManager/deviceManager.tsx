"use client";
import { useRef, useState, ReactNode } from "react";
import MarkerOrPreview from "@/components/MarkerOrPreview/MarkerOrPreview";
import DevicePage from "@/components/DevicePage/DevicePage";
import styles from "@/components/DevicePage/devicePage.module.css";

export type Device = {
	id: string;
	name: string;
    familyID: string;
};

type DeviceManagerProps<T extends Device> = {
	devices: T[];
	CardComponent: React.ComponentType<{
		device: T;
		open: boolean;
		zIndex?: number;
		onPin?: () => void;
		onClose?: () => void;
		onPromote?: () => void;
		variant?: "pinned";
    }>;
    markerSize: number;
};

export default function DeviceManager<T extends Device>({
	devices,
    CardComponent,
    markerSize,
}: DeviceManagerProps<T>) {
	const [activeId, setActiveId] = useState<string | null>(null);
	const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());
	const [zMap, setZMap] = useState<Record<string, number>>({});
	const zCounter = useRef(30);

	const bringToFront = (id: string) => {
		zCounter.current += 1;
		setZMap((prev) => ({ ...prev, [id]: zCounter.current }));
	};

	const pinnedDevices = devices.filter((device) => pinnedIds.has(device.id));

	return (
		<DevicePage
			footer={
				pinnedDevices.length > 0 ? (
					<div className={styles.pinnedShelf}>
						{pinnedDevices.map((device) => (
							<CardComponent
								key={`pinned-${device.id}`}
								device={device}
								open
								variant="pinned"
								zIndex={zMap[device.id]}
								onPromote={() => bringToFront(device.id)}
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
						))}
					</div>
				) : null
			}
		>
			{devices.map((device) => {
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
								size={`${markerSize}px`}
							/>
							<span className={styles.label}>{device.name}</span>
						</button>

						<CardComponent
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
									cur === device.id ? null : cur
								);
							}}
						/>
					</div>
				);
			})}
		</DevicePage>
	);
}
