import pymysql
import json
from decimal import Decimal

# Database connection details
db_host = "final-project-databse.cryk06oa62be.us-east-1.rds.amazonaws.com"
db_user = "admin"
db_password = "123456789"
db_name = "finalProject"

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj) 
        return super(DecimalEncoder, self).default(obj)

def lambda_handler(event, context):
    headers = event.get("headers", {})
    origin = headers.get("origin", "*")  
    queries = {
        "demographics": """
            SELECT Hshd_size AS householdSize, AVG(Spend) AS spending
            FROM Transactions
            JOIN Households ON Transactions.Hshd_num = Households.Hshd_num
            GROUP BY Hshd_size;
        """,
        "engagement": """
            SELECT Year, SUM(Spend) AS totalSpending
            FROM Transactions
            GROUP BY Year
            ORDER BY Year ASC;
        """,
        "basket": """
            SELECT CONCAT(Product_num, '-', COUNT(Product_num)) AS productCombination, COUNT(*) AS frequency
            FROM Transactions
            GROUP BY Product_num
            ORDER BY frequency DESC
            LIMIT 10;
        """,
        "brandPreferences": """
            SELECT Brand_type AS brandType, SUM(Spend) AS totalSpend
            FROM Transactions
            JOIN Products ON Transactions.Product_num = Products.Product_num
            GROUP BY Brand_type;
        """
    }
    
    query_params = event.get("queryStringParameters", {})
    query_type = query_params.get("type", "demographics")
    
    # Ensure query type is valid
    if query_type not in queries:
        return {
            "statusCode": 400,
            "headers": {
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET",
            },
            "body": json.dumps({"error": f"Invalid query type: {query_type}"})
        }

    connection = pymysql.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=db_name,
        cursorclass=pymysql.cursors.DictCursor,
    )

    try:
        with connection.cursor() as cursor:
            # Execute the selected query
            cursor.execute(queries[query_type])
            result = cursor.fetchall()
        
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET",
            },
            "body": json.dumps(result, cls=DecimalEncoder)
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET",
            },
            "body": json.dumps({"error": str(e)})
        }
    finally:
        connection.close()
