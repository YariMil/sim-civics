-- Ideas now have up to 2 general tags and at most one subtag (see src/data/ideaTags.ts).
-- The subtag moves from a JSON array to its own indexed column so similar ideas can be matched on it.
ALTER TABLE ideas ADD COLUMN subtag TEXT;

-- Keep at most the first 2 tags.
UPDATE ideas SET tags = (
  SELECT json_group_array(value) FROM (SELECT value FROM json_each(ideas.tags) ORDER BY key LIMIT 2)
);

-- Carry over the first old subtag whose new equivalent belongs to one of the idea's tags.
-- ("Taxes" is now a general tag, so it has no subtag equivalent and is dropped.)
UPDATE ideas SET subtag = (
  WITH renamed(old, new, parent) AS (
    VALUES
      ('Parks', 'Parks & Green Space', 'Environment'),
      ('Zoning', 'Zoning & Development', 'Housing'),
      ('Transit', 'Public Transit', 'Transportation')
  )
  SELECT renamed.new
  FROM json_each(ideas.subtags) AS old_subtag
  JOIN renamed ON renamed.old = old_subtag.value
  WHERE renamed.parent IN (SELECT value FROM json_each(ideas.tags))
  ORDER BY old_subtag.key
  LIMIT 1
);

-- The old `subtags` column is left in place (unused by the new code) so this migration can run
-- while the previous version of the site is still live. Drop it in a later migration.

CREATE INDEX ideas_subtag ON ideas(subtag);
