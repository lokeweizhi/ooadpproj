// Show home screen
exports.show = function(req, res) {
	var login = (req.session.passport) ? req.session.passport.user : false;
	// Render home screen
	res.render('offers', {
		title: 'Adamire - Offers',
	});
};
