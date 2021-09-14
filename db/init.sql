\connect aviasales;

CREATE TABLE public.visitors (
    id uuid PRIMARY KEY,
    shared boolean NOT NULL,
    email varchar(64) NOT NULL
);

CREATE UNIQUE INDEX email ON public.visitors (email); 