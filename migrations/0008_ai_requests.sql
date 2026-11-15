-- One row per "Refine with AI" request, so each member's daily use can be capped.
-- Only the time and kind are kept, never the idea text that was sent.
CREATE TABLE ai_requests (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind       TEXT    NOT NULL, -- 'polish' or 'suggest'
  created_at INTEGER NOT NULL  -- unix ms
);

CREATE INDEX ai_requests_user_time ON ai_requests(user_id, created_at);
