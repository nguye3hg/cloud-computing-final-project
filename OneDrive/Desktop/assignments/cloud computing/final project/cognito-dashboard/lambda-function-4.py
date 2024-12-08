import pymysql
import json
from decimal import Decimal

# Database connection details
db_host = "final-project-databse.cryk06oa62be.us-east-1.rds.amazonaws.com"
db_user = "admin"
db_password = "123456789"
db_name = "finalProject"

# Custom JSON encoder to handle Decimal
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)  
        return super(DecimalEncoder, self).default(obj)

def lambda_handler(event, context):
    headers = event.get("headers", {})
    origin = headers.get("origin", "*")  

    query_params = event.get("queryStringParameters", {})
    query_type = query_params.get("type", "churn")  

    connection = pymysql.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=db_name,
        cursorclass=pymysql.cursors.DictCursor,
    )

    try:
        if query_type == "churn":
            query = """
                SELECT 
                    Hshd_num AS householdId,
                    MAX(Year) AS lastPurchaseYear,
                    MAX(Week_num) AS lastPurchaseWeek,
                    DATEDIFF(CURDATE(), STR_TO_DATE(CONCAT(MAX(Year), '-', MAX(Week_num), '-1'), '%Y-%u-%w')) AS daysSinceLastPurchase,
                    COUNT(*) AS totalTransactions
                FROM Transactions
                GROUP BY Hshd_num
                HAVING totalTransactions < 10 OR daysSinceLastPurchase > 365
                ORDER BY daysSinceLastPurchase DESC, totalTransactions ASC;
            """
        else:
            return {
                "statusCode": 400,
                "headers": {
                    "Access-Control-Allow-Origin": origin,
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "GET",
                },
                "body": json.dumps({"error": f"Invalid query type: {query_type}"}),
            }

        with connection.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET",
            },
            "body": json.dumps(result, cls=DecimalEncoder),
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET",
            },
            "body": json.dumps({"error": str(e)}),
        }
    finally:
        connection.close()
