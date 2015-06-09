var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoloads de comandos con :quizId

router.param('quizId', quizController.load);

//definicion rutas quizes

router.get('/quizes',                       quizController.index);
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);

//nueva pregunta
router.get('/quizes/new',                   quizController.new);
router.post('/quizes/create',               quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',    quizController.edit);
router.put('/quizes/:quizId(\\d+)',         quizController.update);
router.delete('/quizes/:quizId(\\d+)',      quizController.destroy);

router.get('/quizes/search',                quizController.search);

router.get('/author', function (req, res){
	res.render('author', {errors: []});
});

module.exports = router;
