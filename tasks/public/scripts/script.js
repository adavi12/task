console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // getTasks();

  // add task button click
  $( '#addTaskButton' ).on( 'click', function(){
    console.log( 'in addTaskButton on click' );
    // get user input and put in an object
    var name = $('#nameIn').val();
    var notes = $('#notesIn').val();


    var taskToSend = {
      name: name,
      notes: notes
    };

    $("#completed").click(function(){
         $("p").css("color", "green");
     });
     $("#deleted").click(function(){
          $("p").css("color", "red");
      });
 });//end of addTaskButton click
    saveTask(taskToSend);
    editTask();
  });

});


var saveTask = function( newTask ){
  console.log( 'in saveTask', newTask );
  $.ajax({
    url: '/addTask',
    type: 'post',
    data: newTask,
    success: function( data ){
      console.log( ': ', data );
    } // end success
  }); //end ajax
};

var editTask = function (editTask){
  $.ajax({
    url: '/editTask',
    type: 'PUT',
    success: function( data ){
      console.log( 'Show: ', data );
      $('#viewTasks').html('');
    } // end success
  }); //end ajax

};
