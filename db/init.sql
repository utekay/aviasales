\connect aviasales;

CREATE TABLE public.visitors (
    id uuid PRIMARY KEY,
    shared boolean NOT NULL,
    email varchar(64) NOT NULL
);

-- TODO: index