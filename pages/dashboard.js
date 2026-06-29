import Head from "next/head";
import { useState, useEffect } from "react";

const employees = [
  { id: "CT00011", name: "Apratim Mahata", dept: "Technology", designation: "Junior Developer", reporting: "Vedang Singh", joined: "01 Sep 2024" },
  { id: "CT00030", name: "Ronit Shrestha", dept: "Ecommerce", designation: "Shopify Developer", reporting: "Suman Saha", joined: "18 Aug 2025" },
  { id: "CT00031", name: "Muskan Mondal", dept: "Design", designation: "Photoshop Specialist", reporting: "Soumya Kanta Mohanty", joined: "20 Aug 2025" },
  { id: "CT00013", name: "Shubham Pandey", dept: "Technology", designation: "Junior Software Developer", reporting: "Vedang Singh", joined: "17 Feb 2025" },
  { id: "CT00049", name: "Tilak Rathoure", dept: "Technology", designation: "Full Stack Intern", reporting: "Apratim Mahata", joined: "08 Jan 2026" },
  { id: "CT00015", name: "Hrithik Singh", dept: "Site Operations", designation: "Site Ops", reporting: "Vedang Singh", joined: "24 Feb 2025" },
  { id: "CT00010", name: "Ruhbana Hasan", dept: "Ecommerce", designation: "Content Analyst", reporting: "Soumya Kanta Mohanty", joined: "04 Feb 2025" },
  { id: "CT00037", name: "Swastik Sharma", dept: "Technology", designation: "Full Stack Intern", reporting: "Apratim Mahata", joined: "15 Oct 2025" },
  { id: "CT00026", name: "Mohan Nandanawad", dept: "Site Operations", designation: "Web Analyst", reporting: "Vedang Singh", joined: "02 Jun 2025" },
  { id: "CT00043", name: "Shreyansh Srivastava", dept: "Technology", designation: "Full Stack Intern", reporting: "Apratim Mahata", joined: "12 Nov 2025" },
  { id: "CT00038", name: "Ashvin Tyagi", dept: "Marketing", designation: "Asst Manager - Growth Marketing", reporting: "Parveen Jahan", joined: "21 Oct 2025" },
  { id: "CT00023", name: "Soumesh Kundu", dept: "Technology", designation: "Full Stack Intern", reporting: "Apratim Mahata", joined: "19 May 2025" },
  { id: "CT0004", name: "Madhushree BJ", dept: "Design", designation: "Design Lead", reporting: "Vedang Singh", joined: "01 Dec 2024" },
  { id: "CT00034", name: "Aditya Sharma", dept: "Site Operations", designation: "Data Analyst Intern", reporting: "Hrithik Singh", joined: "15 Sep 2025" },
  { id: "CT00028", name: "Sushil Kumar", dept: "Site Operations", designation: "Senior Shopify Developer", reporting: "Suman Saha", joined: "14 Jul 2025" },
  { id: "CT0001", name: "Vedang Singh", dept: "Site Operations", designation: "Site Ops Head", reporting: "", joined: "26 Jun 2024" },
  { id: "CT00012", name: "Soumya Kanta Mohanty", dept: "Ecommerce", designation: "Head of E-commerce Operations", reporting: "Vedang Singh", joined: "03 Feb 2025" },
  { id: "CT00053", name: "Shaique Hossain", dept: "Marketing", designation: "Asst Manager CRM & Analytics", reporting: "Manav Goel", joined: "24 Feb 2026" },
  { id: "CT00020", name: "Rahul Bhatt", dept: "Site Operations", designation: "Associate Product Manager", reporting: "Parveen Jahan", joined: "21 Apr 2025" },
  { id: "CT00014", name: "Alok Kumar Choudhary", dept: "Ecommerce", designation: "Ecommerce Executive", reporting: "Soumya Kanta Mohanty", joined: "19 Feb 2025" },
  { id: "CT0009", name: "Khushi Ash", dept: "Human Resource", designation: "Assistant Manager HR", reporting: "Parveen Jahan", joined: "21 Jan 2025" },
  { id: "CT0007", name: "Suman Saha", dept: "Technology", designation: "Lead Web Developer", reporting: "Parveen Jahan", joined: "01 Jan 2025" },
  { id: "CT00051", name: "Pervez Ilyasi", dept: "Technology", designation: "Full-Stack Developer", reporting: "Vedang Singh", joined: "10 Feb 2026" },
  { id: "CT00032", name: "Syeda Rahmat", dept: "Design", designation: "Junior UI/UX Designer", reporting: "Madhushree BJ", joined: "02 Mar 2026" },
  { id: "CT00046", name: "Manikanteswara Reddy", dept: "Technology", designation: "QA Engineer", reporting: "Suhita Paik", joined: "01 Dec 2025" },
  { id: "CT00019", name: "Vadde Thirumalesh", dept: "Site Operations", designation: "Quality Analyst", reporting: "Suhita Paik", joined: "14 Apr 2025" },
  { id: "CT00036", name: "Deepak Kumar", dept: "Ecommerce", designation: "Shopify Developer", reporting: "Suman Saha", joined: "29 Sep 2025" },
  { id: "CT00048", name: "Paras Bagri", dept: "Technology", designation: "Junior Front-End Developer", reporting: "Suman Saha", joined: "05 Jan 2026" },
  { id: "CT00041", name: "Vibudh Rathore", dept: "Technology", designation: "Junior Developer", reporting: "Shubham Pandey", joined: "30 Oct 2025" },
  { id: "CT00021", name: "Supraja Ramkumar", dept: "Ecommerce", designation: "Ecommerce Executive", reporting: "Soumya Kanta Mohanty", joined: "12 May 2025" },
  { id: "CT00050", name: "Chandan Kumawat", dept: "Design", designation: "Shopify Developer", reporting: "Suman Saha", joined: "08 Jan 2026" },
  { id: "CT0006", name: "Manav Goel", dept: "Marketing", designation: "Marketing Manager - CRM", reporting: "Parveen Jahan", joined: "01 Dec 2024" },
  { id: "CT00035", name: "Suhita Paik", dept: "Site Operations", designation: "Senior Product Manager", reporting: "Parveen Jahan", joined: "11 Sep 2025" },
  { id: "CT00045", name: "Bhoopendra Singh", dept: "Design", designation: "Senior Shopify Developer", reporting: "Suman Saha", joined: "24 Nov 2025" },
  { id: "CT00025", name: "Mohammad Arif Uzair", dept: "Ecommerce", designation: "Senior Shopify Developer", reporting: "Suman Saha", joined: "29 May 2025" },
  { id: "CT0002", name: "Parveen Jahan", dept: "Leadership", designation: "Director", reporting: "", joined: "26 Jun 2024" },
  { id: "CT00027", name: "Parthapratim Dash", dept: "Ecommerce", designation: "Associate Site Ops Manager", reporting: "Soumya Kanta Mohanty", joined: "01 Jul 2025" },
];

