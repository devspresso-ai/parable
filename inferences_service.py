import openai
import session_manager
from typing import Dict, Any, Optional

def infer(inference_input: Dict[str, Any], openai_api_key: str, openai_organization_id: str) -> str:
    """inference_input is expected to be a dictionary with keys and values specific to the model."""
    _update_api_keys(openai_api_key, openai_organization_id)
    return None

def _update_api_keys(openai_api_key: str, openai_organization_id: str):
    openai.api_key = openai_api_key
    openai.organization = openai_organization_id

    session_manager.set_openai_key(openai_api_key)
    session_manager.set_openai_organization_id(openai_organization_id)
