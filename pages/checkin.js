import Head from "next/head";
import { useState } from "react";

const employees = [
  { id: "CT00011", name: "Apratim Mahata", dept: "Technology" },
  { id: "CT00030", name: "Ronit Shrestha", dept: "Ecommerce" },
  { id: "CT00031", name: "Muskan Mondal", dept: "Design" },
  { id: "CT00013", name: "Shubham Pandey", dept: "Technology" },
  { id: "CT00049", name: "Tilak Rathoure", dept: "Technology" },
  { id: "CT00015", name: "Hrithik Singh", dept: "Site Operations" },
  { id: "CT00010", name: "Ruhbana Hasan", dept: "Ecommerce" },
  { id: "CT00037", name: "Swastik Sharma", dept: "Technology" },
  { id: "CT00026", name: "Mohan Nandanawad", dept: "Site Operations" },
  { id: "CT00043", name: "Shreyansh Srivastava", dept: "Technology" },
  { id: "CT00038", name: "Ashvin Tyagi", dept: "Marketing" },
  { id: "CT00023", name: "Soumesh Kundu", dept: "Technology" },
  { id: "CT0004",  name: "Madhushree BJ", dept: "Design" },
  { id: "CT00034", name: "Aditya Sharma", dept: "Site Operations" },
  { id: "CT00028", name: "Sushil Kumar", dept: "Site Operations" },
  { id: "CT0001",  name: "Vedang Singh", dept: "Site Operations" },
  { id: "CT00012", name: "Soumya Kanta Mohanty", dept: "Ecommerce" },
  { id: "CT00053", name: "Shaique Hossain", dept: "Marketing" },
  { id: "CT00020", name: "Rahul Bhatt", dept: "Site Operations" },
  { id: "CT00014", name: "Alok Kumar Choudhary", dept: "Ecommerce" },
  { id: "CT0009",  name: "Khushi Ash", dept: "Human Resource" },
  { id: "CT0007",  name: "Suman Saha", dept: "Technology" },
  { id: "CT00051", name: "Pervez Ilyasi", dept: "Technology" },
  { id: "CT00032", name: "Syeda Rahmat", dept: "Design" },
  { id: "CT00046", name: "Manikanteswara Reddy", dept: "Technology" },
  { id: "CT00019", name: "Vadde Thirumalesh", dept: "Site Operations" },
  { id: "CT00036", name: "Deepak Kumar", dept: "Ecommerce" },
  { id: "CT00048", name: "Paras Bagri", dept: "Technology" },
  { id: "CT00041", name: "Vibudh Rathore", dept: "Technology" },
  { id: "CT00021", name: "Supraja Ramkumar", dept: "Ecommerce" },
  { id: "CT00050", name: "Chandan Kumawat", dept: "Design" },
  { id: "CT0006",  name: "Manav Goel", dept: "Marketing" },
  { id: "CT00035", name: "Suhita Paik", dept: "Site Operations" },
  { id: "CT00045", name: "Bhoopendra Singh", dept: "Design" },
  { id: "CT00025", name: "Mohammad Arif Uzair", dept: "Ecommerce" },
  { id: "CT0002",  name: "Parveen Jahan", dept: "Leadership" },
  { id: "CT00027", name: "Parthapratim Dash", dept: "Ecommerce" },
];

const moods = [
  { val: 1, emoji: "😞", label: "Struggling" },
  { val: 2, emoji: "😕", label: "Not great" },
  { val: 3, emoji: "😐", label: "Okay" },
  { val: 4, emoji: "🙂", label: "Good" },
  { val: 5, emoji: "😄", label: "Great!" },
];

