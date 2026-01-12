import React from "react";

type Props = {
	children: React.ReactNode;
};

export default function ScrollTimeline({ children }: Props) {
	return <div role="list">{children}</div>;
}
