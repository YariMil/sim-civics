-- When a member says they sent an idea to their council member, and to whom.
-- The email goes out from their own email app, so this records their confirmation, not delivery.
ALTER TABLE ideas ADD COLUMN council_sent_at INTEGER; -- unix ms, NULL until marked as sent
ALTER TABLE ideas ADD COLUMN council_sent_to TEXT;    -- council member's name at the time
