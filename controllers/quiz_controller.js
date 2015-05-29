
exports.question = function (req, res){
	res.render('quizes/question', { pregunta: '¿Capital de Italia?'});
}

exports.answer = function (req, res){
	if(req.query.respuesta === 'Roma') 
		res.render('quizes/question', { respuesta: 'Correcto'});
	else 
		res.render('quizes/question', { respuesta: 'Incorrecto'});
}