
Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){
	this.route('posts', {path:'/'});
	this.route('postDetail', {
		path: '/post/:_id',
		data: function(){
			return Posts.findOne({_id:this.params._id});
		}
	});
	this.route('postUpdate', {
		path: '/update/:_id',
		data: function(){
			return Posts.findOne({_id:this.params._id});
		}
	});
});

