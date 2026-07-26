export interface Application {
  id: string;
  name: string;
  system: string;
  systemShort: string;
  image: string;
}

export const applications: Application[] = [
  {
    id: "substations",
    name: "Substations",
    system: "Electrical Insulation",
    systemShort: "EI",
    image: "/images/app-substation.png",
  },
  {
    id: "control-rooms",
    name: "Control Rooms",
    system: "Electrical Insulation",
    systemShort: "EI",
    image: "/images/app-control-room.png",
  },
  {
    id: "power-utilities",
    name: "Power Utilities",
    system: "Electrical Insulation",
    systemShort: "EI",
    image: "/images/app-power-utility.png",
  },
  {
    id: "railways-metro",
    name: "Railways / Metro",
    system: "Visible Safety",
    systemShort: "VS",
    image: "/images/app-railway.png",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    system: "Visible Safety",
    systemShort: "VS",
    image: "/images/app-manufacturing.png",
  },
  {
    id: "tunnels-water",
    name: "Tunnels / Water",
    system: "Civil Protection",
    systemShort: "CP",
    image: "/images/app-tunnel.png",
  },
];
