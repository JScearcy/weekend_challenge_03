$(document).ready(function(){

  $shoutOutDiv = $('.students');
  var indexCount = 1;
  var shoutOuts = [];
  $h1 = $('#head');
  //query the server for an array of objects - the students and their shout outs
  function getShoutOuts(){
    return $.ajax({
      type: 'GET',
      url: '/shoutouts',
      dataType: 'json'
    }).done(function(data){
      shoutOuts = data;
    })
  };
  //this will append all students, and their shout outs to the dom, but hide them as well, also adds different but related ids to items that will be targeted
  function displayShoutOut(obj){
    $newShoutDiv = $('<div>').attr({class: 'studentShoutOut', id: obj.id});
    $rightpinDiv = $('<div>').attr({class: 'redpin'});
    $leftpinDiv = $('<div>').attr({class: 'bluepin'});
    $newNameP = $('<p>').attr({class: 'studentName', id: (obj.id + obj.id)});
    $newShoutP = $('<p>').attr({class: 'shoutoutP', id: (obj.id + obj.id + obj.id)});
    $newNameP.text(obj.name);
    $newShoutP.text(obj.shoutout);
    $newShoutDiv.append($rightpinDiv).append($leftpinDiv).append($newNameP).append($newShoutP);
    $shoutOutDiv.append($newShoutDiv.hide());
  }
  //when the ajax query completes this runs the display function for each object in the array and adds next/prev buttons, and shows the first item
  $.when(getShoutOuts()).done(function(){
    $('#loading').remove();
    shoutOuts.forEach(function(obj){
      displayShoutOut(obj);
    })
    var $nextBut = $('<button>').attr({class: 'nextBut', id: 'Next'}).text('Next').append($('<span>').attr({class: 'glyphicon glyphicon-chevron-right'}));
    var $prevBut = $('<button>').attr({class: 'prevBut', id: 'Prev'}).text('Prev').prepend($('<span>').attr({class: 'glyphicon glyphicon-chevron-left'}));
    $('div div:first-child').show('fade').addClass('show');
    $shoutOutDiv.append($prevBut).append($nextBut);
  //when the next button is clicked, hides the current slide and shows the next one.
  $shoutOutDiv.on('click', '#Next', function(){
    $('#' + indexCount).hide().removeClass('show');
    indexCount++;
    if(indexCount == 19) {
      indexCount = 1;
    }
    $('#' + indexCount).show('fade').addClass('show');
  });
  //when the prev button is clicke, hides the current slide and shows the previous one
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
