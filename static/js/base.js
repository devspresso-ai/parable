let OPENAI_KEY = "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";

// What matters for the story?

// 1. The parable (Tortoise and the Hare)
// 2. The difficulty level (8th grade, 12th grade, 16th grade)
// 3. The modifiers (animal habitats, animal migration, animal geneology)

function add_difficulty_settings(difficulty_settings) {
  difficulty_settings.forEach((setting) => {
    let name = setting.name;
    let difficulty = setting.difficulty;
    $("#difficulty-level").append(
        `<option value="${name}">${name}</option>`
    );
  });
}

// async function createPage(page_obj) {
//   text = page_obj.text;
//   image_prompt = page_obj.prompt;
//   let image_url = await createImage(image_prompt);
//   let page = `<div class="page">
//     <div class="page-image">
//       <img src="${image_url}" width="200px" alt="page image">
//     </div>
//     <div class="page-text">
//       ${text}
//     </div>
//   </div>`;
//   return page;
// }

// TODO change parable to value of textarea
// async function showPromptJSON() {
//   // promptBuilder.parable = "Tortoise and the Hare";
//   query = promptBuilder.getPromptJSON();
//   console.log("querying openai: " + query);
//   $("#pages-container").html("Loading...");
//   openai_call(query, async function (result) {
//     console.log(result);
//     pages = JSON.parse(result);
//     $("#pages-container").html("");
//     $("#story-title").html(promptBuilder.parable);
//     $("#pages-container").append(await createPage(pages["page1"]));
//     $("#pages-container").append(await createPage(pages["page2"]));
//     $("#pages-container").append(await createPage(pages["page3"]));
//     $("#pages-container").append(await createPage(pages["page4"]));
//     $("#pages-container").append(await createPage(pages["page5"]));
//     $("#pages-container").append(await createPage(pages["page6"]));
//     // $("#story-content").html(result);
//   });
// }

let difficulty_settings = [
  {
    name: "Toddler",
    difficulty: `a way that would be understandable by a toddler when read to them.`
  },
  {
    name: "1st Grader",
    difficulty: `a way that would be readable by a 1st grader.`
  },
  {
    name: "3rd Grader",
    difficulty: `a way that would be readable by a 3rd grader.`
  },
  {
    name: "5th Grader",
    difficulty: `a way that would be challenging for a 5th grader.`
  },
  {
    name: "High Schooler",
    difficulty: `a way that would be challenging for a 12th grader.
      Weave college prep SAT test words into the story.`
  }
];

$(document).ready(async function () {
    // Set up difficulty settings and supported stories.
    add_difficulty_settings(difficulty_settings);
});

// JSON version
// $(document).ready(async function () {
//   // JSON version
//   $("#story_tortoise_hare").click(function () {
//     console.log("setting parable to Tortoise and the Hare");
//     promptBuilder.parable = "Tortoise and the Hare";
//     showPromptJSON();
//   });
//   add_difficulty_settings(difficulty_settings);
//   add_modifiers(modifiers);
//   $("#story-form").submit(function (e) {
//     e.preventDefault();
//     let parable = $("#story-builder-input").val();
//     console.log(parable);
//     // promptBuilder.parable = parable;
//     // showPromptJSON();
//   });
// });

// function add_modifiers(modifiers) {
//   modifiers.forEach((modifier) => {
//     let selector = modifier.selector;
//     let mod_text = modifier.mod_text;
//     // console.log(modifier);
//     $(selector).click(
//         function (selector, mod_text) {
//           promptBuilder.modifiers.push(mod_text);
//           console.log(`adding modifier: ${selector}`);
//           showPromptJSON();
//
//           // This is the text version
//           // query = promptBuilder.getPrompt();
//           // console.log(query);
//           // openai_call(query, function (result) {
//           //   console.log(result);
//           //   $("#story-content").html(result);
//           // });
//         }.bind(this, selector, mod_text)
//     );
//   });
// }
