import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";
import { z } from "zod";

export default async function promptForFunction(userPrompt) {
  const model = new ChatGroq({
    temperature: 0,
    model: "llama-3.1-70b-versatile",
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
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
    functionBodyOnly: z.string(),
  });

  const modelWithStructuredOutput = model.withStructuredOutput(functionSchema);

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful Javascript coding assistant."],
    ["human", "The function I want to create will: " + userPrompt],
  ]);
  const chain = prompt.pipe(modelWithStructuredOutput);
  const result = await chain.invoke({});
  return result;
}
