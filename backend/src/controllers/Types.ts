import {Schema,Document} from 'mongoose';

export interface BookDocument extends Document {
    title: string;
    author: string;
    description: string;
    code: string;
    issuedTo: Schema.Types.ObjectId | null;
}

export interface StudentDocument extends Document {
    name: string;
    studentID: string;
    email: string;
    phone: string;
    books: Schema.Types.ObjectId[];
}