import {Schema,model,Document,Types} from 'mongoose';
import Student from './studentModel';

export interface BookDocument extends Document {
    title: string;
    author: string;
    description: string;
    code: string;
    issuedTo: Types.ObjectId | null;
}

const bookSchema = new Schema<BookDocument>({
    title: { type: String, required: true },
    author : { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    issuedTo: { type: Types.ObjectId, ref: Student, default: null }
});

const Book = model('Book', bookSchema);

export default Book;