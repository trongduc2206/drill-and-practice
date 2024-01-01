import { sql } from "../database/database.js";

const getAll = async () => {
    const rows = await sql`SELECT * FROM questions`;
    return rows;
}

const getByTopic = async (topicId) => {
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`;
    return rows;
}

const getById = async (questionId) => {
    const rows = await sql`SELECT * FROM questions WHERE id = ${questionId}`;
    return rows;
}

const addQuestion = async (userId, topicId, question) => {
    await sql`INSERT INTO questions(user_id, topic_id, question_text) VALUES(${userId}, ${topicId}, ${question})`;
}

const deleteByTopic = async (topicId) => {
    await sql`DELETE FROM questions WHERE topic_id = ${topicId}`;
}

const deleteById = async (questionId) => {
    await sql`DELETE FROM questions WHERE id = ${questionId}`;
}

export { getAll, getByTopic, getById, addQuestion, deleteByTopic, deleteById};