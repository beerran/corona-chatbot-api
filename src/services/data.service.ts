import { FirebaseApp } from '../firebase/firebase';
import { BaseModel, History, HistoryConverter } from '../models/base-model';

export class DataService<T extends BaseModel> {
    private collection: FirebaseFirestore.CollectionReference<T>;
    private historyCollection: FirebaseFirestore.CollectionReference<History>;

    constructor(private collectionName: string, private converter: FirebaseFirestore.FirestoreDataConverter<T>) {
        this.collection = FirebaseApp.database.collection(collectionName).withConverter(converter);
        this.historyCollection = FirebaseApp.database.collection(`${collectionName}-history`).withConverter(HistoryConverter);
    }

    async getById(id: string) : Promise<T> {
        const ref = this.collection.doc(id);
        if (ref === null) {
            throw new Error(`No entity with id ${id} found in ${this.collectionName}`);
        }
        return ref.get().then(this.mapData, this.errorHandler);
    }
    async getAll(): Promise<T[]> {
        return this.collection.get().then(snapshot => snapshot.docs.map(this.mapData), this.errorHandler);
    }

    async create(entity: T): Promise<T> {
        entity.createdAt = new Date();
        entity.updatedAt = new Date();
        return this.collection.add(entity).then(ref => ref.get().then(this.mapData), this.errorHandler);
    }

    async update(entity: T): Promise<T> {
        entity.updatedAt = new Date();
        const ref = this.collection.doc(entity.id);
        if (ref === null) {
            throw new Error(`No entity with id ${entity.id} found in ${this.collectionName}`);
        }
        return ref.update(entity).then(() => entity, this.errorHandler);
    }

    async remove(id: string): Promise<History> {
        const ref = this.collection.doc(id);
        if (ref === null) {
            throw new Error(`No entity with id ${id} found in ${this.collectionName}`);
        }
        return ref.get().then(data => {
            ref.delete();
            return this.historyCollection.add({
                id: '',
                model: data.data() as T
            }).then(historyRef => historyRef.get().then(this.mapHistoryData))
        });
    }

    private mapData  = (doc: FirebaseFirestore.DocumentSnapshot<T> | FirebaseFirestore.QueryDocumentSnapshot<T>): T => ({...doc.data() as T, id: doc.id});
    private mapHistoryData  = (doc: FirebaseFirestore.DocumentSnapshot<History> | FirebaseFirestore.QueryDocumentSnapshot<History>): History => ({...doc.data() as History, id: doc.id});
    private errorHandler = (err: any) => {throw new Error(err.details);}
}