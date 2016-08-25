// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');

  function shortBookString(book) {
      if(!book) return "";
      var str = book.title; 
      var tags = book.tags ? book.tags : '';
      if(tags) str += (': ' + tags); 
      console.log(JSON.stringify(book));      
      str += "|" + book.id; // TEMP TODO HACK :(
      return str; 
  }
  
  $.get('/books', function(books) {
    books.forEach(function(book) {
 
      $('<li class="a-book"></li>').text(shortBookString(book)).appendTo('ul#books');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    the_dream = $('#input_book').val();
    the_tags = $('#input_tag').val();
    the_author = $('#input_author').val(); 
    $.post('/books?' + $.param({title: the_dream, tags: the_tags, author: the_author}), function() {
      console.log('entered success callback');
      $('<li class="a-book"></li>').text(the_dream + ": " + the_tags).appendTo('ul#books');
      $('input').val('');
      $('input').focus();
    });
  });
  
  $("#books li").click(function(event){
    //event.preventDefault();
    console.log('clicked a book');
  });

});
  

