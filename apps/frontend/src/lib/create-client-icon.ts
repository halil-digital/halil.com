import { Client } from "@/models/client.model";

export const createClientIcon = async (client: Client) => {
  const L = await import("leaflet");

  const color = client.name === "mohamed" ? "#22c55e" : "#ef4444"; // vert / rouge

  const html = `
    <div style="
      display: inline-block;
      background: ${color};
      color: white;
      padding: 4px 8px;
      font-size: 12px;
      font-weight: bold;
      border-radius: 4px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      position: relative;
      white-space: nowrap;
    ">
      ${client.name}
      <div style="
        content: '';
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid ${color};
      "></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "",
    iconSize: [100, 40], // taille du bloc global
    iconAnchor: [65, 0], // la pointe du triangle
    popupAnchor: [0, 0],
  });
};
