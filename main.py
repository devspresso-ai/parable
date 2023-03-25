import session_manager
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    # When home page is loaded, clear previous context to establish a new conversation.
    session_manager.clear_all_model_contexts()
    openai_key: str = session_manager.get_openai_key() or os.getenv("OPENAI_API_KEY")
    openai_organization_id: str = session_manager.get_openai_organization_id() or os.getenv("OPENAI_ORGANIZATION_ID")
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route("/infer", methods=['POST'])
def infer():
    inference_input: str = request.json
    openai_api_key: str = request.args[OPENAI_KEY_PARAM_NAME]
    openai_organization_id: str = request.args[OPENAI_ORGANIZATION_ID_PARAM_NAME]
    inference: CodeInferenceResult = inferences_service.infer(
        inference_input,
        openai_api_key,
        openai_organization_id)
    response = Response(
        response=json.dumps({
            INFERENCE_VALUE_RESPONSE_KEY: inference.value,
            INFERENCE_LANGUAGE_RESPONSE_KEY: inference.language
        }),
        content_type='application/json')

    return response
