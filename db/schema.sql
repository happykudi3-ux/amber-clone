-- Run this once in your Vercel Postgres / Neon SQL console

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  join_date DATE NOT NULL,
  manager_email TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  message TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('employee', 'bot')),
  sentiment TEXT,             -- 'positive' | 'neutral' | 'negative'
  concern_score INTEGER,      -- 1-5, filled in by sentiment.js
  tags JSONB,                 -- e.g. ["comp", "manager"]
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE milestones (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  type TEXT NOT NULL,         -- 'day_30' | 'anniversary' | 'post_appraisal'
  trigger_date DATE NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conversations_employee ON conversations(employee_id);
CREATE INDEX idx_milestones_employee ON milestones(employee_id);

-- Sample test employee so you have something to call the API with
INSERT INTO employees (name, email, join_date, manager_email)
VALUES ('Test Employee', 'test@yourcompany.com', CURRENT_DATE - INTERVAL '30 days', 'manager@yourcompany.com');
