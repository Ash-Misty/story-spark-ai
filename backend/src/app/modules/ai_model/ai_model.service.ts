import ApiError from "../../../errors/api_error";
import { ITokenPayload } from "../../../interfaces/token";

import httpStatus from "http-status";
import { REQUEST_LIMITS } from "../../../interfaces/ai_model_request_limit";


const GENERATION_FAILED_MESSAGE =
  "Story generation failed. Your request quota has been restored.";
const FREE_GENERATION_FAILED_MESSAGE =
  "Story generation failed. Your free generation quota has been restored.";

const aiModelGenerate = async (payload: IAIModel, token: ITokenPayload) => {
  const { email } = token;
  const { prompt, wordLength, numStories } = payload;

  try {
    const result = await raceGenerationWithTimeout(
      (signal) => generateWithGeminiStories(prompt, wordLength, numStories, signal),
      AUTHENTICATED_GENERATION_TIMEOUT_MS
    );
    assertSuccessfulGeneration(result, GENERATION_FAILED_MESSAGE);
    return result;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof GenerationTimeoutError) {
      throw new ApiError(httpStatus.GATEWAY_TIMEOUT, "Request timed out!");
    }
    throw new ApiError(httpStatus.BAD_GATEWAY, GENERATION_FAILED_MESSAGE);
  }
};

    return result;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof GenerationTimeoutError) {
      throw new ApiError(httpStatus.GATEWAY_TIMEOUT, "Request timed out!");
    }
    throw new ApiError(httpStatus.BAD_GATEWAY, FREE_GENERATION_FAILED_MESSAGE);
  }
};

export const AiModelService = {
  aiModelGenerate,
  aiFreeModelGenerate,
  aiModelAlternateEndings,
  aiFreeModelAlternateEndings,
};

