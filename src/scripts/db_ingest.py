import pandas as pd
import firebase_admin
from firebase_admin import credentials, firestore

# Load your Firebase Admin SDK credentials
cred = credentials.Certificate('../../firebase-admin-sdk.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load the data
file_path = '../data/akdatabase.csv'
data = pd.read_csv(file_path)

# Logging for missing information
missing_info_log = []

# Process and upload each row
for index, row in data.iterrows():
    try:
        # Skip rows with missing essential information
        if pd.isnull(row['Name']) or pd.isnull(row['Major']):
            missing_info_log.append(f"Missing essential info in row {index}: {row.to_dict()}")
            continue

        # Split Name into first_name and last_name
        name_parts = row['Name'].split(" ", 1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ""

        # Split Major into an array
        majors = [major.strip() for major in row['Major'].split(",")]

        # Build the document
        document = {
            "pledge_class": row.get('Pledge Class', ""),
            "first_name": first_name,
            "last_name": last_name,
            "majors": majors,
            "company": row.get('Company', ""),
            "title": row.get('Title', ""),
            "location": row.get('Location', ""),
            "linkedin": row.get('LinkedIn', "")
        }

        # Upload to Firestore
        db.collection("members").add(document)

    except Exception as e:
        # Log any exceptions that occur
        missing_info_log.append(f"Error processing row {index}: {str(e)}")

# Save the missing info log for review
log_file_path = '../data/missing_info_log.txt'
with open(log_file_path, 'w') as f:
    f.write("\n".join(missing_info_log))

print(f"Upload completed. Missing info logged in {log_file_path}.")
