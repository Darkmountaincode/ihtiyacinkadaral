$(document).ready(function(){
    $('#yonetimajax').submit(function(event){
        event.preventDefault();
        $.ajax({
            method:'POST',
            url:'login',
            data:$(this).serialize(),
            success:function(response){
                if (response.validation_error && response.validation_error.length > 0) {
                    $('#error-message').empty();
                  response.validation_error.forEach(element => {
                    $('#error-message').append(element.msg + "<br>");
                    
                });
                $('#alertthis').show();
                } else{
                        window.location.href = ('/nadmin/')
                }
            }
        })
    })
})
$(document).ready(function() {
    $('#mykategori').submit(function(event) {
        event.preventDefault(); // Formun gönderimini iptal et
        $.ajax({
            method: 'POST',
            url: 'kategoriler',
            data: $(this).serialize(),
            success: function(response) {
                if (response.validation_error && response.validation_error.length > 0) {
                    $('#error-message').empty(); // Önceki hataları temizle
                    response.validation_error.forEach(element => {
                      $('#error-message').append(element.msg + "<br>");
                      
                      
                    });
                    $('#alertthis').show();
                  } else {
                    $('#alertthis').hide();
                  }
              }
        });
    })
})