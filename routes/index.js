var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoloads de comandos con :quizId

router.param('quizId', quizController.load);

//definicion rutas session

router.get('/login',                        sessionController.new);
router.post('/login',                       sessionController.create);
router.get('/logout',                       sessionController.destroy);

//definicion rutas quizes

router.get('/quizes',                       quizController.index);
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);

//nueva pregunta
router.get('/quizes/new',                   sessionController.loginRequired, quizController.new);
router.post('/quizes/create',               sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',    sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',         sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',      sessionController.loginRequired, quizController.destroy);

router.get('/quizes/search',                quizController.search);

router.get('/quizes/:quizId(\\d+)/comments/new',      commentController.new);
router.post('/quizes/:quizId(\\d+)/comments/create',         commentController.create);

router.get('/author', function (req, res){
	res.render('author', {errors: []});
});

module.exports = router;
