// for publishes use server/publications.js file, for methods - server/methods.js file
Meteor.publish('posts', function(query){
	return Posts.find({
		$or: [
			{isPrivate: {$ne: true}},
			{owner: this.userId}
		]
	});
});

Meteor.methods({
	'addPost': function(post){
		if(!Meteor.userId()) 
			throw new Meteor.Error('You must be loginin!');
		post.pub_date = new Date(),
    	post.owner = Meteor.userId(),
    	post.username = Meteor.user().username;
    	Posts.insert(post);
	}, 
	'removePost': function(id){
		var post = Posts.findOne(id);
		if (post.owner !== Meteor.userId()) 
			throw new Meteor.Error('You must be author of this post!');
		Posts.remove(id);
	},
	'updatePost': function(id, post){
		var oldPost = Posts.findOne(id);
		if(oldPost.owner !== Meteor.userId())
			throw new Meteor.Error('You must be author of this post!');
		Posts.update(id, {$set: post});
	},
});
