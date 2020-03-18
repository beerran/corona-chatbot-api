import { Suggestion } from "./suggestion";
import { BaseModel } from "./base-model";
export interface SuggestionHistory extends BaseModel {
    suggestion: Suggestion;
}