const deptColors = {
  "Technology":     { bg: "#EDE9FE", color: "#6C5CE7" },
  "Ecommerce":      { bg: "#E6F1FB", color: "#185FA5" },
  "Design":         { bg: "#FBEAF0", color: "#993556" },
  "Site Operations":{ bg: "#E1F5EE", color: "#0F6E56" },
  "Marketing":      { bg: "#FAEEDA", color: "#854F0B" },
  "Human Resource": { bg: "#FCEBEB", color: "#A32D2D" },
  "Leadership":     { bg: "#F1EFE8", color: "#5F5E5A" },
};

const deptStats = Object.entries(
  employees.reduce((acc, e) => {
    const d = e.dept || "Other";
    acc[d] = (acc[d] || 0) + 1;
    return acc;
  }, {})
).sort((a, b) => b[1] - a[1]);

const maxCount = Math.max(...deptStats.map(([, c]) => c));

const recentJoiners = [...employees]
  .filter(e => e.joined.includes("2026"))
  .sort((a, b) => new Date(b.joined) - new Date(a.joined));

function getInitials(name) {
  return name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
}

function getDC(dept) {
  return deptColors[dept] || { bg: "#F1EFE8", color: "#5F5E5A" };
}

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Genie — Manager Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ minHeight: "100vh", background: "#F8F7FF", fontFamily: "system-ui, -apple-system, sans-serif", color: "#1a1a2e" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", background: "#fff", borderBottom: "1px solid #ebebeb", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "#6C5CE7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🧞</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 17 }}>Genie</div>
              <div style={{ fontSize: 12, color: "#888" }}>Manager dashboard</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#FCEBEB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#A32D2D" }}>KA</div>
            <span style={{ fontSize: 13, color: "#555" }}>Khushi Ash · HR Manager</span>
          </div>
        </div>

        <div style={{ padding: "1.5rem", maxWidth: 1100, margin: "0 auto" }}>

          <div style={{ fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Overview — June 2026</div>

          {/* Stat Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: "1.5rem" }}>
            {[
              { val: "37", label: "Total employees", delta: "Across 6 departments" },
              { val: String(recentJoiners.length), label: "Joined in 2026", delta: "New this year" },
              { val: "11", label: "Technology team", delta: "Largest department" },
              { val: "1", label: "HR team", delta: "That's you, Khushi!" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "1rem 1.25rem", border: "1px solid #ebebeb" }}>
                <div style={{ fontSize: 28, fontWeight: 600, color: "#6C5CE7" }}>{s.val}</div>
                <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{s.label}</div>
                <div style={{ fontSize: 11, marginTop: 6, color: "#888" }}>{s.delta}</div>
              </div>
            ))}
          </div>

          {/* Two columns */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.5rem" }}>

            {/* Department breakdown */}
            <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 12, padding: "1.25rem" }}>
              <div style={{ fontWeight: 500, fontSize: 14, marginBottom: "1rem" }}>Department headcount</div>
              {deptStats.map(([dept, count]) => {
                const dc = getDC(dept);
                return (
                  <div key={dept} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid #f5f5f5" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: dc.color, flexShrink: 0 }} />
                    <div style={{ flex: 1, fontSize: 13 }}>{dept}</div>
                    <div style={{ flex: 2, height: 7, background: "#f5f5f5", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 4, background: dc.color, width: `${(count / maxCount) * 100}%` }} />
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, width: 24, textAlign: "right", color: dc.color }}>{count}</div>
                  </div>
                );
              })}
            </div>

            {/* Recent joiners */}
            <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 12, padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div style={{ fontWeight: 500, fontSize: 14 }}>Recent joiners</div>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#EDE9FE", color: "#534AB7" }}>2026</span>
              </div>
              {recentJoiners.map((e) => {
                const dc = getDC(e.dept);
                return (
                  <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid #f5f5f5" }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: dc.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: dc.color, flexShrink: 0 }}>{getInitials(e.name)}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{e.name}</div>
                      <div style={{ fontSize: 11, color: "#999" }}>{e.designation} · {e.dept}</div>
                    </div>
                    <div style={{ fontSize: 11, color: "#bbb" }}>{e.joined}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full employee table */}
          <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 12, padding: "1.25rem" }}>
            <div style={{ fontWeight: 500, fontSize: 14, marginBottom: "1rem" }}>
              All employees <span style={{ fontSize: 12, color: "#bbb", fontWeight: 400 }}>({employees.length} total)</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #ebebeb" }}>
                    {["ID", "Name", "Department", "Designation", "Reporting To", "Joined"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontSize: 11, color: "#bbb", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((e) => {
                    const dc = getDC(e.dept);
                    const isMe = e.id === "CT0009";
                    return (
                      <tr key={e.id} style={{ borderBottom: "1px solid #f5f5f5", background: isMe ? "#FFF8F8" : "transparent" }}>
                        <td style={{ padding: "9px 10px", color: "#ccc", fontFamily: "monospace", fontSize: 11, whiteSpace: "nowrap" }}>{e.id}</td>
                        <td style={{ padding: "9px 10px", whiteSpace: "nowrap" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 26, height: 26, borderRadius: "50%", background: dc.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, color: dc.color, flexShrink: 0 }}>{getInitials(e.name)}</div>
                            <span style={{ fontWeight: isMe ? 600 : 400 }}>{e.name}{isMe ? " 👋" : ""}</span>
                          </div>
                        </td>
                        <td style={{ padding: "9px 10px", whiteSpace: "nowrap" }}>
                          <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: dc.bg, color: dc.color }}>{e.dept}</span>
                        </td>
                        <td style={{ padding: "9px 10px", color: "#555", fontSize: 12 }}>{e.designation || "—"}</td>
                        <td style={{ padding: "9px 10px", color: "#888", fontSize: 12, whiteSpace: "nowrap" }}>{e.reporting || "—"}</td>
                        <td style={{ padding: "9px 10px", color: "#bbb", fontSize: 12, whiteSpace: "nowrap" }}>{e.joined}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
