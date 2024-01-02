import * as questionService from "../../services/questionService.js"
import * as topicService from "../../services/topicService.js"
import * as answerOptionService from "../../services/answerOptionService.js"
import * as answerService from "../../services/answerService.js"

const addOption = async ({request, response, render, params}) => {
    const body = request.body({ type: "form" });
    const paramsBody = await body.value;

    // const question = paramsBody.get("question_text");

    const option = paramsBody.get('option_text')
    
    let isCorrect = false;
    
    const data = {
        errors: [],
        option: option,
        isCorrect: isCorrect,
        topic: {name: ''},
        question: {question_text: ''},
        options: []
    }

    
    const isCorrectFromForm = paramsBody.get('is_correct');
    if(isCorrectFromForm != null) {
        isCorrect = true;
    }

    const topicId = params.id;
    const questionId = params.qId;

    const topic = await topicService.getById(topicId);
    if(topic) {
        data.topic = topic;
    }
    const question = await questionService.getById(questionId);
    if(question) {
        data.question = question[0];
    }
    const options = await answerOptionService.getByQuestionId(questionId);
    if(options && options.length >= 1) {
        data.options = options;
    }


    if(!option || option.length < 1 || !/\S/.test(option)) {
        data.errors.push("Option must contain at least 1 character");
        render("questionSpecific.eta", data)
    } else {
        await answerOptionService.addAnswerOption(questionId, option, isCorrect)
        response.redirect(`/topics/${topicId}/questions/${questionId}`)
    }

    
}

const deleteAnswerOption = async ({request, response, params}) => {
    const topicId = params.id;
    const questionId = params.qId;
    const optionId = params.oId;

    await answerService.deleteByAnswerOption(questionId, optionId);
    await answerOptionService.deleteById(optionId);

    response.redirect(`/topics/${topicId}/questions/${questionId}`)

}

export {addOption, deleteAnswerOption};