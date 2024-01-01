import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as quizController from "./controllers/quizController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as questionController from "./controllers/questionController.js";
import * as answerOptionController from "./controllers/answerOptionController.js"
import * as questionApi from "./apis/questionApi.js"

const router = new Router();

router.get("/topics/:id/questions/:qId", questionController.showQuestionSpecific);
router.get("/topics/:id", topicController.showTopicSpecific);
router.get("/topics", topicController.showTopic);

router.post("/topics/:id/delete", topicController.deleteTopic);
router.post("/topics/:tId/questions/:qId/delete", questionController.deleteQuestion);
router.post("/topics/:id/questions/:qId/options", answerOptionController.addOption);
router.post("/topics/:id/questions/:qId/options/:oId/delete", answerOptionController.deleteAnswerOption);
router.post("/topics/:id/questions", questionController.addQuestion);



router.post("/topics", topicController.addTopic);

router.get("/quiz/:tId/questions/:qId/correct", quizController.showCorrectResult);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.showIncorrectResult);
router.get("/quiz/:tId/questions/:qId", quizController.showQuizQuestion);
router.get("/quiz/:tId", quizController.chooseQuestion);
router.get("/quiz", quizController.showQuiz);

router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.answerQuestion);

router.get("/", mainController.showMain);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/logout", loginController.logout)
router.post("/logout", loginController.logout)

router.get("/api/questions/random", questionApi.getQuestion)
router.post("/api/questions/answer", questionApi.verifyAnswer)

export { router };
