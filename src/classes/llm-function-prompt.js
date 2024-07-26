import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

export const LlmProviders = Object.freeze({
  OpenAi: "openai",
  Groq: "groq",
});

export async function promptForFunction(userPrompt, provider = "openai") {
  console.log(provider);
  const model =
    provider === "openai"
      ? new ChatOpenAI({
          temperature: 0,
          model: "gpt-4o-mini",
          apiKey: import.meta.env.VITE_OPENAI_API_KEY,
          cache: true,
        })
      : new ChatGroq({
          temperature: 0,
          model: "llama-3.1-70b-versatile",
          apiKey: import.meta.env.VITE_GROQ_API_KEY,
          cache: true,
        });

  const functionSchema = z.object({
    functionName: z.string(),
    inputs: z.array(
      z.object({
        name: z.string(),
        type: z.enum(["Number", "String", "Boolean", "Object", "Array"]),
      })
    ),
    output: z.object({
      name: z.string(),
      type: z.enum(["Number", "String", "Boolean", "Object", "Array"]),
    }),
    functionCode: z.string(),
  });

  const modelWithStructuredOutput = model.withStructuredOutput(functionSchema);

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful Javascript coding assistant."],
    ["human", "The function I want to create will: " + userPrompt],
  ]);
  const chain = prompt.pipe(modelWithStructuredOutput);
  const result = await chain.invoke({});

  if (!result || !result.functionName) {
    return { success: false, data: result };
  }

  const functionSignature = `function ${result.functionName}(${result.inputs
    .map((i) => i.name)
    .join(", ")})`;
  const functionBody = (result.functionCode.match(/(?<=\{)[\s\S]*(?=\}$)/) || [
    "",
  ])[0].trim();

  result.functionSignature = functionSignature;
  result.functionBody = functionBody;
  result.success = result.functionCode.startsWith(functionSignature);

  return result;
}
