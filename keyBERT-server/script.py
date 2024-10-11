from flask import Flask, request, jsonify
from keybert import KeyBERT

# Initialize Flask app
app = Flask(__name__)

# Initialize KeyBERT model
model = KeyBERT()

@app.route('/extract_keywords', methods=['POST'])
def extract_keywords():
    # Get the posted JSON data
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({"error": "Please provide text data"}), 400

    # Extract text from the POST request
    text = data['text']

    # Extract keywords using KeyBERT
    keywords = model.extract_keywords(text, top_n=5)  # top_n controls how many keywords to return

    # Prepare the response with keywords
    response = [keyword[0] for keyword in keywords]
    return jsonify(response)

# Start the server
if __name__ == '__main__':
    # Notify the console that the server is starting
    print("Starting the server...")
    
    # Run the Flask server
    app.run(host='127.0.0.1', port=5000, debug=True)
    
