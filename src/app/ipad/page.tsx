"use client";
import { iPads } from "@/data/ipads";
import IpadCard from "@/components/device/iPadCard";
import DeviceManager from "@/components/DeviceManager/deviceManager";

export default function iPadPage() {
	return (
		<DeviceManager
			devices={iPads}
			CardComponent={IpadCard}
		/>
	);
}
