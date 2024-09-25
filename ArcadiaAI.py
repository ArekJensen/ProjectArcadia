import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate('path/to/serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Function to generate a fantasy prompt (stub for example)
def generate_fantasy_prompt():
    # Example fantasy prompt generation logic
    return "A young knight embarks on a quest to recover a lost artifact."

# Function to save the generated prompt to Firebase Firestore
def save_prompt_to_firebase(prompt):
    # Auto-generate an ID for the document in the "fantasy_prompts" collection
    doc_ref = db.collection('fantasy_prompts').document()
    # Save the prompt in Firestore
    doc_ref.set({
        'prompt': prompt
    })

# Main function to generate and save a prompt
def generate_and_save_prompt():
    # Generate the fantasy prompt
    generated_prompt = generate_fantasy_prompt()
    
    # Save the generated prompt to Firebase
    save_prompt_to_firebase(generated_prompt)
    
    # Print or return the generated prompt (for logging or UI feedback)
    print(f"Generated and saved prompt: {generated_prompt}")
    return generated_prompt

# Example usage of the combined function
if __name__ == '__main__':
    generate_and_save_prompt()
