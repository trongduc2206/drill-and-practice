import { sql } from "../database/database.js";

const getAll = async () => {
    const rows = await sql`SELECT * FROM topics ORDER BY name ASC`;
    return rows;
}

const getById = async (id) => {
    const rows = await sql`SELECT * FROM topics WHERE id = ${id}`;
    return rows[0];
}

const getByName = async (name) => {
    const rows = await sql`SELECT * FROM topics WHERE name = ${name}`;
    return rows;
}

const getQuestionOfTopic = async (topicId) => {
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`;
    return rows;
}

const addTopic = async (userId, name ) => {
    await sql`INSERT INTO topics
        (user_id, name)
          VALUES (${userId}, ${name})`;
};

const deleteTopic = async (id) => {
    await sql`DELETE FROM topics WHERE id = ${id}`;
}

export {getAll, getById, getQuestionOfTopic, addTopic, getByName, deleteTopic};