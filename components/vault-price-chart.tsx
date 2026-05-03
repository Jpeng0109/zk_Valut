"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { t: "Dec 26", v: 1.002 },
  { t: "Dec 30", v: 1.004 },
  { t: "Jan 03", v: 1.003 },
  { t: "Jan 07", v: 1.006 },
  { t: "Jan 11", v: 1.008 },
  { t: "Jan 15", v: 1.007 },
  { t: "Jan 19", v: 1.009 },
  { t: "Jan 23", v: 1.0095 },
  { t: "Jan 27", v: 1.00987 },
  { t: "Jan 30", v: 1.00987 },
];

export function VaultPriceChart() {
  return (
    <div className="h-[280px] w-full sm:h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="shareFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.08)"
            vertical={false}
          />
          <XAxis
            dataKey="t"
            tick={{ fill: "#888888", fontSize: 10 }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 1.2]}
            tick={{ fill: "#888888", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={44}
            tickFormatter={(n) => n.toFixed(4)}
          />
          <Tooltip
            contentStyle={{
              background: "#161922",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="v"
            stroke="#818cf8"
            strokeWidth={2}
            fill="url(#shareFill)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
