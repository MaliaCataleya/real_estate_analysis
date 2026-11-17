# Real-Estate Analysis

## The Idea 

This is a sample project showcasing the incorporation of PostgreSQL, Pandas, React, Express.js and SQLAlchemy into a single project based on [past real-estate transaction data](https://pages.github.com/](https://data.gov.tw/dataset/139700) of New Taipei City, Taiwan.

The idea is a simple WebApplication to support real-estate business decisions based on past transactions.

The underlying data represents past real-estate deals containing information such as the size of the building, year it was built, the total cost and many more summing up to 32 data points.

Basic business logic was implemented using a selection of these transaction features.

Upon clicking a pin on the map, further details appear providing information about the mean transaction in the respective district.

This project is being actively developed and thus improved - especially regarding purchase decision evaluation.

## Get Started

1. Make sure, Docker is installed
2. Clone this Repo
3. Please refer to `.env.example` and create a new `.env` file at the same location altering the value of `POSTGRES_PASSWORD`
5. Run `docker compose up --build -d` 
6. As soon as the etl_pipeline Container has finished, the WebApplication can be tested at localhost:5173 in the Browser
