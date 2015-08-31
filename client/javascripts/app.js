$(document).ready(function(){
  $shoutOutDiv = $('.students');
  $infoContainer = $('.infoContainer');
  $all = $('body');
  var indexCount = 1;
  var shoutOuts = [];
  var addedShouts = [];
  $h1 = $('#head');
  var clickIntervalID;
  //interval ID to set autoscrolling a random shoutout
  function changeShout () {
    clickIntervalID = setInterval(toggleClick, 5000);
  }
  //this triggers the random shout click
  function toggleClick() {
    $('#Rand').trigger('click');
  }
  //clear the interval and reset interval - for button clicks
  function clearAndSetShout () {
    clearInterval(clickIntervalID);
    changeShout();
  }
  //query the server for an array of objects - the students and their shout outs
  function getShoutOuts(){
    return $.ajax({
      method: 'GET',
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
  };
  function DisplayAnArray(array){
    array.forEach(function(obj){
      displayShoutOut(obj);
    })
    $('#' + indexCount).show({effect: 'fade', duration: 400});
  };
  //when the ajax query completes this runs the display function for each object in the array and adds next/prev buttons, and shows the first item
  $.when(getShoutOuts()).done(function(){
    $('#loading').remove();
    DisplayAnArray(shoutOuts);
    var $nextBut = $('<button>').attr({class: 'nextBut', id: 'Next'}).text('Next').append($('<span>').attr({class: 'glyphicon glyphicon-chevron-right'}));
    var $prevBut = $('<button>').attr({class: 'prevBut', id: 'Prev'}).text('Prev').prepend($('<span>').attr({class: 'glyphicon glyphicon-chevron-left'}));
    var $randBut = $('<button>').attr({class: 'randBut', id: 'Rand'}).text('Random')
    $infoContainer.append($prevBut).append($randBut).append($nextBut);
    changeShout();
  //when the next button is clicked, hides the current slide and shows the next one.
  $infoContainer.on('click', '#Next', function(){
    $('#' + indexCount).hide({effect: 'fade'});
    indexCount++;
    if(indexCount == (shoutOuts.length - 1)) {
      indexCount = 1;
    }
    $('#' + indexCount).delay(400).show({effect: 'fade', duration: 400});
    clearAndSetShout();
  });
  //when the prev button is clicke, hides the current slide and shows the previous one
  $infoContainer.on('click', '#Prev', function(){
    $('#' + indexCount).hide({effect: 'fade'});
    indexCount--;
    if(indexCount == 0) {
      indexCount = shoutOuts.length;
    }
    $('#' + indexCount).delay(400).show({effect: 'fade', duration: 400});
    clearAndSetShout();
  });
  //when the random button is clicked pick random index number and display it
  $infoContainer.on('click', '#Rand', function (){
    var randID = Math.floor((Math.random() * (shoutOuts.length - 1)) + 1);
    $('#' + indexCount).hide({effect: 'fade'});
    indexCount = randID;
    $('#' + indexCount).delay(400).show({effect: 'fade', duration: 400});
    clearAndSetShout();
  })
  //this pulls the form html from the server and displays it.
  $('#Add').on('click', function(){
    clearInterval(clickIntervalID);
    $shoutOutDiv.html('<p>Loading Info...</p>');
    $.ajax({
      type: 'GET',
      url: '/views/add.html'
    }).done(function(data){
       $shoutOutDiv.html(data);
    })
  });
  //add new shoutout to the document only with no push to the server
  $infoContainer.on('click', '#insertShout', function(){
    $name = $('#Name');
    $shoutAdd = $('#ShoutOut');
    if($name.val() && $shoutAdd.val()) {
      addedShouts.push({name: $name.val(), shoutout: $shoutAdd.val(), id: (shoutOuts.length + 1)});
      indexCount = shoutOuts.length + 1;
    }
    $shoutOutDiv.empty();
    DisplayAnArray(shoutOuts);
    DisplayAnArray(addedShouts);
    if($('#AddData').attr('id') != "AddData") {
      $('#Add').after('<button id="AddData" class="addData" name="AddData">Add Permanently</button>');
      $('#AddData').after('<button id="CancelAdd" name="CancelAdd">Cancel</button>');
      $('#Add').hide();
    }
    $('#' + indexCount).show({effect: 'fade', duration: 400});
    changeShout();
  });
  //push new additions to the server
  $all.on('click', '#CancelInsert', function(){
    clearInterval(clickIntervalID);
    $shoutOutDiv.empty();
    DisplayAnArray(shoutOuts);
    DisplayAnArray(addedShouts);
    changeShout();
  })
  //cancel the additional shoutout additions
  $all.on('click', '#CancelAdd', function(){
    indexCount = 1;
    $('#AddData').remove();
    $('#CancelAdd').remove();
    $('#Add').show();
    addedShouts = [];
    clearInterval(clickIntervalID);
    $shoutOutDiv.empty();
    DisplayAnArray(shoutOuts);
    changeShout();
  })
  //this sends the data to the server and returns a new array of objects to display with the updated shoutout info
  $all.on('click', '#AddData', function(){
    clearInterval(clickIntervalID);
    $shoutOutDiv.html('Updating..');
    sendShouts = {};
    addedShouts.forEach(function(obj, objI){
      sendShouts[objI] = obj;
    });
    $.ajax({
      method: 'PUT',
      url: '/shoutouts',
      data: sendShouts
    }).done(function(data){
      indexCount = 1;
      shoutOuts = data;
      $shoutOutDiv.empty();
      DisplayAnArray(data);
      $('#AddData').remove();
      $('#CancelAdd').remove();
      $('#Add').show();
      addedShouts = [];
      changeShout();
    }).fail(function(){
      console.log('Failed!');
    });
  });
  });
});
