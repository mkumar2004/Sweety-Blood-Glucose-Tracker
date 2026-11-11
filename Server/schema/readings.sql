CREATE TABLE IF NOT EXISTS glucose_readings (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    reading_date DATE NOT NULL,

    time_slot VARCHAR(30) NOT NULL
        CHECK (
            time_slot IN (
                'morning',
                'after_breakfast',
                'after_lunch',
                'after_dinner'
            )
        ),

    value INTEGER NOT NULL
        CHECK (value BETWEEN 40 AND 600),

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (user_id, reading_date, time_slot)
);