import { BaseModel } from './base-model';
export interface QuestionVariant extends BaseModel {
    question: string;
    faqId: string;
}
