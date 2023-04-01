from typing import Optional, Dict

class InferencePrompt:

    def __init__(self, prompt: str):
        self.prompt = prompt

class ChatInferencePrompt(InferencePrompt):
    """Defines an inference prompt that represents a chat inference. The chat inference context is fully contained in messages, including the existing prompt."""

    def __init__(self, seed_message: Optional[Dict[str, str]], messages: [Dict[str, str]]):
        super().__init__('')
        self._seed_message = seed_message
        self._messages = messages

    def get_messages(self):
        return [self._seed_message] + self._messages if self._seed_message is not None else self._messages

class InferenceModel:

    inference_prompt_name = "inference_prompt"

    def __init__(self):
        self.default_prompt_seed = ""
        self.name = "inference_model"
        self.display_name = "Inference Model"
        self.openai_model_name = "gpt-3.5-turbo"
        self.max_tokens = 1000
        self.temperature = 1
        self.frequency_penalty = 0.3
        self.presence_penalty = 0

    def inference_prompt(self, inference_input: str) -> InferencePrompt:
        raise NotImplementedError("Not implemented!")

class StoryGenerator(InferenceModel):

    def __init__(self):
        super().__init__()

    def inference_prompt(self, story_selection, difficulty_level, character_description) -> ChatInferencePrompt:
        system_prompt = "You are a teller of children's stories. You are familiar with many of the usual children's stories such as Aesop's Fables, but you are able to take into account the user's personal preferences for the main character when telling a given story and incorporate those preferences into the story while preserving the form of the original plot and the lessons that the story teaches.\n\nThe user will provide a description of the main character or characters of the story. The character descriptions should also be used to inform the setting and themes of the story.\n\nWhen the user asks you to tell a story, tell a fable you know that lets you effectively incorporate the preferences the user has provided into the story."

        user_prompt = f"I would like to hear a story based on {story_selection}. Please tell it in a difficulty level that suits a {difficulty_level} audience. Here is some information about the main characters: {character_description}."
        return ChatInferencePrompt({'role': 'system', 'content': system_prompt}, [{'role': 'user', 'content': user_prompt}])

story_generator = StoryGenerator()
