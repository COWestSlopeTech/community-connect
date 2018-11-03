const User = require('../models/User');
const Tag = require('../models/Tag');

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
  let tags_array = [];

  // For each tag entered, hash it, and then check the DB if there is already a hash associated with that 
  // value. If there is, that tag already exists, so don't save it to the DB
  for (var i = 0; i < skills_array.length; i ++) {
    new_tag = new Tag.tag({name: skills_array[i]});
    new_hash = new_tag.hashTag();
    if (Tag.tag.find({hash:new_hash}, (err, tags) => {
      if (tags.length > 0) {
        return false;
      } else {
        return true;
      }
    })) {
      new_tag.save((err, tag) => {
        if (err) return console.error(err);
      });
    }

    // At this point, the tag has been created (and possibly saved). Push it onto the Users tag array.
    tags_array.push(new_tag);
  }

  console.log('BTW: skills - ' + tags_array);

  User.findById(req.user.id, (err, user) => {
    user.tags(tags_array);
    user.save((err) => {
      res.redirect('/account');
    });
  });
  

 };
