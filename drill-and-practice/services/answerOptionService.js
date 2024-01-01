import { sql } from "../database/database.js";

const getById = async ( questionId, optionId) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE id = ${optionId} AND question_id = ${questionId}`;
    return rows;
}

const getByQuestionId = async (questionId) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
    return rows;
}

const getCorrectOptionByQuestion = async (questionId) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId} AND is_correct = true`;
    return rows;
}

const addAnswerOption = async (questionId, option, isCorrect) => {
    await sql`INSERT INTO question_answer_options( question_id, option_text, is_correct ) VALUES( ${questionId}, ${option}, ${isCorrect})`
}

const deleteByQuestion = async (questionId) => {
    await sql`DELETE FROM question_answer_options WHERE question_id = ${questionId}`;
}

const deleteById = async (optionId) => {
    await sql`DELETE FROM question_answer_options WHERE id = ${optionId}`;
}

export { getById, getByQuestionId, getCorrectOptionByQuestion, addAnswerOption, deleteByQuestion, deleteById };