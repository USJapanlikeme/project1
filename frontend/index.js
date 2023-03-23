$(document).ready(function(){
    var ENDPOINT = 'https://49m604p9he.execute-api.us-east-2.amazonaws.com/booksdev/bookservice'
    // var CF = 'https://d81m7c2l37x05.cloudfront.net'
    var dialog = document.querySelector('dialog');
    var showModalButton = $('.show-modal');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    $(document).on('click', '.show-modal', function(e) {
        e.preventDefault();
        var book = $(this).data('book_id');
        var genre = $(this).data('genre');
        console.log(book, genre);
        $('#showBox').html('<img style="width:100%" src="'+'./qrcodes/'+book+'/'+genre+'/qrcode.jpg"/>');
        dialog.showModal();
    });
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });
    dialog.querySelector('.print').addEventListener('click', function() {
        print();
    });
    function load_data(){
        $.ajax({
            url: ENDPOINT +'/books/*',
            method: 'get',
            success: function(r){
                var html = '';
                html += '<ul class="demo-list-three mdl-list mdl-cell mdl-cell--4-col">'
                r['items'].forEach(function(item) {
                    html += '<li class="mdl-list__item mdl-list__item--three-line"> <span class="mdl-list__item-primary-content"> <i class="material-icons mdl-list__item-avatar">person</i> <span>'
                    html += item['author_name']
                    html += '</span> <span class="mdl-list__item-text-body">'
                    html += 'From. ' + item['publisher'] +'<br/> '+item['genre']
                    html += '</span> </span> <span class="mdl-list__item-secondary-content"> <a data-book_id="'+item['book_id']+'" data-genre="'+item['genre']+'" class="show-modal mdl-list__item-secondary-action" href="#"><i class="material-icons">print</i></a> </span> </li>'
                })
                html += '</ul>'
                $('#history').html(html);
            },
            fail: function(err){
                console.log('failed', err);
            },
            complete: function(r){
                console.log('completed', r);
            }
        });
    }
    $('#submitButton').on('click', function(e){
        var book_id = $('#book_id').val();
        var genre = $('#genre').val();
        var author_name = $('#author_name').val();
        var phone_number = $('#phone_number').val();
        var publisher = $('#publisher').val();
        $.ajax({
            url: ENDPOINT,
            method: 'post',
            datatype: 'json',
            async: true,
            data:JSON.stringify({
                genre: genre,
                book_id: book_id,
                author_name: author_name,
                phone_number: phone_number,
                publisher: publisher
            }),
            beforeSend: function(){
                $('#p2').show();
            },
            success: function(r){
                console.log('success', r);
            },
            fail: function(err){
                console.log('failed', err);
                alert('failed! reloading...')
            },
            complete: function(r){
                console.log('completed', r);
                setTimeout(function() {
                    $('#p2').hide();
                    // location.reload();
                }, 1000);
            }
        });
    });
    load_data();
})
