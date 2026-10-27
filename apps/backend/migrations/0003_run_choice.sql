-- The visitor's choice (suite and case IDs) and the Word evidence document of a run.
ALTER TABLE runs ADD COLUMN cases TEXT;
ALTER TABLE runs ADD COLUMN report_key TEXT;
