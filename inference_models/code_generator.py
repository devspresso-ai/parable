from inference_models.inference_model import InferenceModel, ChatInferencePrompt
from typing import Dict

class KeywordExtractor(InferenceModel):
    """Extracts keywords from a fully written story."""

    def __init__(self):
        super().__init__()
        self.name = "keyword_extractor"
        self.display_name = "Keyword Extractor"
        self.openai_model_name = "gpt-3.5-turbo"
        self.max_tokens = 2000
        self.default_prompt_seed = "You are taking in a children's story. Extract keywords from each paragraph of the story, which will be provided in a format where each paragraph is on a new line. Return the keywords for each paragraph on a separate line."

    def inference_prompt(self, inference_input: str, previous_messages: [Dict[str, str]] = None) -> ChatInferencePrompt:
        # Construct the prompt seed message. The prompt seed message will contain the current file text if it is not empty.
        seed_message: Dict[str, str] = {'role': 'system', 'content': self.default_prompt_seed}

        messages = previous_messages or []
        messages.append({'role': 'user', 'content': inference_input})
        return ChatInferencePrompt(seed_message, messages)
