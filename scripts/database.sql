-- Messages table
CREATE TABLE public.message
(
    message_id character varying,
    body character varying,
	sent character varying,
    CONSTRAINT message_id PRIMARY KEY (message_id)
)

TABLESPACE pg_default;

ALTER TABLE public.sale
    OWNER to flp;