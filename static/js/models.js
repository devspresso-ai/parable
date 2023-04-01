class OpenAIPrompt {
    constructor() {
        this.parable = "";
        this.difficulty = "the simplest way possible";
        this.modifiers = [];
    }
    getPrompt() {
        let final = `Write a story, ${this.parable} in ${this.difficulty}. `;
        for (let index = 0; index < this.modifiers.length; index++) {
            const mod = this.modifiers[index];
            final += mod;
        }
        return final;
    }
    getPromptJSON() {
        return `${this.getPrompt()} +
      Create six pages. For each page write two things. Return json format like this:
    {
      "page1": {
        "text": The text,
        "prompt": An incredible prompt that describes the people or nouns in the text
          that will be used for an image model.
      }, ...
    `;
    }
}

let promptBuilder = new OpenAIPrompt();

function openai_call(prompt, cb) {
    return $.ajax({
        type: "POST",
        url: "https://api.openai.com/v1/chat/completions",
        data: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content:
                    // "Write a story Tortoise and the Hare in the simplest way possible",
                    prompt,
                },
            ],
            temperature: 0.0,
        }),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", `application/json`);
            xhr.setRequestHeader("Authorization", `Bearer ${OPENAI_KEY}`);
            xhr.setRequestHeader(
                "OpenAI-Organization",
                `org-eDkV4fzvxAoR3IpE1Xv0u7VI`
            );
        },
        success: function (result) {
            console.log("Successful openai all");
            console.log(result);
            cb(result.choices[0].message.content);
        },
    });
}

async function createImage(image_prompt) {
    console.log("creating image");
    // let full_prompt = ` Watercolor acrylic illustration style, Dynamic Hand Drawn Sketch,
    // hyper Realistic detailed, ${image_prompt} smiling solid background color, cartoon,
    // pixar, disney, full hd --ar 1:1 --q 2 --upbeta --s 750 --v 4`;
    let full_prompt = `${image_prompt}. Watercolor illustration style cartoon pixar`;
    console.log(full_prompt);
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "https://api.openai.com/v1/images/generations",
            headers: {
                Authorization: "Bearer " + OPENAI_KEY,
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                prompt: full_prompt,
            }),
            success: function (result) {
                resolve(result.data[0].url);
            },
        });
    });
}