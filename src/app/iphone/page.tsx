"use client";
import { iPhones } from "@/data/iphones";
import IphoneCard from "@/components/device/iPhoneCard";
import DeviceManager from "@/components/DeviceManager/deviceManager";

export default function iPhonePage() {
	return (
		<DeviceManager
			devices={iPhones}
			CardComponent={IphoneCard}
			width={306}
			height={380}
			deviceType="iphones"
		/>
	);
}
