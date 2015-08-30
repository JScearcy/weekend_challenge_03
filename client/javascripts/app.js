$(document).ready(function(){
  $shoutOutDiv = $('.students');
  $infoContainer = $('.infoContainer');
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
    $newShoutUl = $('<ul>');
    $newNameLi = $('<li>').attr({class: 'studentName', id: ('name' + obj.id + obj.id)});
    $newShoutLi = $('<li>').attr({class: 'shoutOut', id: ('Shout' + obj.id + obj.id)});
    $newNameLi.text(obj.name);
    $newShoutLi.text(obj.shoutout);
    $newShoutDiv.append($newNameLi).append($newShoutLi);
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
    var $randBut = $('<button>').attr({class: 'randBut', id: 'Rand'}).text('Random')
    $('#' + indexCount).show({effect: 'blind', direction: 'vertical', duration: 400});
    // $('#' + indexCount).webTicker();
    $infoContainer.append($prevBut).append($randBut).append($nextBut);
  //when the next button is clicked, hides the current slide and shows the next one.
  $infoContainer.on('click', '#Next', function(){
    $('#' + indexCount).hide({effect: 'fade'});
    indexCount++;
    if(indexCount == 19) {
      indexCount = 1;
    }
    $('#' + indexCount).delay(400).show({effect: 'blind', direction: 'vertical', duration: 400});
  });
  //when the prev button is clicke, hides the current slide and shows the previous one
  $infoContainer.on('click', '#Prev', function(){
    $('#' + indexCount).hide({effect: 'fade'});
    indexCount--;
    if(indexCount == 0) {
      indexCount = 18;
    }
    $('#' + indexCount).delay(400).show({effect: 'blind', direction: 'vertical', duration: 400});
  });
  //when the random button is clicked pick random index number and display it
  $infoContainer.on('click', '#Rand', function (){
    var randID = Math.floor((Math.random() * (shoutOuts.length - 1)) + 1);
    $('#' + indexCount).hide({effect: 'fade'});
    indexCount = randID
    $('#' + indexCount).delay(400).show({effect: 'blind', direction: 'vertical', duration: 400});
  })
  })
})
