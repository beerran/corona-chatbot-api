export interface BaseModel {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface History {
    id: string;
    model: BaseModel;
}

export const HistoryConverter = {
    toFirestore<T extends BaseModel>(modelObject: History): firebase.firestore.DocumentData {
        return modelObject;
    },
    fromFirestore<T extends BaseModel>(data: firebase.firestore.DocumentData): History {
        return {
            id: data.id || null,
            model: data.model
        };
    }
}