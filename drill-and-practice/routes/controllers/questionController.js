import * as questionService from "../../services/questionService.js"
import * as topicService from "../../services/topicService.js"
import * as answerOptionService from "../../services/answerOptionService.js"

const addQuestion = async ({request, response, render, params, user}) => {
    const topicId = params.id;

    const body = request.body({ type: "form" });
    const paramsBody = await body.value;

    const question = paramsBody.get("question_text");

    const errorData = {
        errors: [],
        question: question,
        topic: await topicService.getById(topicId),
        questions: await topicService.getQuestionOfTopic(topicId)
    }

    if(!question || question.length < 1 || !/\S/.test(question)) {
        console.log("question validate fail start")
        console.log(errorData.question.length);
        console.log("question validate fail end")
        errorData.errors.push("Question must contain at least 1 character");
        render("topicSpecific.eta", errorData)
    } else {
        await questionService.addQuestion(user.id, topicId, question);
        response.redirect(`/topics/${topicId}`)
    }
}

const showQuestionSpecific = async ({ params, render}) => {
    const topicId = params.id;
    const questionId = params.qId;

    const data = {
        topic: {name: ''},
        question: {question_text: ''},
        options: []
    }

    const topic = await topicService.getById(topicId);
    if(topic) {
        data.topic = topic;
    }
    const question = await questionService.getById(questionId);
    if(question) {
        data.question = question[0];
    }
    const options = await answerOptionService.getByQuestionId(questionId);
    console.log(options)
    if(options && options.length >= 1) {
        data.options = options;
    }

    render("questionSpecific.eta", data)

}

const deleteQuestion = async ({request, response, params}) => {
    const topicId = params.tId;
    const questionId = params.qId;

    await questionService.deleteById(questionId);
    response.redirect(`/topics/${topicId}`)
}

export {addQuestion, showQuestionSpecific, deleteQuestion};