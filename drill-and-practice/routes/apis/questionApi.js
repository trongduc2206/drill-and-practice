import * as questionService from "../../services/questionService.js"
import * as answerOptionService from "../../services/answerOptionService.js"

const getQuestion = async ({response}) => {
    const questions = await questionService.getAll();
    if(questions && questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const randomQuestion = questions[randomIndex];
    
        const answerOptions = await answerOptionService.getByQuestionId(randomQuestion.id);
        let answerOptionsDto  = [];
        if(answerOptions && answerOptions.length > 0) {
            answerOptions.forEach(answerOption => {
                answerOptionsDto.push({optionId: answerOption.id, optionText: answerOption.option_text})
            });
        }
        const data = {
            questionId: randomQuestion.id,
            questionText: randomQuestion.question_text,
            answerOptions: answerOptionsDto
        }
    
        response.body = data;
    } else {
        response.body = {};
    }
}

const verifyAnswer = async ({request, response}) => {
    const body = request.body({ type: "json" });
    const document = await body.value;

    const questionId = document.questionId;
    const optionId = document.optionId;

    const option = await answerOptionService.getById(questionId, optionId);

    const data = {
        correct: false
    }

    
    if(option && option.length > 0 && option[0].is_correct) {
        data.correct = true; 
    }

    response.body = data;
}

export { getQuestion, verifyAnswer }