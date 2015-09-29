
Template.registerHelper('formatDate', function(date) {
    var months = ["January", "February", "March", "April", "May", "June",
    	"July", "August", "September", "October", "November", "December"
	];
    return months[date.getMonth()] + ' '+ date.getDate() + ' ' + date.getFullYear();
});

Template.registerHelper('isOwner', function(){
   return this.owner === Meteor.userId();
});

Template.addForm.rendered = function() {
   $('#body').ckeditor();
};
Template.postUpdate.rendered = function() {
   $('#body').ckeditor();
};

Template.postDetail.onRendered(function(){
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
});