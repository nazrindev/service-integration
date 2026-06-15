import {
  EnvelopeIcon,
  PhoneIcon,
  IdentificationIcon,
  BriefcaseIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UserIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { DESIGNATIONS, GENDERS } from "../constants/lookups";
import { useState, useRef } from "react";

export default function EmployeeCard({ employee, onEdit, onDelete }) {
  const getDesignationName = (id) =>
    DESIGNATIONS.find((d) => d.id === id)?.value || "Team Member";
  const getGender = (id) => GENDERS.find((d) => d.id === id)?.value || "—";

  const [flipped, setFlipped] = useState(false);
  const timerRef = useRef(null);

  const clearFlipTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const handleFlipZoneEnter = () => {
    clearFlipTimer();
    timerRef.current = setTimeout(() => setFlipped(true), 1200);
  };

  const handleFlipZoneLeave = () => {
    clearFlipTimer();
    setFlipped(false);
  };

  const handleActionZoneEnter = () => {
    clearFlipTimer();
    setFlipped(false);
  };

  const genderLabel =
    employee.gender && employee.gender !== 0
      ? getGender(employee.gender)
      : null;

  const displayName = `${
    employee.firstName?.charAt(0).toUpperCase() +
    employee.firstName?.slice(1).toLowerCase()
  } ${
    employee.lastName?.charAt(0).toUpperCase() +
    employee.lastName?.slice(1).toLowerCase()
  }`;

  const initials =
    `${employee.firstName?.charAt(0) ?? ""}${employee.lastName?.charAt(0) ?? ""}`.toUpperCase() ||
    "?";

  return (
    <div className="perspective group h-full w-full">
      <div
        className={`relative h-full min-h-[320px] w-full transition-transform duration-700 ease-out preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute inset-0 backface-hidden flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 group-hover:border-indigo-200 group-hover:shadow-md">
          <div
            onMouseEnter={handleFlipZoneEnter}
            onMouseLeave={handleFlipZoneLeave}
            className="flex items-start gap-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-5"
          >
            <div
              aria-hidden="true"
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold tracking-wide text-white shadow-md ring-2 ring-white"
            >
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <IdentificationIcon className="h-3.5 w-3.5" />
                <span>ID {employee.employeeID}</span>
              </div>

              <h3 className="truncate text-lg font-semibold text-slate-900">
                {displayName}
              </h3>

              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                  <BriefcaseIcon className="h-3.5 w-3.5" />
                  {getDesignationName(employee.designation)}
                </span>
                {genderLabel && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    <UserIcon className="h-3.5 w-3.5" />
                    {genderLabel}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-between p-5">
            <div
              onMouseEnter={handleFlipZoneEnter}
              onMouseLeave={handleFlipZoneLeave}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <EnvelopeIcon className="h-4 w-4" />
                </span>
                <span className="truncate text-sm text-slate-600">
                  {employee.personalEmail}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <PhoneIcon className="h-4 w-4" />
                </span>
                <span className="text-sm text-slate-600">
                  {employee.mobileNumber || "—"}
                </span>
              </div>
            </div>

            <div
              onMouseEnter={handleActionZoneEnter}
              className="mt-5 shrink-0 flex gap-2"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(employee);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 active:scale-[0.98]"
              >
                <PencilSquareIcon className="h-4 w-4" />
                Edit Profile
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(employee);
                }}
                title="Delete employee"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 active:scale-[0.98]"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          onMouseEnter={handleFlipZoneEnter}
          onMouseLeave={handleFlipZoneLeave}
          className="absolute inset-0 rotate-y-180 backface-hidden flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-xl"
        >
          <div>
            <div className="border-b border-slate-700/60 pb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
                Additional Info
              </p>
              <h3 className="mt-1 truncate text-lg font-semibold">
                {displayName}
              </h3>
            </div>

            <div className="mt-4 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <CalendarDaysIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
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
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Address
                  </p>
                  <p className="font-medium leading-snug text-slate-200">
                    {employee.postalAddress ? (
                      <>
                        {employee.postalAddress}
                        <br />
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
                <UserIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Gender
                  </p>
                  <p className="font-medium text-slate-200">
                    {genderLabel || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-right text-[10px] font-medium tracking-wide text-slate-500">
            Hover away to flip back
          </p>
        </div>
      </div>
    </div>
  );
}
