export const navItems = [
	{
		path: "/",
		label: "Apple Orchard",
		slot: "left",
		gradient:
			"linear-gradient(180deg, rgba(33.6498, 33.6498, 33.6498, 1.0), rgba(0, 0, 0, 1.0))",
		hoverColor: "rgba(33.6498, 33.6498, 33.6498, 1.0)",
	},
	{
		path: "/iphone",
		label: "iPhone",
		slot: "center",
		gradient:
			"linear-gradient(180deg, rgba(56.93385, 113.9901, 113.0568, 1.0), rgba(15.890835, 34.08585, 33.83595, 1.0))",
		hoverColor: "rgba(56.93385, 113.9901, 113.0568, 1.0)",
	},
	{
		path: "/mac",
		label: "Mac",
		slot: "center",
		gradient:
			"linear-gradient(180deg, rgba(91.392, 124.63635, 34.45815, 1.0), rgba(27.16005, 37.0413, 5.264475, 1.0))",
		hoverColor: "rgba(91.392, 124.63635, 34.45815, 1.0)",
	},
	{
		path: "/ipad",
		label: "iPad",
		slot: "center",
		gradient:
			"linear-gradient(180deg, rgba(113.0568, 24.03069, 40.8408, 1.0), rgba(33.0276, 4.455105, 11.81313, 1.0))",
		hoverColor: "rgba(113.0568, 24.03069, 40.8408, 1.0)",
	},
	{
		path: "/about",
		label: "About",
		slot: "right",
		gradient: "linear-gradient(180deg, rgba(30,30,30,1), rgba(12,12,12,1))",
		hoverColor: "rgba(30,30,30,1)",
	},
];

export type NavItem = (typeof navItems)[number];
