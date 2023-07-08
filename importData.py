# Importing CSV file into DataFrame
import pandas as pd
empdata = pd.read_csv('/Users/cbui83/Downloads/Pokemon 2.csv', index_col = False, delimiter = ',')
# Some Pokemon don't have 2nd type, so I converted them to null
empdata = empdata.where((pd.notnull(empdata)), None)
empdata.head()

import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
load_dotenv()
import os

try:
    # Attempt to connect to DB
    connection = mysql.connector.connect(host=os.environ.get("DB_HOST"),
                                         database=os.environ.get("DB_DATABASE"),
                                         user=os.environ.get("DB_USER"),
                                         password=os.environ.get("DB_PASSWORD"))
    if connection.is_connected():
        # Display DB info
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print("You're connected to database: ", record)

        # Create a new Pokemon data table if it doesn't already exist
        cursor.execute("DROP TABLE IF EXISTS pokemon_data;")
        print("Creating the Table...")
        # Create table corresponding to csv file fields
        cursor.execute("CREATE TABLE pokemon_data(ID INT, Name VARCHAR(255), Type1 VARCHAR(255), Type2 VARCHAR(255), Total INT, HP INT, Attack INT, Defense INT, Sp_Atk INT, Sp_Def INT, Speed INT, Generation INT, Legendary BOOLEAN)")
        print("Table has been created.")
        # Iterate through dataframe and insert into table
        for i, row in empdata.iterrows():
            # The amount of %s corresponds to how many columns are in the csv 
            sql = "INSERT INTO Pokemon.pokemon_data VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            cursor.execute(sql, tuple(row))
            print("Record inserted.")
            connection.commit()
except Error as e:
    print("Error while connecting to MySQL", e)
finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")