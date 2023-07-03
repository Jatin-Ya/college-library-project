import {Schema,model,Document} from 'mongoose';

export interface StudentDocument extends Document {
    name: string;
    studentID: string;
    email: string;
    phone: string;
    books: Schema.Types.ObjectId[];
}

const studentSchema = new Schema<StudentDocument>({
    name: { type: String, required: true },
    studentID : { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

const Student = model('Student', studentSchema);

export default Student;