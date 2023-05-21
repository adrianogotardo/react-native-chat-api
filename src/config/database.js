import mongoose from 'mongoose';

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch(error) {
        console.log(error);
    }
};

export { connectDatabase }