$(function() {

    var username,email,file;

    console.log("Submit-form loaded");

              $(".username").blur(function () {

                username = this.value;

                  if (this.value.length <= 3) {
                      $('.username-error').text("*username must be morethan 3 characters");
                  } else {
                      $('.username-error').text("");
                  }
              });
              
              $(".email").blur(function () {

                  email = this.value;

                 if (this.value.length == "") {
                     $('.email-error').text("*Email is required");
                 } else {
                     $('.email-error').text("");
                 }
            });

              $(".userfile").blur(function () {

                file = this.value;

                 if (this.value.length == "") {
                     $('.file-error').text("* select your file");
                 } else {
                     $('.file-error').text("");
                 }
            });

            $("#upload-files").on('submit', function(e){

                e.preventDefault();

                if(username && email && file){

                  $('#loading').show();
                //   $('.submit').val("submitting...");
                  $(".submit").prop('value', 'submitting...');
                        $.ajax({
                        url: "form-submission.php", // Url to which the request is send
                        type: "POST",             // Type of request to be send, called as method
                        data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                        contentType: false,       // The content type used when sending data to the server.
                        cache: false,             // To unable request pages to be cached
                        processData:false,        // To send DOMDocument or non processed data file it is set to false
                        success: function(data)   // A function to be called if request succeeds
                                 {
                                     console.log("data suceessfully sent");
                                     $('#loading').hide();
                                     $(".submit").prop('value', 'submit');

                                     $('#popup1').modal('hide');

                                     $.toast({
                                        heading: "success",
                                        text: "Your message successfully sent",
                                        position: 'top-center',
                                        showHideTransition: 'slide',
                                        icon: 'success'
                                    })
                                 }
                        });
                 }
        });

});