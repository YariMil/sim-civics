-- Ideas Workspace: each member's own ideas.
CREATE TABLE ideas (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title      TEXT    NOT NULL,
  body       TEXT    NOT NULL,
  tags       TEXT    NOT NULL DEFAULT '[]', -- JSON array of names from src/data/ideaTags.ts
  subtags    TEXT    NOT NULL DEFAULT '[]', -- JSON array; query with json_each() for similar ideas
  created_at INTEGER NOT NULL,              -- unix ms
  updated_at INTEGER NOT NULL               -- unix ms
);

CREATE INDEX ideas_user_id ON ideas(user_id, updated_at DESC);
