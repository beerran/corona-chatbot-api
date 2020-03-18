export interface BaseModel {
    id?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface History extends BaseModel {
    model: BaseModel;
}

export const HistoryConverter = {
    toFirestore(modelObject: History): firebase.firestore.DocumentData {
        return modelObject;
    },
    fromFirestore(data: firebase.firestore.DocumentData): History {
        return {
            id: data.id,
            model: data.model,
            createdAt: data.createdAt || null,
            updatedAt: data.updatedAt || null
        };
    }
}