CREATE TABLE IF NOT EXISTS visits (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 ip TEXT NOT NULL,
 city TEXT,
 region TEXT,
 country TEXT,
 device TEXT,
 os TEXT,
 browser TEXT,
 screen TEXT,
 timezone TEXT,
 page TEXT,
 visited_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS visits_time_idx ON visits(visited_at);