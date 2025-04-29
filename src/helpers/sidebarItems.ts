type TSidebarItems = {
  label: string;
  link: string;
  isTitle?: boolean;
  contents?: { label: string; link: string }[];
}[];

export const sidebarItems: TSidebarItems = [
  {
    label: "Button",
    link: "/",
    contents: [
      { label: "Variants", link: "" },
      { label: "Size", link: "" },
      { label: "Color", link: "" },
      { label: "Disabled", link: "" },
      { label: "With Icon", link: "#with-icon" },
      { label: "Loading", link: "#loading" },
    ],
  },
  { label: "Tabs", link: "" },
  { label: "Switch", link: "/switch" },
  { label: "Dialog", link: "/dialog" },
  { label: "Table", link: "/table" },
  { label: "Stepper", link: "" },
  { label: "File Upload", link: "" },
];
