export const initial_query = `CREATE TABLE IF NOT EXISTS rents(
  id SERIAL PRIMARY KEY,
  startdate DATE NOT NULL,
  lastdate DATE NOT NULL,
  rent_price NUMERIC,
  car_id INTEGER
);
CREATE TABLE IF NOT EXISTS cars(
  id SERIAL PRIMARY KEY,
  name CHARACTER VARYING NOT NULL,
  license_plate CHARACTER VARYING NOT NULL
);	

DO $$
BEGIN
IF NOT EXISTS (SELECT * FROM cars) = true
THEN INSERT INTO cars ("name", "license_plate")
  VALUES
  ('Hyundai Accent', '6TRJ244'),
  ('Renault Logan', '7DKF721'),
  ('Hyundai Solaris', '6LFY542'),
  ('Toyota Corolla', '1EHU926'),
  ('Hyundai Accent', '9AMZ009');
END IF;
END;
$$;`;
