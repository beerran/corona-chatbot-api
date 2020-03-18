import { BaseModel } from './base-model';
export interface Faq extends BaseModel {
    status: string;
    categoryId: string;
    risk: 'Low' | 'Medium' | 'High';
    suggestionId: string;
    answer: string;
    question: string;
}
