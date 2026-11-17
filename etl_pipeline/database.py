
from sqlalchemy import create_engine, MetaData, text
from sqlalchemy import Table, Column, BigInteger, Text, Float
import os
from dotenv import load_dotenv

load_dotenv()

db_user = os.getenv('POSTGRES_USER')
db_password = os.getenv('POSTGRES_PASSWORD')
db_name = os.getenv('POSTGRES_DB')

engine = create_engine(f"postgresql+psycopg://{db_user}:{db_password}@127.0.0.1:5432/{db_name}", echo=True)

metadata_obj = MetaData()


def save_to_database(filename):

    building_table = Table(
        "new_taipei",
        metadata_obj,
        Column("id", BigInteger, primary_key=True, autoincrement=True),
        Column("district", Text),
        Column("rps01", Text),
        Column("rps02", Text),
        Column("rps03_area", Float),
        Column("rps04", Text),
        Column("rps05", Text),
        Column("rps06", Text),
        Column("rps07_yyymmddroc", BigInteger),
        Column("rps08", Text),
        Column("rps09", Text),
        Column("rps10", Text),
        Column("rps11", Text),
        Column("rps12", Text),
        Column("rps13", Text),
        Column("rps14_yyymmddroc", BigInteger),
        Column("rps15_area", Float),
        Column("rps16_quantity", BigInteger),
        Column("rps17_quantity", BigInteger),
        Column("rps18_quantity", BigInteger),
        Column("rps19", Text),
        Column("rps20", Text),
        Column("rps21_amountsunitdollars", BigInteger),
        Column("rps22_amountsunitdollars", BigInteger),
        Column("rps23", Text),
        Column("rps24_area", Float),
        Column("rps25_amountsunitdollars", BigInteger),
        Column("rps26", Text),
        Column("rps27", Text),
        Column("rps28_area", Float),
        Column("rps29_area", Float),
        Column("rps30_area", Float),
        Column("rps31", Text),
        Column("rps32", BigInteger)
    )

    """ with engine.begin() as conn:
        conn.execute(text("DROP TABLE IF EXISTS new_taipei CASCADE")) """

    metadata_obj.create_all(engine)

    with open(f"./{filename}.csv", "r", encoding="utf-8", newline="") as f:
        connection = engine.raw_connection()

        try:
            with connection.cursor() as cursor:

                cmd = """
                    COPY new_taipei (
                        id, district, rps01, rps02, rps03_area,
                        rps04, rps05, rps06, rps07_yyymmddroc,
                        rps08, rps09, rps10, rps11, rps12,
                        rps13, rps14_yyymmddroc, rps15_area,
                        rps16_quantity, rps17_quantity, rps18_quantity,
                        rps19, rps20, rps21_amountsunitdollars,
                        rps22_amountsunitdollars, rps23, rps24_area,
                        rps25_amountsunitdollars, rps26, rps27,
                        rps28_area, rps29_area, rps30_area,
                        rps31, rps32
                    )
                    FROM STDIN
                    WITH (FORMAT CSV, HEADER TRUE)
                """

                with cursor.copy(cmd) as copy:
                    while chunk := f.read(1024 * 1024):
                        copy.write(chunk)

            connection.commit()
            print("CSV erfolgreich importiert!")

        except Exception:
            connection.rollback()
            raise

        finally:
            connection.close()

