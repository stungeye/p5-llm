import { ChatGroq } from "@langchain/groq";
import { ChatOpenAI } from "@langchain/openai";

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
