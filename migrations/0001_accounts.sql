-- Accounts for saving progress and the Ideas Workspace.
CREATE TABLE users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT    NOT NULL UNIQUE,
  password_hash TEXT    NOT NULL,          -- "pbkdf2$<iterations>$<salt>$<hash>" (base64)
  district      INTEGER NOT NULL CHECK (district BETWEEN 1 AND 15),
  affiliated    TEXT    NOT NULL CHECK (affiliated IN ('yes', 'no', 'unspecified')),
  organization  TEXT    NOT NULL DEFAULT '',
  discoverable  INTEGER NOT NULL DEFAULT 0, -- 1 = other members may see this email
  created_at    INTEGER NOT NULL           -- unix ms
);

-- Only a SHA-256 hash of each session token is stored, so a database leak can't be used to log in.
CREATE TABLE sessions (
  token_hash TEXT    PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL              -- unix ms
);

CREATE INDEX sessions_user_id ON sessions(user_id);
CREATE INDEX sessions_expires_at ON sessions(expires_at);
