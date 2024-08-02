import { ChatGroq } from "@langchain/groq";
import { ChatOpenAI } from "@langchain/openai";

// This may not be necessary if I can make the local-ai config prompt more generic:
// - Description of the extract function: Return structured data as a response to a user request according to the provided json schema:
// - Might need to provide a few more examples of how to use the extract function for the different types of nodes we create.
// TODO: Next step is to return an object with keys:
// - factory: a function that returns a new instance of the provider (e.g. new ChatOpenAI)
//            Add a temperature parameter to the factory function, defaulted to 0.
// - function_request:
//   - system_prompt: system prompt when for gui-controller-llm-function
//   - user_prompt: User prefix-prompt for gui-controller-llm-function
// - consumption_loop:
//   - system_prompt: system prompt when for new LLM data-consumption gui controller
//   - user_prompt: User prefix-prompt for new LLM data-consumption gui controller
// - sample_and_generate:
//   - system_prompt: system prompt when for new LLM sample-and-generate gui controller
//   - user_prompt: User prefix-prompt for new LLM sample-and-generate gui controller
export const LlmProviders = Object.freeze({
  OpenAi: () =>
    new ChatOpenAI({
      temperature: 0,
      model: "gpt-4o-mini",
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      cache: true,
    }),
  Groq: () =>
    new ChatGroq({
      temperature: 0,
      model: "llama-3.1-70b-versatile",
      apiKey: import.meta.env.VITE_GROQ_API_KEY,
      cache: true,
    }),
  LocalLlama3: () =>
    new ChatOpenAI({
      temperature: 0,
      model: "llama3",
      apiKey: "None",
      cache: true,
      configuration: {
        baseURL: "http://localhost:8080",
      },
    }),
  LocalLlama31: () =>
    new ChatOpenAI({
      temperature: 0,
      model: "llama3.1",
      apiKey: "None",
      cache: true,
      configuration: {
        baseURL: "http://localhost:8080",
      },
    }),
});
