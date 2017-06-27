
ALTER TABLE IF EXISTS ONLY public.accounts DROP CONSTRAINT IF EXISTS pk_accounts_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.planet_votes DROP CONSTRAINT IF EXISTS pk_planet_votes_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.planet_votes DROP CONSTRAINT IF EXISTS fk_accounts_id CASCADE;


DROP TABLE IF EXISTS public.accounts;
DROP SEQUENCE IF EXISTS public.accounts_id_seq;
CREATE TABLE accounts (
    id serial NOT NULL,
    user_name varchar(30) UNIQUE,
    password varchar(200),
    reg_date timestamp without time zone
);

ALTER TABLE ONLY accounts
    ADD CONSTRAINT pk_accounts_id PRIMARY KEY (id);


DROP TABLE IF EXISTS public.planet_votes;
DROP SEQUENCE IF EXISTS public.planet_votes_id_seq;
CREATE TABLE planet_votes (
    id serial NOT NULL,
    planet_name varchar(50),
    account_id int,
    sub_time timestamp without time zone,
    CONSTRAINT uk_one_vote_per_user UNIQUE (planet_name, account_id)
);


ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT pk_planet_votes_id PRIMARY KEY (id);


ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES accounts(id)
    ON UPDATE CASCADE ON DELETE NO ACTION;


INSERT INTO accounts VALUES (1, 'steve_jobs', 'pbkdf2:sha512:80000$RiM11IjO$8ca3536e997c74236dc4d69339b9415fa0ebfce50e5220ae518ead412059a70831f9471e6b0d10bccc9cb8861b92f3ad63a09efe3515667cdaa3b029a8946d8d', '2017-05-23 10:25:32');
INSERT INTO accounts VALUES (2, 'neo_anderson', 'pbkdf2:sha512:80000$4rbilA0W$774fba3ab0296e25a0145264d55852037f29ca7bfe65169da1bcb8d3f527275425c13e5426807bc490558f8a36546f747e2b63330e58c141a6805ca2bfcecaa5', '2017-05-23 10:25:32');
INSERT INTO accounts VALUES (3, 'bill_gates', 'pbkdf2:sha512:80000$RNuJhjfD$3de4a2689363cc8e146127c580cbb12bd2fd375f8cf9b9341d66ecade390708e1071149c40709c672313c92a8b8973751776496e40cf30db66676dce5b98b475', '2017-05-23 10:25:32');
INSERT INTO accounts VALUES (4, 'zuckerberg', 'pbkdf2:sha512:80000$rsTIFHNU$6803cd4f33d9b21d9a28863f728124d8307d387ad041df007d129c24875a6de94ac8f8845ebc70ee51437a7cf4cc2c029d886c8d4a7b621641670843092ee7aa', '2017-05-23 10:25:32');
INSERT INTO accounts VALUES (5, 'admin', 'pbkdf2:sha512:80000$emejRYOP$d93009f5aa599127198a8b53d9d14de03f0cb5a1df42cd5d85e44da10e72ea6321a9e0e9d7025e41971da3d36d4cb013126d5c60ea3d46d353dc7edfb3ab77fc', '2017-05-23 10:25:32');
SELECT pg_catalog.setval('accounts_id_seq', 5, true);


INSERT INTO planet_votes VALUES (1, 'Alderaan', 1, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (2, 'Alderaan', 2, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (3, 'Alderaan', 3, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (4, 'Alderaan', 5, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (5, 'Coruscant', 5, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (6, 'Coruscant', 4, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (7, 'Coruscant', 3, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (8, 'Coruscant', 2, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (9, 'Coruscant', 1, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (10, 'Naboo', 5, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (11, 'Naboo', 1, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (12, 'Dagobah', 5, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (13, 'Dagobah', 1, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (14, 'Dagobah', 2, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (15, 'Hoth', 5, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (16, 'Hoth', 1, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (17, 'Tatooine', 5, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (18, 'Tatooine', 4, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (19, 'Tatooine', 3, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (20, 'Tatooine', 2, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (21, 'Tatooine', 1, '2017-05-23 10:25:33');
INSERT INTO planet_votes VALUES (22, 'Kashyyyk', 5, '2017-05-23 10:25:33');
SELECT pg_catalog.setval('planet_votes_id_seq', 22, true);
