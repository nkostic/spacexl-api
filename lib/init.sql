CREATE TABLE IF NOT EXISTS public.rockets (
	id serial NOT NULL,
	rocket_name text NOT NULL,
	rocket_type text NULL,
	reused bool NOT NULL,
	land_success bool NULL,
	CONSTRAINT rockets_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.flights (
	id serial NOT NULL,
	launch_date timestamp NOT NULL,
	details text NULL,
	rocket_id int4 NOT NULL,
	flight_number int4 NOT NULL,
	CONSTRAINT flights_pk PRIMARY KEY (id)
);

ALTER TABLE public.flights ADD CONSTRAINT flights_fk FOREIGN KEY (rocket_id) REFERENCES rockets(id);

CREATE TABLE IF NOT EXISTS public.links (
	id serial NOT NULL,
	flight_id int4 NOT NULL,
	mission_patch text NULL,
	mission_patch_small text NULL,
	article_link text NULL,
	reddit_launch bool NULL,
	CONSTRAINT links_pk PRIMARY KEY (id)
);

ALTER TABLE public.links ADD CONSTRAINT links_fk FOREIGN KEY (flight_id) REFERENCES flights(id);



