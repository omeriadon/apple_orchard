import DeviceCard from "../../components/DeviceCard";
import type { Device } from "@/types/device";

const sample: Device = {
	id: "ipad-air-5",
	familyID: "ipad-air",
	name: "iPad Air (5th gen)",
	introduced: 2022,
	supportedUntil: 2028,
};

export default function Page() {
	return (
		<main>
			<section style={{ padding: "2rem 0" }}>
				<DeviceCard device={sample}>
					<div>Placeholder details for iPad.</div>
				</DeviceCard>
			</section>
		</main>
	);
}
