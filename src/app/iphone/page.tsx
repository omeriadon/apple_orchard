"use client";
import { useState } from "react";
import IphoneCard from "../../components/iPhoneCard";
import { iPhones } from "@/data/iphones";
import styles from "./iphone.module.css";
import DevicePage from "@/components/DevicePage";

export default function Page() {
	const [openId, setOpenId] = useState<string | null>(null);

	return (
		<DevicePage>
			<div className={styles.timeline} role="list">
				{iPhones.map((device) => (
					<div
						className={styles.item}
						key={device.id}
						role="listitem"
					>
						<button
							type="button"
							className={styles.marker}
							aria-expanded={openId === device.id}
							aria-controls={`popup-${device.id}`}
							onClick={() =>
								setOpenId(
									openId === device.id ? null : device.id
								)
							}
							aria-label={`Toggle ${device.name}`}
						/>
						<div className={styles.label}>{device.name}</div>

						<div
							id={`popup-${device.id}`}
							className={`${styles.popup} ${
								openId === device.id ? styles.open : ""
							}`}
							role="dialog"
							aria-hidden={openId !== device.id}
						>
							<div className={styles["card-wrapper"]}>
								<button
									type="button"
									className={styles.close}
									onClick={() => setOpenId(null)}
								>
									✕
								</button>
								<IphoneCard device={device} />
							</div>
						</div>
					</div>
				))}
			</div>
		</DevicePage>
	);
}
