import { CalendarMinus, CalendarPlus, Cpu, Laptop2 } from "lucide-react";
import DeviceCard from "../../components/DeviceCard";
import type { Device } from "@/types/device";
import type { DeviceCardRowProps } from "../../components/DeviceCardRow";

const sample: Device = {
	id: "macbook-pro-14",
	familyID: "macbook-pro",
	name: "MacBook Pro 14",
	introduced: 2023,
	supportedUntil: 2032,
};

const infoRows: DeviceCardRowProps[] = [
	{
		title: "Family",
		value: sample.familyID,
		icon: Laptop2,
	},
	{
		title: "Processor",
		value: sample.familyID.includes("pro") ? "Apple M4 Pro" : "Apple M4",
		icon: Cpu,
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
