import pymysql
import json

# Database connection details
DB_HOST = "final-project-databse.cryk06oa62be.us-east-1.rds.amazonaws.com"
DB_USER = "admin"
DB_PASSWORD = "123456789"
DB_NAME = "finalProject"

def lambda_handler(event, context):
    try:
        cors_headers = {
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Headers": "Content-Type",  
            "Access-Control-Allow-Methods": "GET, POST"  
        }

        connection = pymysql.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
            cursorclass=pymysql.cursors.DictCursor
        )

        query = "SELECT DISTINCT Commodity FROM Products"
        with connection.cursor() as cursor:
            cursor.execute(query)
            commodities = cursor.fetchall()

        connection.close()

        return {
            "statusCode": 200,
            "headers": cors_headers,  
            "body": json.dumps({"commodities": [commodity['Commodity'] for commodity in commodities]})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors_headers,  
            "body": json.dumps({"error": str(e)})
        }
