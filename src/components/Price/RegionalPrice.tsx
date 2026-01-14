"use client";

import * as React from "react";
import {
	Root as PopoverRoot,
	Trigger as PopoverTrigger,
	Content as PopoverContent,
	Portal as PopoverPortal,
	Arrow as PopoverArrow,
	Close as PopoverClose,
} from "@radix-ui/react-popover";
import { CircleDollarSign } from "lucide-react";
import { computeBasePrice, type BasePrice } from "@/lib/pricing";
import { useUserPricingOverride } from "@/lib/userPricing";
import type { Pricing } from "@/types/iphone";
import styles from "@/components/DeviceCard/deviceCard.module.css";

type Props = {
	pricing?: Pricing;
	storage?: number;
};

const PLACEHOLDER = "?";

export default function RegionalPrice({ pricing, storage }: Props) {
	const { override } = useUserPricingOverride();

	const base: BasePrice | null = pricing
		? computeBasePrice(pricing, storage)
		: null;
	const converted = base ? Math.round(base.amount * override.multiplier) : 0;
	const formatted = new Intl.NumberFormat(undefined, {
		maximumFractionDigits: 0,
	}).format(converted);

	if (!pricing || !base) {
		return (
			<span className={`${styles.meta2} ${styles.price}`}>
				{PLACEHOLDER}
			</span>
		);
	}

	return (
		<PopoverRoot>
			<PopoverTrigger asChild>
				<span
					className={`${styles.meta2} ${styles.price}`}
					style={{ cursor: "pointer" }}
					onPointerDown={(e) => e.stopPropagation()}
				>
					<CircleDollarSign size={16} />~ {formatted}
				</span>
			</PopoverTrigger>

			<PopoverPortal>
				<PopoverContent
					className={styles.popoverContent}
					sideOffset={8}
					align="center"
				>
					<div>
						<div className={styles.popoverPrices}>
							{base.storage &&
								Object.entries(base.storage).map(
									([size, price]) => (
										<div
											key={size}
											data-label={`${size} GB`}
										>
											~ ${price}
										</div>
									),
								)}

							<div className={styles.spacer} />

							{base.refurbished && (
								<div data-label="Refurbished">
									~ ${base.refurbished}
								</div>
							)}
						</div>
					</div>
				</PopoverContent>
			</PopoverPortal>
		</PopoverRoot>
	);
}
