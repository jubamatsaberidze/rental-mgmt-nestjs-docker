# Car Rental System - with NestJS + Docker

### `Stack: NestJS, SQL, Docker`
![nestjs](https://user-images.githubusercontent.com/53910160/201094014-86da86a3-4a84-4d43-bd70-d3613ce25ee1.png) &nbsp;
![sql](https://user-images.githubusercontent.com/53910160/201094681-915f1cc3-37c1-4534-a990-5bf89f314f34.png) &nbsp;
![docker](https://user-images.githubusercontent.com/53910160/201095220-904f8e4f-8838-4739-b5f4-4bf3c97a36a4.png)
<br />

## Usage/Actions:
<ul>
  <li>Check if car is available.</li>
  <li>Calculate the cost of the lease for the requested period.</li>
  <li>Create a car rental session.</li>
  <li>Generete a report on the avarage car load per month, for each car and the total for all cars.</li>
</ul>

## Description
<ul style="list-style-type: square">
  <li>Basic Tariff - $1000 / day</li>
  <li>Tariffs:</li>
  1st - 4th   - Basic       => $1000 / day <br />
  5th - 9th   - Basic - 5%  => $950 / day <br />
  10th - 17th - Basic - 10% => $900 / day <br />
  18th - 29ht - Basic - 15% => $850 / day <br />
  `For example: 15 days => $14,150`
  <li>Max: 30 days</li>
</ul>

## Conditions
<ul>
  <li>Booking record can be made in past and future</li>
  <li>The pause between booking (for one car) must be 3 days.</li>
  <li>Beginning and ending of rental cannot land on Sat/Sun</li>
</ul>

## Development
<ul>
  <li>subd: PostgreSQL +9</li>
  <li>db: pure SQL</li>
  <li>deploy: Docker</li>
  <li>desc: Readme.md</li>
</ul>

## Installation
```bash
$ npm install
```
## Running the application
```bash
# development
$ npm run start
# watch mode
$ npm run start:dev
# production mode
$ npm run start:prod
```
## Run with Docker
```bash
$ docker-compose up --build
```
