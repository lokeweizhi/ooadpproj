//List one specific listing from database
exports.editChat = function(req, res) {
    var record_num = req.params.id;
    listingModel.findById(record_num).then(function (listingRecord) {
        res.render('chatsg', {
            title: " Edit Chat Page",
            item: listingRecord,
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};
