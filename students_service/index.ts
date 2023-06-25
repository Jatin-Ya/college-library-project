import app from './src/app';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config();

const port: number = parseInt(process.env.PORT || '3000');
const db = process.env.DB_URL as string

export const connectDb = async (connectionString: string) => {
    try {
        await mongoose.connect(connectionString);
        console.log("Connected to mongoDb...")
    } catch (err: unknown) {
        console.log({ message: "Failed to connect to mongoDB", err })
    }
}

app.listen(port, () => {
    console.log(`Library service running on port ${port}...`);
    connectDb(db);
});