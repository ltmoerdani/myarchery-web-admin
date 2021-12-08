import * as React from "react";
import { SelectionCards, OptionCard, OptionTitle, OptionDescription } from "../SelectionCards";
import OptionComingSoon from "./OptionComingSoon";

const NAME_OPTION = "eventType";

export default function Step1({ eventType, onChange }) {
  const handleEventTypeChange = (ev) => onChange?.(ev);
  return (
    <div>
      <h1 className="mb-5">Tentukan jenis waktu pelaksanaan</h1>

      <SelectionCards value={eventType} onChange={handleEventTypeChange}>
        <OptionCard name={NAME_OPTION} value="fullday">
          <OptionTitle>Full Day</OptionTitle>
          <OptionDescription>
            Kualifikasi &amp; Eliminasi per kategori selesai dalam waktu 1 hari
          </OptionDescription>
        </OptionCard>

        <OptionComingSoon className="mt-3" blurTargetClassName="option-card">
          <OptionCard disabled name={NAME_OPTION} value="marathon" className="option-card">
            <OptionTitle>Marathon</OptionTitle>
            <OptionDescription>
              Kualifikasi &amp; Eliminasi per kategori selesai lebih dari 1 hari
            </OptionDescription>
          </OptionCard>
        </OptionComingSoon>
      </SelectionCards>
    </div>
  );
}
