import { BaseModel } from './base-model';
import firebase from 'firebase';

export interface Suggestion extends BaseModel {
    sourceId: string;
    question: string;
    answer: string;
    status: 'New' | 'Updated' | 'Approved';
    faqId: string;
}

export const Converter = {
    toFirestore(modelObject: Suggestion): firebase.firestore.DocumentData {
        return modelObject;
    },
    fromFirestore(data: firebase.firestore.DocumentData): Suggestion {
        return {
            id: data.id || null,
            sourceId: data.sourceId || null,
            question: data.question || null,
            answer: data.answer || null,
            status: data.status || null,
            faqId: data.faqId || null,
            createdAt: data.createdAt || null,
            updatedAt: data.updatedAt || null
        };
    }
}