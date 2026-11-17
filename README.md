# Real Estate Analysis

## Overview

This project demonstrates how various technologies, including **PostgreSQL, Pandas, React, Express.js and SQLAlchemy** can be integrated into a single application.

The project is based on historical real-estate transaction data from **New Taipei City, Taiwan**, provided by [Taiwan's Open Data Platform](https://data.gov.tw/dataset/139700).

The goal is to develop a web application that supports real-estate investment and purchasing decisions by providing insights into historical property transactions.

## The Idea

The application processes historical real-estate transactions containing up to 32 different data points, including building size, construction year, transaction price, and other property characteristics.

A basic **ETL pipeline** handles the data acquisition and preprocessing:

1. **Extract:** Download the underlying transaction data.
2. **Transform:** Clean and preprocess the data using Python and Pandas.
3. **Load:** Store the processed data in a PostgreSQL database.

The database is accessed through an **Express.js backend**, which handles requests from the React frontend.

The frontend provides an interactive map of New Taipei City. By clicking on individual map markers, users can explore additional information about the respective districts, including average transaction characteristics and property prices.

Basic business logic has been implemented using selected transaction features to provide an initial foundation for evaluating potential real-estate purchases.

The project is actively being developed, with a particular focus on expanding the business logic and improving the evaluation of purchasing decisions.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Data Processing:** Python, Pandas, SQLAlchemy
- **Infrastructure:** Docker, Docker Compose
- **Mapping:** OpenLayers

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose

### Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Create a `.env` file in the project root directory. Use `.env.example` as a reference and configure your database credentials - especially `POSTGRES_PASSWORD`

3. Build and start the containers:

   ```bash
   docker compose up --build -d
   ```

4. Wait for the `etl_pipeline` container to finish processing and importing the data into PostgreSQL

5. Open the application in your browser:

   **http://localhost:5173**

The application should now be up and running.
