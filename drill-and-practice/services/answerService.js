import { sql } from "../database/database.js";

const addAnswer = async (userId , questionId , questionAnswerOptionId ) => {
    await sql`INSERT INTO question_answers(user_id, question_id, question_answer_option_id) VALUES(${userId}, ${questionId}, ${questionAnswerOptionId})`;
}

const deleteByQuestion = async (questionId) => {
    await sql`DELETE FROM question_answers WHERE question_id = ${questionId}`;
}

const deleteByAnswerOption = async ( questionId, answerOptionId) => {
    await sql`DELETE FROM question_answers WHERE question_id = ${questionId} AND question_answer_option_id = ${answerOptionId}`;
}

export {addAnswer, deleteByQuestion, deleteByAnswerOption};