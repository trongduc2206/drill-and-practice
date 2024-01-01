import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as answerOptionService from "../../services/answerOptionService.js";
import * as answerService from "../../services/answerService.js";

const showTopic = async ( context ) => {
    const data = {
        topics: [],
        topic: ''
    }
    data.topics = await topicService.getAll();
    context.render("topic.eta", data);
};

const addTopic = async ( context ) => {
    const body = context.request.body({ type: "form" });
    const params = await body.value;
    
    const topicName = params.get("name");
    console.log(`topic name is ${topicName}`);
    console.log(`topic length is ${topicName.length}`);

    const errorData = {
        errors: [],
        topic: topicName,
        topics: await topicService.getAll()
    }


    if(!topicName || topicName.length < 1 || !/\S/.test(topicName)) {
        console.log("yes");
        // context.response.redirect("/topics");

        errorData.errors.push("Topic name must contain at least 1 character");
        context.render("topic.eta", errorData)
    } else {
        const checkTopic = await topicService.getByName(topicName);
        console.log(`check topic ${checkTopic}`);
        if(checkTopic && checkTopic.length > 0) {
            errorData.errors.push("This topic name is already existed");
            context.render("topic.eta", errorData);
        } else {
            await topicService.addTopic(
                context.user.id,
                topicName,
              );
            
            context.response.redirect("/topics");
        }
    }
};

const deleteTopic = async ({request, response, params}) => {
    const topicId = params.id;

    const questionsOfTopic = questionService.getByTopic(topicId);
    
    if(questionsOfTopic) {
        for(var i = 0; i < questionsOfTopic.length; i++) {
            await answerOptionService.deleteByQuestion(questionsOfTopic[i].id);
            await answerService.deleteByQuestion(questionsOfTopic[i].id);
        }
    }

    await questionService.deleteByTopic(topicId);

    await topicService.deleteTopic(topicId);
    response.redirect("/topics");
}

const showTopicSpecific = async ({ render, request, response, params }) => {
    const data = {
        topic: {},
        questions: []
    }
    const topicId = params.id;
    data.questions = await topicService.getQuestionOfTopic(topicId)
    data.topic = await topicService.getById(topicId);
    console.log(data);
    render("topicSpecific.eta", data)
}

export { showTopic, showTopicSpecific, addTopic, deleteTopic };