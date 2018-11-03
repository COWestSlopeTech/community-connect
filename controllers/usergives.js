const User = require('../models/User');

/**
 * GET /usergives
 * Contact form page.
 */
exports.getUsergives = (req, res) => {
  const unknownUser = !(req.user);

  res.render('usergives', {
    title: 'What can you give?',
    unknownUser,
  });
};

/**
 * POST /usergives
 * Saves the users skills
 */
 exports.postUsergives = (req, res) => {
  let skills = req.body.message;
  var skills_parsed = skills.split(" ");
  var skills_array = Array.from(skills_parsed);
  console.log('BTW: skills - ' + skills_array);

  User.findById(req.user.id, (err, user) => {
    user.skills(skills_array);
    user.save((err) => {
      res.redirect('/account');
    });
  });
  

 };