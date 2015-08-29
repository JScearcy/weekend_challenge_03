$(document).ready(function(){

  $shoutOutDiv = $('.students');
  var indexCount = 1;
  var shoutOuts = [];
  $h1 = $('#head');

  function getShoutOuts(){
    return $.ajax({
      type: 'GET',
      url: '/shoutouts',
      dataType: 'json'
    }).done(function(data){
      shoutOuts = data;
    })
  };

  function displayShoutOut(obj){
    $newShoutDiv = $('<div>').attr({class: 'studentShoutOut', id: obj.id});
    $rightpinDiv = $('<div>').attr({class: 'redpin'});
    $leftpinDiv = $('<div>').attr({class: 'bluepin'});
    $newNameP = $('<p>').attr({class: 'studentName'});
    $newShoutP = $('<p>').attr({class: 'shoutoutP'});
    $newNameP.text(obj.name);
    $newShoutP.text(obj.shoutout);
    $newShoutDiv.append($rightpinDiv).append($leftpinDiv).append($newNameP).append($newShoutP);
    $shoutOutDiv.append($newShoutDiv.hide());
  }

  $.when(getShoutOuts()).done(function(){
    $('#loading').remove();
    shoutOuts.forEach(function(obj){
      displayShoutOut(obj);
    })
    var $nextBut = $('<button>').attr({class: 'nextBut', id: 'Next'}).text('Next').append($('<span>').attr({class: 'glyphicon glyphicon-chevron-right'}));
    var $prevBut = $('<button>').attr({class: 'prevBut', id: 'Prev'}).text('Prev').prepend($('<span>').attr({class: 'glyphicon glyphicon-chevron-left'}));
    $('div div:first-child').show('fade').addClass('show');
    $shoutOutDiv.append($prevBut).append($nextBut);

  $shoutOutDiv.on('click', '#Next', function(){
    $('#' + indexCount).hide().removeClass('show');
    indexCount++;
    if(indexCount == 19) {
      indexCount = 1;
    }
    $('#' + indexCount).show('fade').addClass('show');
  });
  $shoutOutDiv.on('click', '#Prev', function(){
    $('#' + indexCount).hide().removeClass('show');
    indexCount--;
    if(indexCount == 0) {
      indexCount = 18;
    }
    $('#' + indexCount).show('fade').addClass('show');
  });
  })
})
