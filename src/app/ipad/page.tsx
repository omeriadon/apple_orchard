import { CalendarMinus, CalendarPlus, Layers } from "lucide-react";
import DeviceCard from "../../components/DeviceCard";
import type { Device } from "@/types/device";
import type { DeviceCardRowProps } from "../../components/DeviceCardRow";

const sample: Device = {
	id: "ipad-air-5",
	familyID: "ipad-air",
	name: "iPad Air (5th gen)",
	introduced: 2022,
	supportedUntil: 2028,
};

const infoRows: DeviceCardRowProps[] = [
	{
		title: "Family",
		value: sample.familyID,
		icon: Layers,
	},
	{
		title: "Introduced",
		value: sample.introduced,
		icon: CalendarPlus,
	},
	{
		title: "Supported",
		value: sample.supportedUntil,
		icon: CalendarMinus,
	},
];

export default function Page() {
	return (
		<main>
			<section style={{ padding: "2rem 0" }}>
				<DeviceCard device={sample} infoRows={infoRows} />
			</section>
		</main>
	);
}
