import React, { useEffect, useState } from "react";
import { Card, Chip, Avatar, Skeleton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventNoteIcon from "@mui/icons-material/EventNote";

import type { ActivityLog } from "../types/logs.types";
import { getAllActivityLogs } from "../api/logs.api";

/* 🔹 Entity visual config */
const entityConfig = (type: string) => {
  switch (type) {
    case "order":
      return {
        icon: <ShoppingCartIcon />,
        gradient: "from-blue-500 to-cyan-500",
        border: "border-blue-400",
      };
    case "product":
      return {
        icon: <InventoryIcon />,
        gradient: "from-green-500 to-emerald-500",
        border: "border-green-400",
      };
    case "customer":
      return {
        icon: <PeopleAltIcon />,
        gradient: "from-purple-500 to-fuchsia-500",
        border: "border-purple-400",
      };
    default:
      return {
        icon: <EventNoteIcon />,
        gradient: "from-gray-400 to-gray-600",
        border: "border-gray-300",
      };
  }
};

/* 🔹 Role avatar colors */
const roleGradient = (role: string) => {
  switch (role) {
    case "admin":
      return "from-red-500 to-orange-500";
    case "manager":
      return "from-indigo-500 to-blue-500";
    case "sales":
      return "from-emerald-500 to-green-500";
    default:
      return "from-gray-400 to-gray-600";
  }
};

/* 🔹 Action formatter */
const formatAction = (action: string) =>
  action.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());

/* 🔹 Time ago */
const timeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hrs ago`;
  return `${Math.floor(hrs / 24)} days ago`;
};

const Logs = () => {
  const [data, setData] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllActivityLogs()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Activity Intelligence
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-xl">
          A colorful, real-time system timeline capturing every meaningful
          action across your platform
        </p>
      </div>

      {/* Timeline */}
      <div className="relative pl-10 space-y-10">
        {/* Gradient Line */}
        <div className="absolute left-4 top-0 h-full w-[3px] bg-gradient-to-b from-blue-400 via-purple-400 to-emerald-400 rounded-full" />

        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              height={100}
              className="ml-10"
            />
          ))}

        {!loading &&
          data.map((log) => {
            const entity = entityConfig(log.entityType);

            return (
              <div key={log._id} className="relative group">
                {/* Glowing Node */}
                <div
                  className={`absolute left-[5px] top-6 w-6 h-6 rounded-full bg-gradient-to-br ${entity.gradient} shadow-lg group-hover:scale-110 transition`}
                />

                {/* Card */}
                <Card
                  className={`ml-10 p-5 rounded-2xl border ${entity.border}
                  backdrop-blur bg-white/70 shadow-md hover:shadow-xl
                  transition-all hover:-translate-y-1`}
                >
                  <div className="flex items-start gap-5">
                    {/* Icon pill */}
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${entity.gradient} text-white shadow-lg`}
                    >
                      {entity.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {log.message}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-600">
                        {/* User */}
                        <div className="flex items-center gap-2">
                          <Avatar
                            sx={{
                              width: 26,
                              height: 26,
                              fontSize: 13,
                            }}
                            className={`bg-gradient-to-br ${roleGradient(
                              log.performedBy.role
                            )}`}
                          >
                            {log.performedBy.name[0]}
                          </Avatar>
                          <span className="font-medium text-gray-800">
                            {log.performedBy.name}
                          </span>
                          <span className="italic text-gray-500">
                            ({log.performedBy.role})
                          </span>
                        </div>

                        <span className="opacity-40">|</span>

                        {/* Time */}
                        <span className="font-medium">
                          {timeAgo(log.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-col gap-2 items-end">
                      <Chip
                        label={log.entityType.toUpperCase()}
                        size="small"
                        className="font-semibold tracking-wide"
                        variant="outlined"
                      />
                      <Chip
                        label={formatAction(log.action)}
                        size="small"
                        className="bg-black text-white"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}

        {!loading && data.length === 0 && (
          <div className="ml-10 text-center py-20 text-gray-500">
            No system activity yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Logs;
