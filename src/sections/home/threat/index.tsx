import { AlertTriangle } from "lucide-react";
import styles from "./styles.module.scss";

export const ThreatAlertBar = () => {
  return (
    <div className="w-full bg-[#0f0f0f] border-t border-gray-800 flex items-center text-sm text-gray-300 px-4 py-4 overflow-hidden">
      {/* Left section */}
      <div className="flex items-center gap-2 bg-gradient-to-r from-[#b245ff] to-[#7b3eff] text-white font-semibold px-3 py-1 rounded-sm text-xs shrink-0">
        <AlertTriangle className="w-4 h-4" />
        <span>THREAT ALERT</span>
      </div>

      {/* Right section */}
      <div className="flex-1 overflow-hidden ml-4">
        <div className={styles["animate-marquee"]}>
          May 13, 2025: New ransomware variant targeting healthcare sector detected | 
          Critical patches released by major vendors | 
          Ongoing investigation by cybersecurity teams worldwide. &nbsp;&nbsp;&nbsp;
          May 13, 2025: New ransomware variant targeting healthcare sector detected | 
          Critical patches released by major vendors | 
          Ongoing investigation by cybersecurity teams worldwide.
        </div>
      </div>
    </div>
  );
};
