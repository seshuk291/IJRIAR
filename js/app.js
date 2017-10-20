$(function() {


    $('body').prepend('<a href="submit-paper.html" class="right-button btn btn-primary">submit paper</a>');
     
    var width =  $(document).width();

    if(width <= 615){
        $('nav ul').append(`
        
        <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="submit-paper.html">Submit paper</a>
        </li>
        
        `);
    }


// $('nav').addClass()

    var username, message, email, subject;

    console.log("page loaded");

    $("#username").blur(function () {
        username = this.value;
        if (this.value.length <= 3) {
            $('#username-error').text("*username must be morethan 3 characters");
        } else {
            $('#username-error').text("");
        }
    });


    $("#message").blur(function () {
        message = this.value;
        if (this.value.length <= 20) {
            $('#message-error').text("*Message must be more than 20 characters");
        } else {
            $('#message-error').text("");
        }
    });

    $("#subject").blur(function () {
        subject = this.value;
    });

    $("#email").blur(function () {
        email = this.value;
        if (this.value.length == "") {
            console.log("email invalid");
            $('#email-error').text("*Email is required");
        } else {
            $('#email-error').text("");
        }
    });


    $("#contact-button").on('click', function (e) {

        // $("#contact-button").preventDefault();
        e.preventDefault();

        console.log("Button clicked");
        var ContactInfo = {
            username: username,
            email: email,
            subject: subject,
            message: message
        }

        console.log(ContactInfo);
        
        ContactInfo = JSON.stringify(ContactInfo);


        if (email && message && username) {

            console.log(ContactInfo);

            $('#loading').show();
           
            
            $.post("./contactform.php", ContactInfo,
                function (data, status, complete) {
                    // console.log(data);
                    console.log(status);
                    console.log("complete", complete);

                    if (status == "success") {
                        $.toast({
                            heading: "success",
                            text: "Your message successfully sent",
                            position: 'top-center',
                            showHideTransition: 'slide',
                            icon: 'success'
                        })
                        $("#message,#email,#username,#subject").val('');
                        $('#loading').hide();
                    } else {
                        $.toast({
                            heading: "danger",
                            text: "there was a problem with your connection",
                            position: 'top-center',
                            showHideTransition: 'slide',
                            icon: 'danger'
                        })
                        $('#loading').hide();
                    }
                });
        }
        else{
            alert("Please fill all the required fields")
        }
    });

})