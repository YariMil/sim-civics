-- LA City Council directory used by "Send to Council Member".
-- Source: the official lacity.gov directory (lacity.gov/directory/councilmember-district-N),
-- checked 2026-10-31. Update a row when a seat changes hands, for example:
--   npx wrangler d1 execute sim-civics --remote --command "UPDATE council_members SET name = '…', salutation = 'Councilmember …', email = '…', checked_on = '2026-12-14' WHERE district = 5"
CREATE TABLE council_members (
  district   INTEGER PRIMARY KEY CHECK (district BETWEEN 1 AND 15),
  name       TEXT NOT NULL,
  salutation TEXT NOT NULL, -- used after "Dear" in the email
  email      TEXT NOT NULL,
  website    TEXT NOT NULL,
  checked_on TEXT NOT NULL  -- date the details were last confirmed on lacity.gov
);

INSERT INTO council_members (district, name, salutation, email, website, checked_on) VALUES
  (1,  'Eunisses Hernandez',      'Councilmember Hernandez',      'councilmember.hernandez@lacity.org',      'https://cd1.lacity.gov',  '2026-10-31'),
  (2,  'Adrin Nazarian',          'Councilmember Nazarian',       'councilmember.nazarian@lacity.org',       'https://cd2.lacity.gov',  '2026-10-31'),
  (3,  'Bob Blumenfield',         'Councilmember Blumenfield',    'councilmember.blumenfield@lacity.org',    'https://cd3.lacity.gov',  '2026-10-31'),
  (4,  'Nithya Raman',            'Councilmember Raman',          'contactcd4@lacity.org',                   'https://cd4.lacity.gov',  '2026-10-31'),
  (5,  'Katy Yaroslavsky',        'Councilmember Yaroslavsky',    'councilmember.yaroslavsky@lacity.org',    'https://cd5.lacity.gov',  '2026-10-31'),
  (6,  'Imelda Padilla',          'Councilmember Padilla',        'councilmember.padilla@lacity.org',        'https://cd6.lacity.gov',  '2026-10-31'),
  (7,  'Monica Rodriguez',        'Councilmember Rodriguez',      'councilmember.rodriguez@lacity.org',      'https://cd7.lacity.gov',  '2026-10-31'),
  (8,  'Marqueece Harris-Dawson', 'Councilmember Harris-Dawson',  'councilmember.harris-dawson@lacity.org',  'https://cd8.lacity.gov',  '2026-10-31'),
  (9,  'Curren D. Price, Jr.',    'Councilmember Price',          'councilmember.price@lacity.org',          'https://cd9.lacity.gov',  '2026-10-31'),
  (10, 'Heather Hutt',            'Councilmember Hutt',           'cd10@lacity.org',                         'https://cd10.lacity.gov', '2026-10-31'),
  (11, 'Traci Park',              'Councilmember Park',           'councilmember.park@lacity.org',           'https://cd11.lacity.gov', '2026-10-31'),
  (12, 'John Lee',                'Councilmember Lee',            'councilmember.lee@lacity.org',            'https://cd12.lacity.gov', '2026-10-31'),
  (13, 'Hugo Soto-Martínez',      'Councilmember Soto-Martínez',  'councilmember.soto-martinez@lacity.org',  'https://cd13.lacity.gov', '2026-10-31'),
  (14, 'Ysabel J. Jurado',        'Councilmember Jurado',         'councilmember.jurado@lacity.org',         'https://cd14.lacity.gov', '2026-10-31'),
  (15, 'Tim McOsker',             'Councilmember McOsker',        'councilmember.mcosker@lacity.org',        'https://cd15.lacity.gov', '2026-10-31');
