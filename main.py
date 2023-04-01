import session_manager
import json
import os
import inferences_service
from constants import INFERENCE_VALUE_RESPONSE_KEY, OPENAI_SECRET_KEY, OPENAI_ORGANIZATION_ID
from dotenv import load_dotenv
from flask import Flask, request, Response, render_template
from flask_sslify import SSLify
from typing import Dict, Any

app = Flask(__name__)
SSLify(app)
load_dotenv()

@app.route('/')
def index():
    # When home page is loaded, clear previous context to establish a new conversation.
    session_manager.clear_all_model_contexts()
    return render_template('index.html')

@app.route("/story", methods=['POST'])
def story():
    inference_input: Dict[str, Any] = request.form
    openai_api_key: str = os.getenv(OPENAI_SECRET_KEY)
    openai_organization_id: str = os.getenv(OPENAI_ORGANIZATION_ID)
    inference: str = inferences_service.generate_story(
        inference_input,
        openai_api_key,
        openai_organization_id)
    response = Response(
        response=json.dumps({
            INFERENCE_VALUE_RESPONSE_KEY: inference
        }),
        content_type='application/json')
    print("Inference string: %s" % inference)

    return render_template('story.html', story_text=json.dumps(inference))

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')
