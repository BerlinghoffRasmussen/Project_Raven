import boto3

#this is a test

# AWS credentials (DO NOT hardcode in production; use IAM roles or AWS CLI configuration)
AWS_ACCESS_KEY_ID = 'AKIAIOSFODNN7EXAMPLE'
AWS_SECRET_ACCESS_KEY = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
AWS_REGION = 'us-east-1'

# Initialize a session with credentials
session = boto3.Session(
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

# Create an S3 client
s3_client = session.client('s3')

# List all S3 buckets
try:
    response = s3_client.list_buckets()
    print("Available S3 Buckets:")
    for bucket in response['Buckets']:
        print(f"- {bucket['Name']}")
except Exception as e:
    print(f"Error: {e}")