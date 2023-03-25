class StoryConstructor:
    def __init__(self, text):
        # Split the text into paragraphs using the newline character (\n)
        paragraphs = text.split("\n")
        # Remove any empty paragraphs from the list
        paragraphs = [p.strip() for p in paragraphs if p.strip()]
        self.paragraphs = paragraphs
