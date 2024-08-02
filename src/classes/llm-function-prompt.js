import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { LlmProviders } from "./llm-providers";

export default async function promptForFunction(userPrompt, provider) {
  const model = LlmProviders[provider]();

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
    ["human", "The function I want you to create should: " + userPrompt],
  ]);
  const chain = prompt.pipe(modelWithStructuredOutput);
  const result = await chain.invoke({});

  if (!result || !result.functionName) {
    return { success: false, data: result };
  }

  const functionSignature = `function ${result.functionName}(${result.inputs
    .map((i) => i.name)
    .join(", ")})`;
  const typedFunctionSignature = `(${result.inputs
    .map((i) => `${i.name}:${i.type}`)
    .join(", ")}) => ${result.output.name}:${result.output.type}`;

  const functionBody = (result.functionCode.match(/(?<=\{)[\s\S]*(?=\}$)/) || [
    "",
  ])[0].trim();

  result.functionSignature = functionSignature;
  result.typedFunctionSignature = typedFunctionSignature;
  result.functionBody = functionBody;
  result.success = result.functionCode.startsWith(functionSignature);

  return result;
}