export default function CheckIn() {
  const [empId, setEmpId] = useState("");
  const [matched, setMatched] = useState(null);
  const [idError, setIdError] = useState("");
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("idle");
  const [milestone, setMilestone] = useState(null);

  async function handleIdBlur() {
    const emp = employees.find(e => e.id.toLowerCase() === empId.trim().toLowerCase());
    if (emp) {
      setMatched(emp);
      setIdError("");

      // Check milestone
      const res = await fetch(`/api/milestones?id=${emp.id}`);
      const data = await res.json();
      setMilestone(data.milestone || null);

      // Send nudge email
      await fetch("/api/send-nudge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: emp.name,
          dept: emp.dept,
          milestone: data.milestone || null,
        }),
      });

    } else {
      setMatched(null);
      setMilestone(null);
      if (empId.trim()) setIdError("Employee ID not found. Try e.g. CT0009");
    }
  }

  async function handleSubmit() {
    if (!matched || !mood) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employee_id: matched.id,
          employee_name: matched.name,
          dept: matched.dept,
          mood,
          note,
        }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ minHeight: "100vh", background: "#F8F7FF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 56 }}>{moods.find(m => m.val === mood)?.emoji}</div>
          <div style={{ fontSize: 22, fontWeight: 600, marginTop: 16 }}>Thanks, {matched?.name?.split(" ")[0]}!</div>
          <div style={{ color: "#888", marginTop: 8 }}>Your check-in has been saved.</div>
          <button onClick={() => { setStatus("idle"); setEmpId(""); setMatched(null); setMood(null); setNote(""); setMilestone(null); }}
            style={{ marginTop: 24, padding: "10px 24px", background: "#6C5CE7", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14 }}>
            Check in again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Genie — Daily Check-in</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ minHeight: "100vh", background: "#F8F7FF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif", padding: "1.5rem" }}>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #ebebeb", padding: "2rem", width: "100%", maxWidth: 440 }}>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.75rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "#6C5CE7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🧞</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 16 }}>Daily Check-in</div>
              <div style={{ fontSize: 12, color: "#999" }}>How are you feeling today?</div>
            </div>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>Your Employee ID</label>
            <input
              value={empId}
              onChange={e => { setEmpId(e.target.value); setMatched(null); setIdError(""); }}
              onBlur={handleIdBlur}
              placeholder="e.g. CT0009"
              style={{ width: "100%", padding: "10px 12px", border: `1px solid ${idError ? "#e74c3c" : "#e0e0e0"}`, borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
            />
            {idError && <div style={{ fontSize: 11, color: "#e74c3c", marginTop: 4 }}>{idError}</div>}
            {matched && (
              <div style={{ marginTop: 8, padding: "8px 12px", background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 8, fontSize: 13, color: "#166534" }}>
                ✓ {matched.name} · {matched.dept}
              </div>
            )}
          </div>

          {milestone && (
            <div style={{ marginBottom: "1rem", padding: "10px 14px", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#92400E" }}>
                🎯 {milestone === 365 ? "1 Year" : `${milestone}-Day`} Check-in
              </div>
              <div style={{ fontSize: 12, color: "#B45309", marginTop: 3 }}>
                This is a milestone check-in. Your feedback helps us support you better!
              </div>
            </div>
          )}

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 10 }}>How's your mood?</label>
            <div style={{ display: "flex", gap: 8 }}>
              {moods.map(m => (
                <button key={m.val} onClick={() => setMood(m.val)}
                  style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: `2px solid ${mood === m.val ? "#6C5CE7" : "#ebebeb"}`, background: mood === m.val ? "#EDE9FE" : "#fff", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}>
                  <div style={{ fontSize: 22 }}>{m.emoji}</div>
                  <div style={{ fontSize: 10, color: mood === m.val ? "#6C5CE7" : "#999", marginTop: 3 }}>{m.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>Anything on your mind? <span style={{ color: "#bbb" }}>(optional)</span></label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Share what's going on..."
              rows={3}
              style={{ width: "100%", padding: "10px 12px", border: "1px solid #e0e0e0", borderRadius: 8, fontSize: 13, resize: "none", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!matched || !mood || status === "loading"}
            style={{ width: "100%", padding: "12px", background: matched && mood ? "#6C5CE7" : "#e0e0e0", color: matched && mood ? "#fff" : "#aaa", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: matched && mood ? "pointer" : "not-allowed" }}>
            {status === "loading" ? "Saving..." : "Submit Check-in"}
          </button>

          {status === "error" && <div style={{ fontSize: 12, color: "#e74c3c", textAlign: "center", marginTop: 10 }}>Something went wrong. Please try again.</div>}
        </div>
      </div>
    </>
  );
}
