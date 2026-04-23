import requests
import json
import os

API_KEY = "SZu9e4D70klRvMtsJeKzznAC"
USER_ID = "15086139"
COLLECTION_ID = "32MFM4ZJ"
BASE_URL = f"https://api.zotero.org/users/{USER_ID}/items"
HEADERS = {"Zotero-API-Key": API_KEY, "Content-Type": "application/json"}

# Metadata for the report
report_data = {
    "itemType": "report",
    "title": '"In the name of eminent domain": A historical and colonial perspective to land governance and land struggles in India',
    "creators": [
        {"creatorType": "author", "firstName": "Ranjan K.", "lastName": "Ghosh"},
        {"creatorType": "author", "firstName": "Satish Y.", "lastName": "Deodhar"}
    ],
    "reportNumber": "WP 2025-06-02",
    "institution": "Indian Institute of Management Ahmedabad",
    "date": "2025",
    "extra": "Handle: RePEc:iim:iimawp:14727",
    "collections": [COLLECTION_ID]
}

def add_item():
    print("Adding item to Zotero...")
    response = requests.post(BASE_URL, headers=HEADERS, data=json.dumps([report_data]))
    if response.status_code == 200:
        result = response.json()
        if '0' in result['successful']:
            item_key = result['successful']['0']['key']
            print(f"Successfully created parent item: {item_key}")
            return item_key
        else:
            print(f"Successful POST but no key returned: {result}")
            return None
    else:
        print(f"Error creating item: {response.status_code} - {response.text}")
        return None

def add_attachment(parent_key, file_path):
    print(f"Attaching linked file: {file_path}")
    attachment_data = {
        "itemType": "attachment",
        "linkMode": "linked_file",
        "parentItem": parent_key,
        "title": os.path.basename(file_path),
        "path": file_path,
        "contentType": "application/pdf"
    }
    response = requests.post(BASE_URL, headers=HEADERS, data=json.dumps([attachment_data]))
    if response.status_code == 200:
        print("Attachment linked successfully.")
    else:
        print(f"Error linking attachment: {response.status_code} - {response.text}")

if __name__ == "__main__":
    pdf_path = "/Users/dineshmahapatra/Library/CloudStorage/GoogleDrive-dineshmahapatra123@gmail.com/My Drive/PhD/7 - Raw/In the name of eminent domain_ a historical and colonial perspective to land governance and land struggles in India.pdf"
    item_key = add_item()
    if item_key:
        add_attachment(item_key, pdf_path)
    else:
        print("Failed to create parent item, skipping attachment.")
