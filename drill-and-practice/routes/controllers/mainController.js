import * as mainService from "../../services/mainService.js";

const showMain = async ({ render }) => {
  const data = {
    topics: 0,
    questions: 0,
    answers: 0
  }
  data.topics = await mainService.getTotalNumOfTopic();
  data.questions = await mainService.getTotalNumOfQuestion();
  data.answers = await mainService.getTotalNumOfAnswer();
  console.log("hello")
  render("main.eta", data);
};

export { showMain };
