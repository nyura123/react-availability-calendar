import React from "react";
import { Service, services } from "../models";

export const Services = ({
  selected,
  onSelected
}: {
  selected: { [id: string]: boolean };
  onSelected: (s: string) => any;
}) => {
  return (
    <div>
      <h5>Please Select Services (optional):</h5>
      {services.map((s, i) => (
        <div key={"s_" + s.id} className="mb-1">
          <ServiceComp
            service={s}
            onSelected={onSelected}
            selected={!!selected[s.id]}
          />
        </div>
      ))}
    </div>
  );
};

const ServiceComp = ({
  service,
  selected,
  onSelected
}: {
  service: Service;
  selected: boolean;
  onSelected: (id: string) => any;
}) => (
  <div
    onClick={() => onSelected(service.id)}
    style={{ cursor: "pointer", border: "3px solid" }}
    className={
      "card text-center " + (selected ? "border-info " : "border-light")
    }
  >
    <div className="card-body">
      {/* <img src="..." className="card-img-top" alt="..." /> */}
      <div className="card-text">{service.label}</div>
    </div>
  </div>
);
