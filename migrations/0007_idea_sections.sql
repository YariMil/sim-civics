-- Ideas are written in three parts, like the steps on the Ideas intro:
-- what it is (the existing body column), where it would take place, and its intended impacts.
-- Ideas saved before this keep their text as "what it is", with the other two empty.
ALTER TABLE ideas ADD COLUMN place   TEXT NOT NULL DEFAULT '';
ALTER TABLE ideas ADD COLUMN impacts TEXT NOT NULL DEFAULT '';
