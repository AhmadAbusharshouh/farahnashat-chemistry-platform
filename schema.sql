-- D1 Database Schema for Chemistry Platform & Virtual Lab

CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  school TEXT DEFAULT 'المدرسة الإسلامية الحديثة',
  grade TEXT DEFAULT 'الصف التاسع',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id TEXT PRIMARY KEY,
  student_phone TEXT NOT NULL,
  student_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER DEFAULT 5,
  time_spent_seconds INTEGER NOT NULL,
  answers_json TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lab_experiments (
  id TEXT PRIMARY KEY,
  student_name TEXT NOT NULL,
  experiment_type TEXT NOT NULL, -- 'ph_meter', 'cabbage_indicator', 'titration'
  data_json TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS interview_feedback (
  id TEXT PRIMARY KEY,
  committee_member TEXT,
  rating INTEGER,
  notes TEXT,
  whatsapp_sent BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
