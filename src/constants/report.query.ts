export const report_query = (year: number, month: number) => {
  const query = `SELECT id, COALESCE(usage_in_percents, '0%') as usage, name, license_plate, '${year}-${month}' as month FROM
(SELECT car_id, TO_CHAR(SUM(diff) / (SELECT extract(days FROM date_trunc('month', date('${year}-${month}-01')) + interval '1 month - 1 day')) * 100, 'fm00D00%') as Usage_In_Percents FROM
(SELECT                      
    car_id, startdate,lastdate,
    DATE_PART('day', (date_trunc('month', startdate::date) + interval '1 month' - interval '1 day')::date::timestamp - startdate::timestamp)
    AS diff
FROM rents
WHERE (EXTRACT(MONTH FROM startdate) = ${month}
AND EXTRACT(YEAR FROM startdate) = ${year})
AND EXTRACT(MONTH FROM lastdate) != ${month}
UNION
SELECT 
    car_id, startdate,lastdate,
    DATE_PART('day', lastdate::timestamp - startdate::timestamp)
    AS diff_same
FROM rents
WHERE (EXTRACT(MONTH FROM startdate) = ${month}
AND EXTRACT(YEAR FROM startdate) = ${year})
AND EXTRACT(MONTH FROM lastdate) = ${month}
GROUP BY car_id, startdate, lastdate
---CHECK FOR "lastdate"
UNION
SELECT 
    car_id, startdate,lastdate,
    DATE_PART('day', lastdate::date::timestamp)
    AS diff_same
FROM rents
WHERE (EXTRACT(MONTH FROM lastdate) = ${month}
AND EXTRACT(YEAR FROM lastdate) = ${year})
AND EXTRACT(MONTH FROM startdate) != ${month}
GROUP BY car_id, startdate, lastdate
UNION
        SELECT 
    car_id, startdate,lastdate,
    DATE_PART('day', lastdate::timestamp - startdate::timestamp)
    AS diff_same
FROM rents
WHERE (EXTRACT(MONTH FROM lastdate) = ${month}
AND EXTRACT(YEAR FROM lastdate) = ${year})
AND EXTRACT(MONTH FROM startdate) = ${month}
GROUP BY car_id, startdate, lastdate
)
as report
GROUP BY car_id)
rents
RIGHT JOIN 
(SELECT id, name, license_plate FROM cars)
cars
ON rents.car_id = cars.id 
`;

  return query;
};
