"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import { navItems } from "../data/pages";

const DEFAULT_HOME_GRADIENT =
	"linear-gradient(180deg, rgba(33.6498, 33.6498, 33.6498, 1.0), rgba(0, 0, 0, 1.0))";

const gradients: Record<string, string> = navItems.reduce(
	(acc, it) => {
		acc[it.path] = it.gradient;
		return acc;
	},
	{} as Record<string, string>,
);

if (!gradients["/"]) gradients["/"] = DEFAULT_HOME_GRADIENT;

export default function Background() {
	const pathname = usePathname();
	const idCounter = useRef(1);

	const raf1Ref = useRef<number | null>(null);
	const raf2Ref = useRef<number | null>(null);
	const cleanupRef = useRef<number | null>(null);
	const animationIdRef = useRef(0);
	const TRANSITION_MS = 3500;

	const [layers, setLayers] = useState<
		{ id: string; path: string; gradient: string; visible: boolean }[]
	>(() => [
		{
			id: `layer-0`,
			path: pathname,
			gradient:
				gradients[pathname as keyof typeof gradients] ?? gradients["/"],
			visible: true,
		},
	]);

	useEffect(() => {
		const currentGradient =
			gradients[pathname as keyof typeof gradients] || gradients["/"];

		if (
			layers.length &&
			layers[layers.length - 1].path === pathname &&
			layers[layers.length - 1].visible
		)
			return;

		const animationId = ++animationIdRef.current;

		setLayers((prev) => {
			if (prev.length && prev[prev.length - 1].path === pathname)
				return prev;
			if (prev.some((l) => l.path === pathname)) return prev;
			return [
				...prev,
				{
					id: `layer-${idCounter.current++}`,
					path: pathname,
					gradient: currentGradient,
					visible: false,
				},
			];
		});

		if (raf1Ref.current) cancelAnimationFrame(raf1Ref.current);
		if (raf2Ref.current) cancelAnimationFrame(raf2Ref.current);
		if (cleanupRef.current) clearTimeout(cleanupRef.current);

		raf1Ref.current = requestAnimationFrame(() => {
			raf1Ref.current = null;
			raf2Ref.current = requestAnimationFrame(() => {
				raf2Ref.current = null;
				setLayers((prev) =>
					prev.map((layer) =>
						layer.path === pathname
							? { ...layer, visible: true }
							: { ...layer, visible: false },
					),
				);
			});
		});

		cleanupRef.current = window.setTimeout(() => {
			if (animationIdRef.current !== animationId) return;
			setLayers((prev) =>
				prev.filter((layer) => layer.path === pathname),
			);
			cleanupRef.current = null;
		}, TRANSITION_MS + 100);

		return () => {
			if (raf1Ref.current) cancelAnimationFrame(raf1Ref.current);
			if (raf2Ref.current) cancelAnimationFrame(raf2Ref.current);
			if (cleanupRef.current) clearTimeout(cleanupRef.current);
		};
	}, [pathname, layers]);

	return (
		<>
			{layers.map((layer) => (
				<div
					key={layer.id}
					className={`gradient-layer ${
						layer.visible ? "gradient-visible" : ""
					}`}
					style={{ backgroundImage: layer.gradient }}
				/>
			))}
		</>
	);
}
