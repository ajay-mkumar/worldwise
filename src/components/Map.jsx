import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();


  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      Map
      <p>
        position: {searchParams.get("lat")}, {searchParams.get("lng")}
      </p>
    </div>
  );
}

export default Map;
