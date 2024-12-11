import { pipeline, TextGenerationSingle } from "@huggingface/transformers";

const isTextGenerationSingleArray = (output: TextGenerationSingle[] | TextGenerationSingle[][]): output is TextGenerationSingle[] => {
  return Array.isArray(output)
     && output.length > 0
     && "generated_text" in output[0]
     && (typeof output[0].generated_text === "string" || (
      Array.isArray(output[0].generated_text)
        && output[0].generated_text.length > 0
        && typeof output[0].generated_text[0].content === "string"
        && typeof output[0].generated_text[0].role === "string"
      ))
     ;
};

// Create a text-generation pipeline
const generator = await pipeline(
  "text-generation",
  "onnx-community/Llama-3.2-1B-Instruct",
  {
    progress_callback: ({ name, status, loaded, total, progress, file }) => {
      console.log(`${name || ""}(${file || ""}):${status} ${loaded || 0}/${total || 0} ${progress || 0}% `);
    }
  }
);

// Define the list of messages
const messages = [
  { role: "system", content: "宇宙人の真似をして回答してください。" },
  { role: "user", content: "自己紹介をしてください。" },
];

// Generate a response
const output: TextGenerationSingle[] | TextGenerationSingle[][] = await generator(messages, { max_new_tokens: 128 });

console.log(JSON.stringify(output));
if (isTextGenerationSingleArray(output)) {
  console.log(output[0].generated_text);
} else {
  console.log(output[0][0].generated_text);
}
