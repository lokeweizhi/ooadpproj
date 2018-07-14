// Show home screen
exports.show = function(req, res) {
	var login = (req.session.passport) ? req.session.passport.user : false;
	var accountType;
	if (login) 
	{
		var accountType = (req.user.accountType) ? req.user.accountType : false;
	}
	// Render home screen
	if (accountType == "Admin") {
		res.render('adminIndex', {
			title: 'Adamire - Admin Dashboard',
		});
	}
	else{
		res.render('index', {
			title: 'Adamire - Home Page',
			callToAction: 'ITP211'
		});
	}
};
