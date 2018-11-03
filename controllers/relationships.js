/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('relationships', {
    title: 'Relationships'
  });
};
