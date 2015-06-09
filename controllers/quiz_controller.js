var models = require('../models/models.js');

exports.load = function ( req, res, next, quizId){
	models.Quiz.findById(quizId).then(
		function (quiz){
			if (quiz){
				req.quiz = quiz;
				next();
			}
			else{
				next(new Error('No existe quizId= ' + quizId));
			}
		}).catch(function (error){
			next(error);
		});
};

exports.index = function (req, res){
	models.Quiz.findAll().then(function (quizes){
		res.render('quizes/index', { quizes: quizes, errors: []});
	}).catch(function(error){
		next(error);
	});
};

exports.show = function (req, res){
		res.render('quizes/show', { quiz: req.quiz, errors: [] });	
};

exports.answer = function (req, res){
	var resultado = 'Incorrecto';
	//console.log('objeto ' + req.quiz.respuesta);
	//console.log('parametro '+req.query.respuesta);
	if(req.query.respuesta === req.quiz.respuesta) 
		resultado = 'Correcto';
	 
	res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado, errors: [] });
};

exports.search = function (req, res){
	models.Quiz.findAll({where: ["pregunta like ?", '%' + req.query.search + '%']}).then(
		function (quizes){
			res.render('quizes/search', { quizes: quizes, errors: [] });
		}).catch(function(error){
		next(error);
	});
};

exports.new = function (req, res){
	var quiz = models.Quiz.build({
		pregunta : "pregunta",
		respuesta: "respuesta",
		tema: "otro"
	});
	res.render('quizes/new', { quiz: quiz, errors: [] });
};

exports.create = function (req, res){
	var quiz = models.Quiz.build(req.body.quiz);
	console.log('Probando quiz.tema');
	console.log(quiz.tema);

	quiz.validate().then(function (err){
		if (err){
			res.render('quizes/new', { quiz: quiz, errors: err.errors});
		}else{
			//Guarda en DB los campos pregunta y respuesta de quiz
			quiz.save({ fields: ["pregunta", "respuesta", "tema"]}).then(function (){
			res.redirect('/quizes');
			}); //redirecciona a la lista de preguntas
		}
	});
};

exports.edit = function (req, res){
	var quiz = req.quiz;  //autoload de la instancia de quiz

	res.render('quizes/edit', { quiz: quiz, errors: [] });
};

exports.update = function (req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;

	req.quiz.validate().then(function (err){
		if (err){
			res.render('quizes/edit', { quiz: req.quiz, errors: err.errors});
		}else{
			//Guarda en DB los campos pregunta y respuesta de quiz
			req.quiz.save({ fields: ["pregunta", "respuesta"]}).then(function (){
			res.redirect('/quizes');
			}); //redirecciona a la lista de preguntas
		}
	});
};

exports.destroy = function (req, res){
	req.quiz.destroy().then(function (){
		res.redirect('/quizes');
	}).catch(function (error){
		next(error);
	});
};