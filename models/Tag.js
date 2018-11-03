const mongoose = require('mongoose');

/**
 * Tag schema, for tagging user offerings
 */
const tagSchema = new mongoose.Schema({
    name: String,
    hash: Number
  });
  
tagSchema.methods.hashTag = function(){
    let hash = 0;
    for (var i = 0; i < this.name.length; i++) {
        let character = this.name.charCodeAt(i);
        hash = ((hash << 5) - 5) + character;
        hash = hash & hash;
    }
    this.hash = hash
    console.log("Tag hash:" + this.hash)
}
    
String.prototype.hashCode = () => {
    return hash;
}

const Tag = mongoose.model('Tag', tagSchema);

module.exports = {
    tag: Tag,
    tagSchema: tagSchema
}
