
Meteor.subscribe('posts');

Template.posts.helpers({
	posts: function () {
		return Posts.find({},{sort: {pub_date: -1}});
	}
});

Template.postUpdate.events({
	'submit .article-form': function (event) {
        event.preventDefault();
        var data = event.target;
        var id = this._id;      
        var isPrivate = data.isPrivate.checked;   
        var post = {
        	title : data.title.value,
        	isPrivate : isPrivate,
        	description : data.description.value,
        	body : data.body.value
        };
        var errors = validateForm(post);
        if(!formErros(errors)) {
            Meteor.call('updatePost', id, post);
            Router.go('/post/' + id);
        }
	}
});

Template.addForm.events({
	'click .cancel': function (event){
		var articleForm = $('.hidden-form');
		articleForm.slideToggle('quick');
        clearForm();
	},
	'submit .article-form': function (event) {
        event.preventDefault();
        var data = event.target;
        var isPrivate = data.isPrivate.checked;
        var post = {
        	title : data.title.value,
        	isPrivate : isPrivate,
        	description : data.description.value,
        	body : data.body.value
        };
        var errors = validateForm(post);
        if(!formErros(errors)){
            Meteor.call('addPost', post);
            var articleForm = $('.article-form');
            articleForm.slideToggle('quick');
        }
	}
});

Template.post.events({
	'click .delete': function(){
        var id = this._id;
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false,
            html: false
        }, function(){
            swal("Deleted!",
            "Your imaginary file has been deleted.",
            "success");
            Meteor.call('removePost', id);
        });
	}
});

Template.posts.events({
	'click .add-article': function (event){
		var articleForm = $('.article-form');
		articleForm.slideToggle('quick');
        clearForm();
	}
});

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_ONLY'
});
