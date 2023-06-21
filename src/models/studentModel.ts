import {Schema,model,Document} from 'mongoose';

export interface StudentDocument extends Document {
    name: string;
    studentID: string;
    email: string;
    phone: string;
}

const studentSchema = new Schema<StudentDocument>({
    name: { type: String, required: true },
    studentID : { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true }
});

const Student = model('Student', studentSchema);

export default Student;