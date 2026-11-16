CREATE TABLE business_state (id TEXT PRIMARY KEY NOT NULL, revision INTEGER NOT NULL DEFAULT 0, data TEXT NOT NULL);
--> statement-breakpoint
CREATE TABLE private_files (id TEXT PRIMARY KEY NOT NULL, scope TEXT NOT NULL, name TEXT NOT NULL, mime TEXT NOT NULL, size INTEGER NOT NULL, created_at TEXT NOT NULL, expires_at TEXT, created_by TEXT NOT NULL);
