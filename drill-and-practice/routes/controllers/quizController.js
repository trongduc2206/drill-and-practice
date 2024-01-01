import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as answerOptionService from "../../services/answerOptionService.js"
import * as answerService from "../../services/answerService.js"

const showQuiz = async ({ render }) => {
    const data = {
        topics: [],
    }
    data.topics = await topicService.getAll();
    render("quiz.eta", data);
};

const chooseQuestion = async ({request, response, params, render}) => {
    const topicId = params.tId;
    const questions = await questionService.getByTopic(topicId);
    if(questions && questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const randomQuestion = questions[randomIndex];
        console.log("redirect to quiz question");
        response.redirect(`/quiz/${topicId}/questions/${randomQuestion.id}`)
    } else {
        const topic = await topicService.getById(topicId);
        const data = {
            topics: await topicService.getAll(),
            errors: [`Topic ${topic.name} does not have any questions`]
        }
        render("quiz.eta", data);
    }
}

const showQuizQuestion = async ({request, response, params, render }) => {
    console.log("showQuizQuestion");
    const topicId = params.tId;
    const questionId = params.qId;

    const data = {
        topic: {anme: ''},
        question: {question_text: ''},
        options: []
    }

    const topic = await topicService.getById(topicId);
    if(topic) {
        data.topic = topic;
    }

    const question = await questionService.getById(questionId);
    console.log(`quiz question`);
    console.log(question);
    if(question && question.length > 0) {
        data.question = question[0];
    }

    const options = await answerOptionService.getByQuestionId(questionId);
    if(options && options.length > 0) {
        data.options = options
    }
    console.log('data: ');
    console.log(data);
    render("quizQuestion.eta", data);
}

const answerQuestion = async ({request, response, params, user}) => {
    const topicId =  params.tId;
    const questionId = params.qId;
    const optionId = params.oId;
    const userId = user.id;

    await answerService.addAnswer(userId, questionId, optionId);

    const option = await answerOptionService.getById(questionId, optionId);
    if(option && option.length > 0 && option[0].is_correct) {
        response.redirect(`/quiz/${topicId}/questions/${questionId}/correct`)
    } else {
        response.redirect(`/quiz/${topicId}/questions/${questionId}/incorrect`)
    }
}

const showCorrectResult = async ({request, response, params, render }) => {
    const topicId = params.tId;
    const questionId = params.qId;

    const topic = await topicService.getById(topicId);
    const data = {
        question: '',
        correct: true,
        topic: topic,
    }

    const question = await questionService.getById(questionId);
    if(question && question.length > 0) {
        data.question = question[0];
    }

    render("result.eta", data);
}

const showIncorrectResult = async ({request, response, params, render }) => {
    const topicId = params.tId;
    const questionId = params.qId;

    const data = {
        correct: false,
        question: '',
        topic: {name: ''},
        correctOption: ''
    }

    const question = await questionService.getById(questionId);
    if(question && question.length > 0) {
        data.question = question[0];
    }

    const topic = await topicService.getById(topicId);
    const correctOption = await answerOptionService.getCorrectOptionByQuestion(questionId);
    
    if(topic) {
        data.topic = topic;
    }

    if(correctOption && correctOption.length > 0) {
        data.correctOption = correctOption[0].option_text
    }

    render("result.eta", data);
}

export { showQuiz, showQuizQuestion, showCorrectResult, showIncorrectResult, chooseQuestion, answerQuestion };