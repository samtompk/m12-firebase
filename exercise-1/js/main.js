// Main.js
$(function() {
    // Setup: Initialize Firebase using the configuration of your project
	var config = {
	    apiKey: "AIzaSyBtMENY05-b5mMb9pEAoDw14d5XX2-8YmQ",
	    authDomain: "to-do-list-info-343.firebaseapp.com",
	    databaseURL: "https://to-do-list-info-343.firebaseio.com",
	    storageBucket: "to-do-list-info-343.appspot.com",
	    messagingSenderId: "322807336944"
  	};
  	firebase.initializeApp(config);
    // Creating Data: Create new database reference 'todos'
    var todos = firebase.database().ref('todos');

    // Reading Data:
    // Set listener: on change, empty the todo list, and iterate through to make a new list
    todos.on('value', function(snapshot) {
    	$('#todo-list').empty();
    	var data = snapshot.val();
       	Object.keys(data).forEach(function(d) {
       		renderTodo(d, data[d]);
    	});
    	console.log(data);
    });



    // Rendering Data: Function to make todos
    var renderTodo = function(id, content) {

        // Create new todo <div> with classes 'todo', and the priority of the item
        var div = $('<div class="todo">');
        div.addClass(content.priority);

        // Create an <h5> element, set it's text to the description, and class as the status
        var h5 = $('<h5>');
        h5.addClass(content.status);
        h5.text(content.description);
        div.append(h5);

        // Update Data: create a check icon with click event
        var checkbox = $('<i>').addClass('fa fa-check fa-2x ' + content.status);
        div.append(checkbox);
        checkbox.on('click', function() {
        	var status = content.status == 'complete' ? 'incomplete' : 'complete';
        	var childRef = todos.child(id);
        	childRef.set({
        		description: content.description,
        		priority: content.priority,
        		status: status
        	});
        });
            // Flip the status on click
            // Set the child values of the item

        // Deleting data: Delete icon: on click, remove the reference
        var delet = $('<i>').addClass('fa fa-times fa-2x');
        delet.on('click', function(d) {
        	todos.child(id).remove();
        });
        // Update/Delete data: append the icons to the newTodo item
        div.append(delet);

        // Append newTodo item to item with id #todo-list
        $('#todo-list').append(div);
    };

    // Reading Data: Form submission
    $('form').on('submit', function(event) {
        event.preventDefault();

        // Get values
        var priority = $(this).find('input:checked')[0].id;
        var text = $(this).find('input').val();

        // Reading Data: Push new item into `todos` reference
        todos.push({
        	description: text,
        	priority: priority,
        	status: 'incomplete'
        });

        // Reset the form
        this.reset();
    });
});
