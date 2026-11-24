CREATE TABLE IF NOT EXISTS tandem_community_applications (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,

  first_name TEXT NOT NULL,
  email TEXT NOT NULL,

  age_range TEXT NOT NULL,
  location_area TEXT NOT NULL,
  neighborhood TEXT,

  gender_identity TEXT NOT NULL,
  gender_self_description TEXT,
  interested_in TEXT NOT NULL,

  relationship_intention TEXT NOT NULL,

  event_interest TEXT NOT NULL,
  availability TEXT,

  interest_reason TEXT,
  acquisition_source TEXT NOT NULL,
  referral_source TEXT,
  referral_code TEXT,

  social_link TEXT,

  primary_archetype TEXT,
  secondary_archetype TEXT,
  source TEXT NOT NULL DEFAULT 'direct',

  marketing_consent INTEGER NOT NULL DEFAULT 0,

  application_status TEXT NOT NULL DEFAULT 'new'
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_tandem_community_email
ON tandem_community_applications(email);

CREATE INDEX IF NOT EXISTS idx_tandem_community_created_at
ON tandem_community_applications(created_at);

CREATE INDEX IF NOT EXISTS idx_tandem_community_event_interest
ON tandem_community_applications(event_interest);

CREATE INDEX IF NOT EXISTS idx_tandem_community_primary_archetype
ON tandem_community_applications(primary_archetype);

CREATE INDEX IF NOT EXISTS idx_tandem_community_acquisition_source
ON tandem_community_applications(acquisition_source);

CREATE TABLE IF NOT EXISTS tandem_partner_inquiries (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,

  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT NOT NULL,
  website_or_social TEXT,
  organization_type TEXT NOT NULL,
  audience_size TEXT,
  collaboration_interest TEXT NOT NULL,
  notes TEXT,

  inquiry_status TEXT NOT NULL DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_tandem_partners_created_at
ON tandem_partner_inquiries(created_at);

CREATE INDEX IF NOT EXISTS idx_tandem_partners_email
ON tandem_partner_inquiries(email);

CREATE INDEX IF NOT EXISTS idx_tandem_partners_organization_type
ON tandem_partner_inquiries(organization_type);

PRAGMA optimize;
