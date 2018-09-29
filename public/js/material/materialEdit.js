$(document).ready(function(){

  //Using JQuery to find any click of a class button called deleteButton 
  $('.deleteButton').on('click',function(){
    var id = $(this).data('id'); // as we determinate in input item, the data-id can me access via $(this).data('id');
    var url = '/material/'+id; // Creating the URL using the id
    /* Sending a message, asking to the user, if he/she is certain of deleting the item
     * as we determinate in input item, the data-id can me access via $(this).data('id');
     */
    if(confirm('Are you sure of deleting item '+$(this).data('name')+' ?')){
      $.ajax(
        {
        url: url,
        type: 'DELETE',
        sucess: function(){
          console.log('Deleting '+$(this).data('nome'));
        },
        error: function(err){
          console.log(err);
        }
      }).done(function(){
        window.location.href='/material';
      });
    }
  });

});