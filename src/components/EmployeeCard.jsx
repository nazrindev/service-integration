import {
  EnvelopeIcon,
  PhoneIcon,
  IdentificationIcon,
  BriefcaseIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { DESIGNATIONS, GENDERS } from "../constants/lookups";
import { useState, useRef } from "react";

export default function EmployeeCard({ employee }) {
  const getDesignationName = (id) =>
    DESIGNATIONS.find((d) => d.id === id)?.value || "Team Member";
  const getGender = (id) => GENDERS.find((d) => d.id === id)?.value || "-";

  const [flipped, setFlipped] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setFlipped(true);
    }, 1200);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setFlipped(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="perspective group min-h-[320px] w-full cursor-pointer"
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 ease-out preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute inset-0 backface-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-md transition-shadow duration-300 group-hover:shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex gap-5">
              <div className="relative shrink-0">
                <img
                  src={
                    employee.avatar ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  }
                  alt={`${employee.firstName} ${employee.lastName}`}
                  className="h-36 w-28 rounded-2xl object-cover ring-4 ring-slate-50/50 shadow-inner"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 mb-2">
                  <IdentificationIcon className="h-3.5 w-3.5" />
                  {employee.employeeID}
                </span>

                <h3 className="text-xl font-bold text-slate-800 tracking-tight truncate">
                  {employee.firstName} {employee.lastName}
                </h3>

                <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                  <BriefcaseIcon className="h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {getDesignationName(employee.designation)}
                  </span>
                </div>

                {employee.gender != null && (
                  <span className="mt-2 inline-block rounded-md bg-slate-50 border border-slate-200/60 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    {employee.gender === 0
                      ? "Not Specified"
                      : getGender(employee.gender)}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors">
                <EnvelopeIcon className="h-4 w-4 text-slate-400 shrink-0" />
                <span className="text-sm truncate select-all">
                  {employee.personalEmail}
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors">
                <PhoneIcon className="h-4 w-4 text-slate-400 shrink-0" />
                <span className="text-sm tracking-wide select-all">
                  {employee.mobileNumber}
                </span>
              </div>
            </div>
          </div>

          <button className="mt-4 w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-600 active:scale-[0.98]">
            View Profile
          </button>
        </div>

        <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-2xl flex flex-col justify-between border border-slate-700/50">
          <div>
            <div className="border-b border-slate-700/60 pb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                Additional Info
              </p>
              <h3 className="text-lg font-bold tracking-tight mt-0.5">
                {employee.firstName} {employee.lastName}
              </h3>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-y-3.5 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <CalendarDaysIcon className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
                    Date of Birth
                  </p>
                  <p className="font-medium text-slate-200">
                    {employee.dateOfBirth
                      ? new Date(employee.dateOfBirth).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )
                      : "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPinIcon className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
                    Address
                  </p>
                  <p className="font-medium text-slate-200 leading-snug">
                    {employee.postalAddress ? (
                      <>
                        {employee.postalAddress}, <br />
                        {employee.postalCode} {employee.city},{" "}
                        {employee.country}
                      </>
                    ) : (
                      "—"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <UserIcon className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
                    Gender
                  </p>
                  <p className="font-medium text-slate-200 capitalize">
                    {employee.gender || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right text-[10px] font-medium tracking-wide text-slate-500">
            Hover away to flip back
          </div>
        </div>
      </div>
    </div>
  );
}
