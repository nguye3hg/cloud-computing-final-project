import pymysql
import json
from decimal import Decimal  # Import Decimal to handle Decimal objects

# Database connection details
DB_HOST = "final-project-databse.cryk06oa62be.us-east-1.rds.amazonaws.com"
DB_USER = "admin"
DB_PASSWORD = "123456789"
DB_NAME = "finalProject"

# Helper function to convert Decimal to JSON-serializable types
def convert_decimal(obj):
    if isinstance(obj, Decimal):
        return float(obj)  
    raise TypeError("Type not serializable")

def lambda_handler(event, context):
    hshd_num = event.get("queryStringParameters", {}).get("hshd_num", None)

    if not hshd_num:
        return {
            "statusCode": 400,
            "headers": {
                "Access-Control-Allow-Origin": "*",  
                "Access-Control-Allow-Headers": "Content-Type",  
                "Access-Control-Allow-Methods": "GET",  
            },
            "body": json.dumps({"error": "Missing required parameter: hshd_num"})
        }
    
    try:
        connection = pymysql.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
            cursorclass=pymysql.cursors.DictCursor
        )
        
        with connection.cursor() as cursor:
            # Query to fetch data from the Transactions table for a specific Hshd_num
            query = """
                        SELECT 
                            t.Hshd_num, 
                            t.Basket_num, 
                            t.Date, 
                            t.Product_num, 
                            t.Spend, 
                            t.Units, 
                            t.Store_region, 
                            t.Week_num, 
                            t.Year,
                            p.Department, 
                            p.Commodity, 
                            p.Brand_type, 
                            p.Natural_organic_flag,
                            h.Loyalty_flag,
                            h.Age_range,
                            h.Marital_status,
                            h.Income_range,
                            h.Homeowner_desc,
                            h.Hshd_composition,
                            h.Hshd_size,
                            h.Children
                        FROM Transactions t
                        JOIN Products p ON t.Product_num = p.Product_num
                        JOIN Households h ON t.Hshd_num = h.Hshd_num
                        WHERE t.Hshd_num = %s
                        ORDER BY 
                            t.Hshd_num, 
                            t.Basket_num, 
                            t.Date, 
                            t.Product_num, 
                            p.Department, 
                            p.Commodity;
                    """

            cursor.execute(query, (hshd_num,))
            results = cursor.fetchall()

        connection.close()

        json_results = json.dumps(results, default=convert_decimal)

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",  
                "Access-Control-Allow-Headers": "Content-Type", 
                "Access-Control-Allow-Methods": "GET",  
            },
            "body": json_results
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",  
                "Access-Control-Allow-Headers": "Content-Type",  
                "Access-Control-Allow-Methods": "GET", 
            },
            "body": json.dumps({"error": str(e)})
        }