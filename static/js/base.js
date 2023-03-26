let OPENAI_KEY = "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";

// What matters for the story?

// 1. The parable (Tortoise and the Hare)
// 2. The difficulty level (8th grade, 12th grade, 16th grade)
// 3. The modifiers (animal habitats, animal migration, animal geneology)

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

async function createPage(page_obj) {
  text = page_obj.text;
  image_prompt = page_obj.prompt;
  let image_url = await createImage(image_prompt);
  let page = `<div class="page">
    <div class="page-image">
      <img src="${image_url}" width="200px" alt="page image">
    </div>
    <div class="page-text">
      ${text}
    </div>
  </div>`;
  return page;
}

// TODO change parable to value of textarea
async function showPromptJSON() {
  // promptBuilder.parable = "Tortoise and the Hare";
  query = promptBuilder.getPromptJSON();
  console.log("querying openai: " + query);
  $("#pages-container").html("Loading...");
  openai_call(query, async function (result) {
    console.log(result);
    pages = JSON.parse(result);
    $("#pages-container").html("");
    $("#story-title").html(promptBuilder.parable);
    $("#pages-container").append(await createPage(pages["page1"]));
    $("#pages-container").append(await createPage(pages["page2"]));
    $("#pages-container").append(await createPage(pages["page3"]));
    $("#pages-container").append(await createPage(pages["page4"]));
    $("#pages-container").append(await createPage(pages["page5"]));
    $("#pages-container").append(await createPage(pages["page6"]));
    // $("#story-content").html(result);
  });
}

let difficulty_settings = [
  {
    selector: "#difficulty-1-sentence",
    difficulty: `one sentence. `,
  },
  {
    selector: "#difficulty-3-sentence",
    difficulty: `three sentences. `,
  },
  {
    selector: "#difficulty-8th-grade",
    difficulty: `a way that would be challenging for an 8th grader. `,
  },
  {
    selector: "#difficulty-12th-grade",
    difficulty: `a way that would be challenging for an 12th grader. `,
  },
  {
    selector: "#difficulty-16th-grade",
    difficulty: `a way that would be challenging for an 16th grader.
      Weave college prep SAT test words into the story.`,
  },
];
// Modifier level changes
let modifiers = [
  {
    selector: "#mod-animal-habitats",
    mod_text: `If any animals are mentioned in the story, explain the animal's typical habitat
      and all the locations that these animals typically found in the world. `,
  },
  {
    selector: "#mod-animal-migration",
    mod_text: `If any animals are mentioned in the story, explain the animal's typical
      migration patterns. `,
  },
  {
    selector: "#mod-animal-geneology",
    mod_text: `If any animals are mentioned in the story, explain the animal's geneology
      and history appropriate for a high school level biology class. `,
  },
];

// Text version
// $(document).ready(async function () {
//   $("#story_tortoise_hare").click(function () {
//     promptBuilder.parable = "Tortoise and the Hare";
//     query = promptBuilder.getPrompt();
//     console.log("querying openai: " + query);
//     openai_call(query, function (result) {
//       $("#story-title").html("Tortoise and the Hare");
//       $("#story-content").html(result);
//     });
//   });
//   add_difficulty_settings(difficulty_settings);
//   add_modifiers(modifiers);
// });

// JSON version
$(document).ready(async function () {
  // JSON version
  $("#story_tortoise_hare").click(function () {
    console.log("setting parable to Tortoise and the Hare");
    promptBuilder.parable = "Tortoise and the Hare";
    showPromptJSON();
  });
  add_difficulty_settings(difficulty_settings);
  add_modifiers(modifiers);
  $("#story-form").submit(function (e) {
    e.preventDefault();
    let parable = $("#story-builder-input").val();
    console.log(parable);
    // promptBuilder.parable = parable;
    // showPromptJSON();
  });
});

function add_modifiers(modifiers) {
  modifiers.forEach((modifier) => {
    let selector = modifier.selector;
    let mod_text = modifier.mod_text;
    // console.log(modifier);
    $(selector).click(
      function (selector, mod_text) {
        promptBuilder.modifiers.push(mod_text);
        console.log(`adding modifier: ${selector}`);
        showPromptJSON();

        // This is the text version
        // query = promptBuilder.getPrompt();
        // console.log(query);
        // openai_call(query, function (result) {
        //   console.log(result);
        //   $("#story-content").html(result);
        // });
      }.bind(this, selector, mod_text)
    );
  });
}

function add_difficulty_settings(difficulty_settings) {
  difficulty_settings.forEach((setting) => {
    let selector = setting.selector;
    let difficulty = setting.difficulty;
    // console.log(setting);
    $(selector).click(
      function (selector, difficulty) {
        promptBuilder.difficulty = difficulty;
        query = promptBuilder.getPrompt();
        console.log(`setting difficulty: ${selector}`);
        showPromptJSON();

        // This is the text version
        // console.log(query);
        // openai_call(query, function (result) {
        //   console.log(result);
        //   $("#story-content").html(result);
        // });
      }.bind(this, selector, difficulty)
    );
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
