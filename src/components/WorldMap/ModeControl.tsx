import { Mode } from "../../types";
import "./ModeControl.scss";

const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

type Position = "bottomleft" | "bottomright" | "topleft" | "topright";

type Props = {
  position: Position;
  change: (mode: Mode) => void;
};

const ModeControl = ({ position, change }: Props) => {
  const positionClass: string = POSITION_CLASSES[position];

  const buttons = (
    <div className="modeToggle">
      <button className="modeToggle_button" onClick={() => change("FLAGS")}>
        Flags
      </button>
      <button className="modeToggle_button" onClick={() => change("RED_ZONES")}>
        Red Zones
      </button>
    </div>
  );

  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{buttons}</div>
    </div>
  );
};

export default ModeControl;
