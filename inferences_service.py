import openai

import inference_model
from inference_model import InferenceModel
import session_manager
from typing import Dict, Any, Optional

def generate_story(inference_input: Dict[str, Any], openai_api_key: str, openai_organization_id: str) -> str:
    """inference_input is expected to be a dictionary with keys and values specific to the model."""
    story_selection = inference_input["story_selection"]
    difficulty_level = inference_input["difficulty_level"]
    character_description = inference_input["character_description"]
    inference_prompt = inference_model.story_generator.inference_prompt(story_selection, difficulty_level, character_description)
    inference_value = _get_chat_inference(inference_model.story_generator, inference_prompt.get_messages())
    return inference_value["content"]

def _get_chat_inference(model: InferenceModel, messages: [Dict[str, str]]) -> Dict[str, str]:
    print("Full inference string: %s" % messages)
    inference = openai.ChatCompletion.create(
        model=model.openai_model_name,
        messages=messages,
        max_tokens=model.max_tokens,
        temperature=model.temperature,
        presence_penalty=model.presence_penalty,
        frequency_penalty=model.frequency_penalty)
    print("Returned inference: %s" % inference)
    message = inference.choices[0].message
    return {'role': message.role, 'content': message.content}
