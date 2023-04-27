$(document).ready(function() {
    $('#my-form').submit(function(event) {
        event.preventDefault(); // Formun gönderimini iptal et
        $.ajax({
            method: 'POST',
            url: '/kullanici-detay',
            data: $(this).serialize(),
            success: function(response) {
                if (response.validation_error && response.validation_error.length > 0) {
                    $('#error-message').empty(); // Önceki hataları temizle
                    response.validation_error.forEach(element => {
                      $('#error-message').append(element.msg + "<br>");
                      console.log(element.msg)
                    });
                    $('#alertthis').show();
                  } else {
                    $('#alertthis').hide();
                  }
              }
        });
    })
})
// ben böyle bi çözüm yapmıstım :D benzer şey hocam neredeyse aynı yine istek atmışsınız aynı yani pek fark yok bunda

 