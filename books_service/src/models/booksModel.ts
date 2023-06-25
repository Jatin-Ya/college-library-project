import {Schema,model,Document} from 'mongoose';

export interface BookDocument extends Document {
    title: string;
    author: string;
    description: string;
    code: string;
    issuedTo: Schema.Types.ObjectId | null;
}

const bookSchema = new Schema<BookDocument>({
    title: { type: String, required: true },
    author : { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    issuedTo: { type: Schema.Types.ObjectId, ref: 'Student' }
});

const Book = model('Book', bookSchema);

export default Book;