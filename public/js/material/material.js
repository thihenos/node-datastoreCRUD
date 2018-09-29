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
          console.log('Deleting '+$(this).data('name'));
        },
        error: function(err){
          console.log(err);
        }
      }).done(function(){
        document.getElementById('divMaterial'+id).remove();
      });
    }
  });

  //Using JQuery to find any click of a class button called showButton
  $('button.showButton').click(function(){
    var id = $(this).data('id'); // as we determinate in input item, the data-id can me access via $(this).data('id');
    var url = '/material/'+id; // Creating the URL using the id
    if(confirm('Do want to see item '+$(this).data('name')+' ?')){
      $.ajax({
        url: url,
        type: 'GET',
        sucess: function(result){
          console.log('Select no cadastro');
        },
        error: function(err){
          console.log(err);
        }
      }).done(function(){
        window.location.href=url;
      });
    }
  });

});