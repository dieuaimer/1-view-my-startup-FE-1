import loadingLogo from "../../assets/logo_loading.svg";

import "./Loader.css";

export default function Loader() {
  return (
    <div className="Loader">
      <img src={loadingLogo} alt="loading img" />
      <div className="dot"></div>
    </div>
  );
}
