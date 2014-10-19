$(document).ready(function() {

    //-------------- clicking the smallest button --------------

    $("#wrapper").on('click', '.button', function(){

        var parent_index = $(this).parent().index();
        var parent_tagName = $(this).parent().get(0).tagName;

    	if(parent_tagName == "TD") {
            if(parent_index == 0) { 

                var b = $(this); 
                var offset = b.offset();

                $("#slot").toggleClass('hidden');

                $('#slot').css("top", offset.top-36);
                $('#slot').css("left", offset.left-188);

            } 
            else if(parent_index == 3) {

                var b = $(this); 
                var offset = b.offset();

                $("#civilization").toggleClass('hidden');
            
                $('#civilization').css("top", offset.top-36);
                $('#civilization').css("left", offset.left-188);
            } 

        } 
        else {
                var $ul = $(this).next().children().next().children();
                $ul.toggleClass('hidden');
        }
    	clicked_button = $(this);
    });

    //-------------- clicking options in dropdown menus --------------

    $("a").click(function() {
    		$(".dropdown").addClass("hidden");
            $(".settings_choices").addClass("hidden");

    		var $player_civilization = $(clicked_button.parent().next().children(".player_civilization"));
    		var $slot = $(clicked_button.parent().next().children(".slot"));
            var $settings_choice = $(clicked_button.next().children().children(".settings_choice"));
    		var slot_oldvalue = $slot.text();
    		var choice = $(this).text();

    		$player_civilization.text(choice);
            $settings_choice.text(choice);
            $slot.text(choice);

    		if (choice==="Computer" && slot_oldvalue != "Computer") {
    			clicked_button.parent().nextAll().eq(2).append('<div class="button"></div>');
    			clicked_button.parent().nextAll().eq(3).append('<span class="player_civilization">Random</span>');
    			clicked_button.parent().nextAll().eq(6).append('<div class="button_square"><span class="lorem player_team">-</span>');
    		} 
    		else if ( (choice === "Closed" || choice === "Open") && slot_oldvalue === "Computer") {
    			clicked_button.parent().nextAll().eq(2).empty();
    			clicked_button.parent().nextAll().eq(3).empty();
    			clicked_button.parent().nextAll().eq(6).empty();
    		};
    });

    //-------------- clicking reset button, reseting settings values --------------\\

    $("#button_reset").click(function()  {
        for (var i=1; i<11; i++) {
            var default_choice = $("#rightsection > ul > li:nth-child("+i+")").children().children().children().children().children().eq(0).text();
            var settings_item = $("#rightsection > ul > li:nth-child("+i+")").children().children().children(".settings_choice");
            settings_item.text(default_choice);
        };

        if ($(".button2").hasClass("hidden")) {
            $(".button2").removeClass("hidden");
            $(".button2_tick").addClass("hidden");
        };

        if ($("#settings2_1").children(".button2_tick").hasClass("hidden")) {
            $("#settings2_1").children(".button2_tick").removeClass("hidden");
            $("#settings2_1").children(".button2").addClass("hidden");
        };
    });

    //-------------- hiding dropdown menus when clicked elsewhere --------------

    $(document).mouseup(function (e) {
    	var $container = $(".dropdown");
        var $container2 = $(".settings_choices");

    	if (!$container.is(e.target) // if the target of the click isn't the container...
        && $container.has(e.target).length === 0) // ... nor a descendant of the container
    	{
        	$container.addClass('hidden');
    	};

        if (!$container2.is(e.target) // if the target of the click isn't the container...
        && $container2.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $container2.addClass('hidden');
        };
	});

    //------- changing player's/computer's team, color, civilization etc ---------

	$("#players_table").on('click', '.button_square', function(){


    	var $button = $(this).children('.lorem');;
    	var button_index = $(this).parent().index();
    	var color_button_index = 5;
    	var team_button_index = 7;

    	if( button_index == color_button_index ) { 
    		switch ($button.text()) {
				case "1":
					$button.text("2");
					$button.css("color", "red");
					break;
				case "2":
					$button.text("3");
					$button.css("color", "green");
					break;
				case "3":
					$button.text("4");
					$button.css("color", "yellow");
					break;
				case "4":
					$button.text("5");
					$button.css("color", "#00f0ff");
					break;
				case "5":
					$button.text("6");
					$button.css("color", "pink");
					break;
				case "6":
					$button.text("7");
					$button.css("color", "white");
					break;
				case "7":
					$button.text("8");
					$button.css("color", "orange");
					break;
				case "8":
					$button.text("1");
					$button.css("color", "blue");
					break;
				};
    	} 
    	else if( button_index  == team_button_index ) {
			switch ($button.text()) {
				case "-":
					$button.text("1");
					break;
				case "1":
					$button.text("2");
					break;
				case "2":
					$button.text("3");
					break;
				case "3":
					$button.text("4");
					break;
				case "4":
					$button.text("?");
					break;
				case "?":
					$button.text("-");
					break;
				}
    	};

    });

    //------------------------  chat management ------------------------

	$("#chat_input").keypress(function(e) {
    	var chat_nick = $(".player_name").text();

    	if (e.which == 13)  {

    		if ($(this).val().length>0) { 

    			var message = $(this).val();

                if (message < 43 && message > 0)  {
    			     $("#audio" + message).trigger('play');
                }

        		$("#chat_messages").append("<p>" + chat_nick + ": " + message + "</p>");
        		$(this).val('');
        		$("#chat_messages").animate({
        			scrollTop: $("#chat_messages")[0].scrollHeight
        			}, 0);

       		 } else {
       		 	$(this).val('');
       		 };
    	} ;
	});

        //chat scrolling, it has to be changed 
	var wrapper = $('#chat_messages');
	function startScrollingup()
	{
    	// contintually increase scroll position
    	wrapper.animate({scrollTop: '-=60'}, startScrollingup);
	}
	function startScrollingdown()
	{
   		 // contintually increase scroll position
   	 	wrapper.animate({scrollTop: '+=60'}, startScrollingdown);
	}
	function stopScrolling()
	{
    	// stop increasing scroll position
    	wrapper.stop();
	}

	$('#button_scrollup').mousedown(startScrollingup).mouseup(stopScrolling);
	$('#button_scrolldown').mousedown(startScrollingdown).mouseup(stopScrolling);

	$("#button_scrollbar").draggable(); //temporary joke

    //-------------------- player's fake ping generator -----------------------

	setInterval(function() {
    	var number = Math.floor(Math.random() * 50 + 70);
    	if (number>99) {
    		$('.player_ping').addClass('red');
    	} else {
    		$('.player_ping').removeClass('red');
    	}

    	$('.player_ping').text(number);
	}, 4000);

    //-----------------right section button clicking managment -----------------

    $(".button2").click(function() {
        $(this).toggleClass("hidden");
        $(this).next().toggleClass("hidden");
    });

    $(".button2_tick").click(function() {
        $(this).toggleClass("hidden");
        $(this).prev().toggleClass("hidden");
    });

    //----------------- enabling ready mode, freezing settings ----------------

	$("#button_ready").click(function() {
		$(".button").toggleClass('hidden2');
		$(".button_square").toggleClass('hidden2');

		$("#tick").toggleClass('hidden');
        $("#button_reset").toggleClass('hidden');

        if (!$("#tick").hasClass('hidden')) {
            $(".settings_choice").css("background", "none");
            $(".settings_choice").css("border", "1px solid black");
            $(".settings_choice").css("color", "black");
            $(".settings_choice").css("text-shadow", "none");
            $(".settings_choice").css("padding", "1px 0px 1px 4px")
        } 
        else  {

            $(".settings_choice").removeAttr('style');
        }

        for (var i=1; i < 7; i++) {
            if (!$("#settings2_" + i).children(".button2").hasClass("hidden")) {
                $("#settings2_" + i).children(".button2").addClass("hidden");
                $("#settings2_" + i).children(".button2_ready").removeClass("hidden");
            } 
            else if (!$("#settings2_" + i).children(".button2_tick").hasClass("hidden")) {
                $("#settings2_" + i).children(".button2_tick").addClass("hidden");
                $("#settings2_" + i).children(".button2_tick_ready").removeClass("hidden");
            } 
            else if (!$("#settings2_" + i).children(".button2_ready").hasClass("hidden")) {
                $("#settings2_" + i).children(".button2_ready").addClass("hidden");
                $("#settings2_" + i).children(".button2").removeClass("hidden");
            } 
            else if (!$("#settings2_" + i).children(".button2_tick_ready").hasClass("hidden")) {
                $("#settings2_" + i).children(".button2_tick_ready").addClass("hidden");
                $("#settings2_" + i).children(".button2_tick").removeClass("hidden");
            } 
        } 
	});

    //---------------------- start game button ----------------------

    $("#button_startgame").click(function() {
        if (!$("#tick").hasClass("hidden")) {
            $("#audio41").trigger('play');
        } 
        else {
            $("#chat_messages").append('<p>In order to start a game you have to be ready.</p>');

        }
    });

    //-------------------- exit button explosion --------------------

    $("#button_exit").click(function() {
        $("#wrapper").hide("explode", { pieces: 16}, 8000).fadeIn(5000);
    });

    //----- mouse over various elements producing info message ------

    $("#chat_wrapper").mouseover(function () {
        $("#info").text("This magnificent chat allows you to share your thougts with other players!");
    }).mouseout(function () {
        $("#info").text("");
    });

    $("#rightsection").mouseover(function () {
        $("#info").text("Your game settings will have crucial impact on the game.");
    }).mouseout(function () {
        $("#info").text("");
    });

});