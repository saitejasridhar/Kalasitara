
var selectedFile;

$( document ).ready(function() {
	$("#welcome").hide();
	$("#uploadButton").hide();
});


function showWelcomeContainer() {
	$("#login").hide();
	$("#welcome").show();
	$(".upload-group").show();
	$("#welcomeText").html("Hello, " + user.displayName);
};

$("#file").on("change", function(event) {
	selectedFile = event.target.files[0];
	$("#uploadButton").show();
});


function uploadFile() {
	// Create a root reference
	var filename = selectedFile.name;
	var storageRef = firebase.storage().ref('/dogImages/' + filename);
	var uploadTask = storageRef.put(selectedFile);

	// Register three observers:
	// 1. 'state_changed' observer, called any time the state changes
	// 2. Error observer, called on failure
	// 3. Completion observer, called on successful completion
	uploadTask.on('state_changed', function(snapshot){
	  // Observe state change events such as progress, pause, and resume
	  // See below for more detail
	}, function(error) {
	  // Handle unsuccessful uploads
	}, function() {
	  // Handle successful uploads on complete
	  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
	  var postKey = firebase.database().ref('Users/').push().key;
	  var downloadURL = uploadTask.snapshot.downloadURL;
	  var updates = {};
	  var postData = {
	  	image: downloadURL,
	  	desc: $("#imageCaption").val(),
	  };
	  updates['/Users/'+postKey] = postData;
	  firebase.database().ref().update(updates);


	  document.getElementById("imageCaption").value = "";
	  document.getElementById("file").value = "";
	  $('.btn').button('reset');
	 

	});


}


$('.btn').on('click', function() {
    var $this = $(this);
  $this.button('loading');
});




$('.burger, .overlay').click(function(){
  $('.burger').toggleClass('clicked');
  $('.overlay').toggleClass('show');
  $('nav').toggleClass('show');
  $('body').toggleClass('overflow');
});