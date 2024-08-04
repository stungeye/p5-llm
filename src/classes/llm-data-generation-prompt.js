import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { LlmProviders } from "./llm-providers";
import { parsePinValue } from "./vs-pin-types";
import { VsPinTypes } from "./vs-pin-types";

export default async function promptForData(userPrompt, provider) {
  const model = LlmProviders[provider]();

  const functionSchema = z.object({
    generatedDataType: z.enum([
      "Number",
      "String",
      "Boolean",
      "Object",
      "Array",
    ]),
    generatedDataName: z.string(),
    generatedData: z.union([
      z.number(),
      z.string(),
      z.boolean(),
      z.record(z.unknown()), // for objects
      z.array(z.unknown()), // for arrays
    ]),
  });

  const modelWithStructuredOutput = model.withStructuredOutput(functionSchema);

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a helpful data generation assistant. You will return the data I request as a Javascript number, string, boolean, object, or array.",
    ],
    ["human", "The data I want you to create is: " + userPrompt],
  ]);
  const chain = prompt.pipe(modelWithStructuredOutput);
  let result;

  try {
    result = await chain.invoke({});
  } catch (e) {
    return { success: false, data: result, error: e.message };
  }

  if (
    !result ||
    !result.generatedDataType ||
    !result.generatedDataName ||
    !result.generatedData
  ) {
    return { success: false, data: result, error: "Missing data." };
  }

  const parsedData = parsePinValue(
    VsPinTypes[result.generatedDataType],
    result.generatedData
  );

  if (parsedData === null) {
    return { success: false, data: result, error: "Parsing error." };
  }

  result.generatedDataJSON = JSON.stringify(parsedData, null, 2);
  // All returned data is present:
  result.success = true;

  return result;
}
