	var cnt = 0;
	var messages = [];

	/*--------------------------Memory management------------------------------*/
	var memory = {
	  get: function(key){
	    return JSON.parse(localStorage.getItem(key));
	  },

	  set: function(key, val){
	    var tmp = JSON.stringify(val);
	    localStorage.setItem(key, tmp);
	  },

	  remove: function(key){
	    localStorage.removeItem(key);
	  },

	  clear: function(){
	    localStorage.clear();
	  }
	};

	/*--------------------------Users management------------------------------*/
	var userManager = {
	  addNewUser: function(user){
	    users = userManager.getUsersList();
	    users.push(user);
	    userManager.setUsersList(users);
	  },

	  setUsersList: function(list){
	    memory.set('users', list);
	  },

	  getUsersList: function(){
	    return memory.get('users') || [];
	  }
	};

	function addContact(name) {
		$("#chatslist").append("<label class = 'contact'><a onClick = 'labelClicked(this)' class = 'single'>" + name + "</a></label>")
	};

	function labelClicked(a){
		items = document.querySelectorAll('.single.active');

	    if(items.length) 
	    {
	        items[0].className = 'single';
	    }

    	a.className = 'single active';
    	loadChat($('#userName').text(), $('.single.active').text());
	};

	/*-----------------------Messages management------------------------------*/
	var message = function(author, text, receiver){
		this.author = author;
		this.text = text;
		this.receiver = receiver;
	}
	var messageManager = {
	  addNewMessage: function(message){
	    messages = messageManager.getMessagesList();
	    messages.push(message);
	    messageManager.setMessagesList(messages);
	  },

	  setMessagesList: function(list){
	    memory.set('messages', list);
	  },

	  getMessagesList: function(){
	    return memory.get('messages') || [];
	  }
	};

    /*--------------------------Chat management------------------------------*/
    function loadChat(user, friend){
    	$('label').remove('#messageAuthor');
    	$('label').remove('#messageText');
    	var aMessages = messageManager.getMessagesList();
    	console.log(aMessages);
	    for(var i = 0; i < aMessages.length; i++) {
	    	if((aMessages[i].receiver === friend && aMessages[i].author === user) || (aMessages[i].receiver === user && aMessages[i].author === friend)){
	    		$("#chat").append("<label id = 'messageAuthor'>" + aMessages[i].author + "</label>");
	    		$("#chat").append("<label id = 'messageText'>" + aMessages[i].text + "</label>");
	    	}
	    }
    }
    function sendMessage(user, text, receiver){
    	var instance = new message(user, text, receiver);
    	$("#chat").append("<label id = 'messageAuthor'>" + instance.author + "</label>");
    	$("#chat").append("<label id = 'messageText'>" + instance.text + "</label>");
    	messageManager.addNewMessage(instance);
    }

    /*------------------------------------------------------------------------*/
	$(document).ready(function(){
		var userName = prompt('What is your name?', 'name');
		var name = document.getElementById('userName');
		name.innerHTML = userName;
	  	userManager.addNewUser(userName);

	  	$('#plus').click(function(){
	  		var list = userManager.getUsersList();
	  		for (var i = cnt; i < list.length; i++) {
	  			if (list[i] !== userName) {
	  				addContact(list[i]);
	  			}
	  			cnt++;
	  		}	
	  	}); 
	  	$('#sendMessage').click(function(){
	  		sendMessage(userName, $('#messageInput').val(), $('.single.active').text());
	  		$('#messageInput').val('');
	  	});
	  	$('#trash').click(function(){
	  		if(confirm("Are you sure you want to delete everything from the localStorage?")) {
	  			memory.clear();
	  			location.reload();
	  		}
	  	});  
	});
