import Head from "next/head";

const employees = [
  { id: 1, name: "Priya Rao", initials: "PR", dept: "Engineering", mood: 8.5, status: "Happy", lastSeen: "Today", color: "#6C5CE7", bg: "#EDE9FE" },
  { id: 2, name: "Arjun Mehta", initials: "AM", dept: "Product", mood: 6.0, status: "Okay", lastSeen: "Today", color: "#0F6E56", bg: "#E1F5EE" },
  { id: 3, name: "Sneha R.", initials: "SR", dept: "Design", mood: 3.2, status: "Low", lastSeen: "Today", color: "#A32D2D", bg: "#FCEBEB" },
  { id: 4, name: "Vikram K.", initials: "VK", dept: "Sales", mood: 9.1, status: "Thriving", lastSeen: "Today", color: "#185FA5", bg: "#E6F1FB" },
  { id: 5, name: "Nisha K.", initials: "NK", dept: "HR", mood: 5.5, status: "Neutral", lastSeen: "Today", color: "#854F0B", bg: "#FAEEDA" },
];

const alerts = [
  { icon: "🎂", title: "Priya Rao — 2-year anniversary", time: "Today · Engineering", type: "milestone" },
  { icon: "⭐", title: "Arjun Mehta — Goal completed", time: "Yesterday · Product", type: "success" },
  { icon: "⚠️", title: "Sneha R. — Low mood streak", time: "3 days · Needs follow-up", type: "risk" },
  { icon: "📅", title: "Ravi S. — No check-in (5 days)", time: "Inactive · Sales", type: "inactive" },
];

const weekMoods = [
  { day: "Mon", count: 8, color: "#5DCAA5" },
  { day: "Tue", count: 12, color: "#5DCAA5" },
  { day: "Wed", count: 6, color: "#EF9F27" },
  { day: "Thu", count: 14, color: "#5DCAA5" },
  { day: "Fri", count: 21, color: "#1D9E75" },
  { day: "Sat", count: 5, color: "#EF9F27" },
  { day: "Sun", count: 2, color: "#E24B4A" },
];

const departments = [
  { name: "Engineering", score: 8.2, pct: 82 },
  { name: "Product", score: 7.4, pct: 74 },
  { name: "Sales", score: 6.9, pct: 69 },
  { name: "Design", score: 5.2, pct: 52 },
  { name: "HR", score: 8.8, pct: 88 },
];

function getMoodChip(mood) {
  if (mood >= 8) return { bg: "#E1F5EE", color: "#0F6E56" };
  if (mood >= 5) return { bg: "#FAEEDA", color: "#854F0B" };
  return { bg: "#FCEBEB", color: "#A32D2D" };
}

function getBarColor(score) {
  if (score >= 7.5) return "#1D9E75";
  if (score >= 5) return "#EF9F27";
  return "#E24B4A";
}

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Genie — Manager Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ minHeight: "100vh", background: "#F8F7FF", fontFamily: "system-ui, -apple-system, sans-serif" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", background: "#fff", borderBottom: "1px solid #ebebeb" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "#6C5CE7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🧞</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 17, color: "#1a1a2e" }}>Genie</div>
              <div style={{ fontSize: 12, color: "#888" }}>Manager dashboard</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#6C5CE7" }}>KA</div>
            <span style={{ fontSize: 13, color: "#555" }}>Kushi · HR Manager</span>
          </div>
        </div>

        <div style={{ padding: "1.5rem", maxWidth: 1100, margin: "0 auto" }}>

          {/* Section label */}
          <div style={{ fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
            Overview — June 2026
          </div>

          {/* Stat Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: "1.5rem" }}>
            {[
              { val: "48", label: "Total employees", delta: "3 joined this month", up: true },
              { val: "36", label: "Checked in today", delta: "75% response rate", up: true },
              { val: "7.4", label: "Avg mood score", delta: "+0.3 vs last week", up: true },
              { val: "4", label: "At-risk employees", delta: "Needs attention", up: false },
            ].map((s, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "1rem 1.25rem", border: "1px solid #ebebeb" }}>
                <div style={{ fontSize: 26, fontWeight: 600, color: "#1a1a2e" }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{s.label}</div>
                <div style={{ fontSize: 12, marginTop: 8, color: s.up ? "#0F6E56" : "#A32D2D" }}>
                  {s.up ? "↑" : "↓"} {s.delta}
                </div>
              </div>
            ))}
          </div>

          {/* Mood Chart */}
          <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem" }}>
            <div style={{ fontWeight: 500, fontSize: 14, marginBottom: "1rem", color: "#1a1a2e" }}>Team mood — this week</div>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 90 }}>
              {weekMoods.map((m) => (
                <div key={m.day} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 500, color: "#555" }}>{m.count}</div>
                  <div style={{ width: "100%", borderRadius: "4px 4px 0 0", background: m.color, height: `${(m.count / 21) * 60}px` }} />
                  <div style={{ fontSize: 11, color: "#999" }}>{m.day}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
              {[["#1D9E75", "Positive (8–10)"], ["#EF9F27", "Neutral (5–7)"], ["#E24B4A", "Low (1–4)"]].map(([c, l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#888" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
                  {l}
                </div>
              ))}
            </div>
          </div>

          {/* Two columns */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.5rem" }}>

            {/* Recent check-ins */}
            <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 12, padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div style={{ fontWeight: 500, fontSize: 14, color: "#1a1a2e" }}>Recent check-ins</div>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#EDE9FE", color: "#534AB7" }}>Live</span>
              </div>
              {employees.map((e) => {
                const chip = getMoodChip(e.mood);
                return (
                  <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #f5f5f5" }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: e.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: e.color, flexShrink: 0 }}>{e.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#1a1a2e" }}>{e.name}</div>
                      <div style={{ fontSize: 11, color: "#999" }}>{e.dept}</div>
                    </div>
                    <div style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, fontWeight: 500, background: chip.bg, color: chip.color }}>
                      {e.mood} — {e.status}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Alerts */}
            <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 12, padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div style={{ fontWeight: 500, fontSize: 14, color: "#1a1a2e" }}>Milestone alerts</div>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#FAEEDA", color: "#854F0B" }}>4 new</span>
              </div>
              {alerts.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < alerts.length - 1 ? "1px solid #f5f5f5" : "none" }}>
                  <div style={{ fontSize: 18, lineHeight: 1.5 }}>{a.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#1a1a2e" }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department breakdown */}
          <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 12, padding: "1.25rem" }}>
            <div style={{ fontWeight: 500, fontSize: 14, marginBottom: "1rem", color: "#1a1a2e" }}>Department mood breakdown</div>
            {departments.map((d) => (
              <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid #f5f5f5" }}>
                <div style={{ fontSize: 13, color: "#1a1a2e", width: 90, flexShrink: 0 }}>{d.name}</div>
                <div style={{ flex: 1, height: 8, background: "#f5f5f5", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 4, background: getBarColor(d.score), width: `${d.pct}%` }} />
                </div>
                <div style={{ fontSize: 12, color: "#888", width: 28, textAlign: "right", flexShrink: 0 }}>{d.score}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
