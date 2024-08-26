import json
import boto3
import time
from decimal import Decimal


client = boto3.client('dynamodb')
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table('pcEmissionData')


def lambda_handler(event, context):
    body = '-'
    status = 200
    
    try:
        request = event['requestContext']['http']
        
        if request['path'] == '/emissions' and request['method'] == 'POST':
            data = json.loads(event['body'])
            table.put_item(
                Item={
                    'id': Decimal(str(time.time())),
                    'watts': data['watts'],
                    'type': data['type'],
                    'co2': Decimal(str(data['co2']))
                })
            body = 'Saved successfully!'
        
        if request['path'] == '/emissions' and request['method'] == 'GET':
            body = table.scan(Select='ALL_ATTRIBUTES')
            body = body['Items']
            
            res = []
            
            for item in body:
                res.append({'watts': int(item['watts']), 
                            'type': item['type'], 
                            'co2': float(item['co2'])})
            
            body = res
            
    except KeyError:
        status = 404
        body = 'Not Found'
        
    except Exception as e:
        status = 503
        body = 'Error'
    
    return {
        'statusCode': status,
        'body': json.dumps(body)
    }
