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
	    for(var i = 0; i < aMessages.length; i++) {
	    	if((aMessages[i].receiver === friend && aMessages[i].author === user) || (aMessages[i].receiver === user && aMessages[i].author === friend)){
	    		$("#chat").append("<label id = 'messageAuthor'>" + aMessages[i].author + "</label>");
	    		$("#chat").append("<label id = 'messageText'>" + aMessages[i].text + "</label>");
	    	}
	    }
    }
    function sendMessage(user, text, receiver){
    	if(receiver){
	    	var instance = new message(user, text, receiver);
	    	$("#chat").append("<label id = 'messageAuthor'>" + instance.author + "</label>");
	    	$("#chat").append("<label id = 'messageText'>" + instance.text + "</label>");
	    	messageManager.addNewMessage(instance);
	    } else {
	    	alert("Pleae choose a chat");
	    }
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
	  	$('#smile').click(function(){
	  		sendMessage(userName, '<img id="smile" src="img/smiles.png">', $('.single.active').text());
	  	});
	  	$('#happy').click(function(){
	  		sendMessage(userName, '<img id="happy" src="img/smiley_happy.png">', $('.single.active').text());
	  	});
	   $('#bus').click(function(){
	  		sendMessage(userName, '<img id="bus" src="img/smiley_bus.png">', $('.single.active').text());
	  	});
	  	$('#blink').click(function(){
	  		sendMessage(userName, '<img id="blink" src="img/smiley_blink.png">', $('.single.active').text());
	  	});
	  	$('#crying').click(function(){
	  		sendMessage(userName, '<img id="crying" src="img/smiley_crying.png">', $('.single.active').text());
	  	});
	  	$('#disappointed').click(function(){
	  		sendMessage(userName, '<img id="disappointed" src="img/smiley_disappointed.png">', $('.single.active').text());
	  	});
	  	$('#laugh').click(function(){
	  		sendMessage(userName, '<img id="laugh" src="img/smiley_laugh.png">', $('.single.active').text());
	  	});
	  	$('#broken-heart').click(function(){
	  		sendMessage(userName, '<img id="broken-heart" src="img/broken-heart.png">', $('.single.active').text());
	  	});
	    $('#sleeping').click(function(){
	  		sendMessage(userName, '<img id="sleeping" src="img/smiley_sleeping.png">', $('.single.active').text());
	  	});
	  	$('#cap').click(function(){
	  		sendMessage(userName, '<img id="cap" src="img/smiley_cap.png">', $('.single.active').text());
	  	});
	  	$('#thumsup').click(function(){
	  		sendMessage(userName, '<img id="thumsup" src="img/smiley_thumsup.png">', $('.single.active').text());
	  	});
	  	$('#clown').click(function(){
	  		sendMessage(userName, '<img id="clown" src="img/smiley_clown.png">', $('.single.active').text());
	  	});
	  	$('#bored').click(function(){
	  		sendMessage(userName, '<img id="bored" src="img/smiley_bored.png">', $('.single.active').text());
	  	});
	  	$('#pleasure').click(function(){
	  		sendMessage(userName, '<img id="pleasure" src="img/smiley_pleasure.png">', $('.single.active').text());
	  	});
	  	$('#humor').click(function(){
	  		sendMessage(userName, '<img id="humor" src="img/smiley_humor.png">', $('.single.active').text());
	  	});
	  	$('#sun').click(function(){
	  		sendMessage(userName, '<img id="sun" src="img/smiley_sun.png">', $('.single.active').text());
	  	});  
	});
