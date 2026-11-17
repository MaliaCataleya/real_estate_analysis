from sqlalchemy import create_engine
from sqlalchemy import text
from sqlalchemy.orm import Session
from sqlalchemy import MetaData
from sqlalchemy import Table, Column, Integer, String, Float
from sqlalchemy import ForeignKey

#TODO: mit postgres ersetzen
engine = create_engine("sqlite+pysqlite:///:memory:", echo=True)
metadata_obj = MetaData()

""" user_table = Table(
    "user_account",
    metadata_obj,
    Column("id", Integer, primary_key=True),
    Column("name", String(30)),
    Column("user_id", ForeignKey("user_account.id"), nullable=False),
    Column("fullname", String)) """

building_table = Table(
    "new_taipei",
    metadata_obj,
    Column("id", Integer, primary_key=True),  #TODO: automatisch erstellen lassen
    Column("district", String(30)),
    Column("rps01", String(256)),
    Column("rps02", String(256)),
    Column("rps03_area", Float(2)),
    Column("rps04", String(30)),
    Column("rps05", String(30)),
    Column("rps06", String(30)), 
    Column("rps07_yyymmddroc", Integer),
    Column("rps08", String(256)),
    Column("rps09", String(30)),
    Column("rps10", String(30)),
    Column("rps11", String(256)),
    Column("rps12", String(30)),
    Column("rps13", String(256)),
    Column("rps14_yyymmddroc", Integer),
    Column("rps15_area", Float(2)),
    Column("rps16_quantity", Integer),
    Column("rps17_quantity", Integer),
    Column("rps18_quantity", Integer),
    Column("rps19", String(30)),
    Column("rps20", String(30)),
    Column("rps21_amountsunitdollars", Integer),
    Column("rps22_amountsunitdollars", Integer),
    Column("rps23", String(30)),
    Column("rps24_area", Float(2)),
    Column("rps25_amountsunitdollars", Integer),
    Column("rps26", String(256)),
    Column("rps27", String(256)),
    Column("rps28_area", Float(2)),
    Column("rps29_area", Float(2)),
    Column("rps30_area", Float(2)),
    Column("rps31", String(30)),
    Column("rps32", Integer)
)

metadata_obj.create_all(engine)




""" stmt = text("SELECT x, y FROM some_table WHERE y > :y ORDER BY x, y")
with Session(engine) as session:
    session.execute(text("CREATE TABLE some_table (x int, y int)"))
    result = session.execute(stmt, {"y": 6})
    for row in result:
        print(f"x: {row.x}  y: {row.y}")
    session.commit() """