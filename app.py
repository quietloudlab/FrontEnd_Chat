from flask import Flask, render_template, request, jsonify
import os
from openai import OpenAI

app = Flask(__name__)

# Set up OpenAI client
api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=api_key)

@app.route('/')
def home():
    return render_template('chat_interface.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    user_message = request.json['message']

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_message}
        ]
    )

    response = completion.choices[0].message.content  # Updated line
    return jsonify({'response': response})



if __name__ == '__main__':
    app.run(debug=False)