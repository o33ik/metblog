// document ready don't required. Also, in tmpl.onRendered DOM loaded already.
$(document).ready(function(){

    validateForm = function (form){
        var error_field;
        var error_fields = [];
        var ERROR_MASSAGES = {
            'short_title': 'Title should be more than 6 characters',
            'empty_field': 'This field is required'
        };

        function ValidateError(field, massege){
            this.field = field;
            this.massge = massege;
        }

        for(var f in form){
            if( f==='isPrivate') continue;
            if(!form[f]){
                error_field = new ValidateError(f, ERROR_MASSAGES['empty_field']);
                error_fields.push(error_field);
            }
        }
        if(form['title'].length < 6) {
            error_field =new ValidateError('title', ERROR_MASSAGES['short_title']);
            error_fields.push(error_field);
        }
        return error_fields;
    };

    formErros = function(errors){
        clearError();
        if (errors.length > 0){
            for(var e in errors){
                var errorField = $('#' + errors[e].field + '-error');
                errorField.addClass('error-field');
                errorField.text(errors[e].massge);
                errorField.show();
            }
            return true;
        }
        return false;
    };

    clearError = function(){
        $('.error').each(function(){
            $(this).removeClass('error-field');
            $(this).text('');
            $(this).hide();
        });
    };

    clearForm = function(){
        clearError();
        var clearValue = function(){
            if($(this).attr('type') ==='checkbox'){
                $(this).attr('checked', false);
            }
            $(this).val('');
        };
        $('input').not('input[type="submit"]').each(clearValue);
        $('textarea').each(clearValue);
    };

});
