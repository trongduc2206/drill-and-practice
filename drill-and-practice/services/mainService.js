import { sql } from "../database/database.js";

const getTotalNumOfTopic = async () => {
    const rows = await sql`SELECT count(*) as count FROM topics`;
    return rows[0].count;
};

const getTotalNumOfQuestion = async () => {
    const rows = await sql`SELECT count(*) as count FROM questions`;
    return rows[0].count;
};

const getTotalNumOfAnswer = async () => {
    const rows = await sql`SELECT count(*) as count FROM question_answers`;
    return rows[0].count;
};

export {getTotalNumOfAnswer, getTotalNumOfQuestion, getTotalNumOfTopic};