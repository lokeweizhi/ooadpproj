// Show home screen
exports.show = function(req, res) {
	var login = (req.session.passport) ? req.session.passport.user : false;
	// Render home screen
	res.render('index', {
		title: 'Adamire - Home Page',
		callToAction: 'ITP211'
	});
};
