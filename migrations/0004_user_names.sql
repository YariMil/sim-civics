-- Members' names, shown next to their email in "Find people with similar ideas".
-- Accounts created before this have an empty name until they add one on the Account page.
ALTER TABLE users ADD COLUMN name TEXT NOT NULL DEFAULT '';
