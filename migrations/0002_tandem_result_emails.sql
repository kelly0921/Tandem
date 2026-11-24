CREATE TABLE IF NOT EXISTS tandem_result_emails (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,

  first_name TEXT,
  email TEXT NOT NULL,

  primary_archetype TEXT NOT NULL,
  secondary_archetype TEXT NOT NULL,

  marketing_consent INTEGER NOT NULL DEFAULT 0,
  delivery_status TEXT NOT NULL DEFAULT 'stored',
  delivery_error TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_tandem_result_emails_email
ON tandem_result_emails(email);

CREATE INDEX IF NOT EXISTS idx_tandem_result_emails_created_at
ON tandem_result_emails(created_at);

CREATE INDEX IF NOT EXISTS idx_tandem_result_emails_primary_archetype
ON tandem_result_emails(primary_archetype);

PRAGMA optimize;
