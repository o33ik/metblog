
Template.registerHelper('formatDate', function(date) {
    var months = ["January", "February", "March", "April", "May", "June",
    	"July", "August", "September", "October", "November", "December"
	];
    return months[date.getMonth()] + ' '+ date.getDate() + ' ' + date.getFullYear();
});

Template.registerHelper('isOwner', function(){
   return this.owner === Meteor.userId();
});
// use Template.tmpl.onRendered(function(){})
Template.addForm.rendered = function() {
   $('#body').ckeditor();
};
// for different templates use different .html and .js files
Template.postUpdate.rendered = function() {
   $('#body').ckeditor();
};

Template.postDetail.onRendered(function(){
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
});
