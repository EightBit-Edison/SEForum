Date.prototype.toLocaleFormat = function(format) {
	var f = {
		y : this.getYear() + 1900,
		m : this.getMonth() + 1,
		d : this.getDate(),
		H : this.getHours(),
		M : this.getMinutes(),
		S : this.getSeconds()
	};
	for (k in f)
	format = format.replace('%' + k, f[k] < 10 ? "0" + f[k] : f[k]);
	return format;
};

function timestamp2date(timestamp) {
	var theDate = new Date(timestamp * 1000);
	return theDate.toLocaleFormat('%d.%m.%y %H:%M');
}








//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
//обработчики кнопок меню


function lenta() {
	$.mainlayer.removeAllChildren();
	closeMenu();
	doFeed();
	$.headtext.setText("Новости");
}

function speakerButt() {
	$.mainlayer.removeAllChildren();
	closeMenu();
	doSpeakers();
	$.headtext.setText("Спикеры");
}

function partnersButt() {
	$.mainlayer.removeAllChildren();
	closeMenu();
	doPartners();
	$.headtext.setText("Партнеры");
}


function aboutButt() {
	$.mainlayer.removeAllChildren();
	closeMenu();
	doAbout();
	$.headtext.setText("О программе");
}

function programButt() {
	$.mainlayer.removeAllChildren();
	closeMenu();
	doProgram();
	$.headtext.setText("Программа");
}
function sobButt(id) {
	$.mainlayer.removeAllChildren();
	closeMenu();
	doSob(id);
	$.headtext.setText("Событие");
}
function proButt() {
	$.mainlayer.removeAllChildren();
	closeMenu();
	doProjects('');
	$.headtext.setText("Проекты");
}

function proView(id){
	$.mainlayer.removeAllChildren();
	closeMenu();
	doPro(id);
	$.headtext.setText("Проект");
}


function plo(){
	$.mainlayer.removeAllChildren();
	closeMenu();
	var addition = Titanium.UI.createWebView({
	url :"http://ittckursk.ru/sef/Place/index.html",
	width : "100%"
	});
	$.mainlayer.add(addition);
	$.headtext.setText("Площадка");
}
function fair(){
	$.mainlayer.removeAllChildren();
	closeMenu();
	var addition = Titanium.UI.createWebView({
	url :"http://ittckursk.ru/sef/fair/index.html",
	width : "100%"
	});
	$.mainlayer.add(addition);
	$.headtext.setText("Выставка");
}
function forum(){
	$.mainlayer.removeAllChildren();
	closeMenu();
	var addition = Titanium.UI.createWebView({
	url :"http://ittckursk.ru/sef/About/index.html",
	width : "100%"
	});
	$.mainlayer.add(addition);
	$.headtext.setText("О форуме");
}
function city(){
	$.mainlayer.removeAllChildren();
	closeMenu();
	var addition = Titanium.UI.createWebView({
	url :"http://ittckursk.ru/sef/City/index.html",
	width : "100%"
	});
	$.mainlayer.add(addition);
	$.headtext.setText("О регионе");
}






//------------------------------------------------------------------------------------------------------------------

	function openMenu() {
		$.menuButtView.removeEventListener('click', openMenu);
		$.menuButtView.addEventListener("click", closeMenu);
		$.mainframe.animate({
			left : "250",
			duration : 200,
			curve : Ti.UI.ANIMATION_CURVE_LINEAR
		});
		
	}


function closeMenu() {
	$.menuButtView.removeEventListener('click', closeMenu);
	$.menuButtView.addEventListener("click", openMenu);
	$.mainframe.animate({
		left : "0",
		duration : 200,
		curve : Ti.UI.ANIMATION_CURVE_LINEAR
	});
}

$.swiper.addEventListener("swipe", function(_event) {
	if (_event.direction == "right") {
		openMenu();
	} else if (_event.direction == "left") {
		closeMenu();
	}
});

$.sidebar.addEventListener("swipe", function(_event) {
	if (_event.direction == "right") {
		openMenu();
	} else if (_event.direction == "left") {
		closeMenu();
	}
}); 


//------------------------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------------------------


/*
*
*	Feed layer
*
*
*/

var feed = Titanium.Network.createHTTPClient();

function doFeed() {
	feed.open("GET", "https://api.vk.com/method/wall.get?filter=owner&owner_id=-54285081&count=10&access_token=78212a6b4c3f7c0f55eea2ba2f3545c1d154672d28f7cad6caef89eba9393520423987df477bb7cee30f9");
	feed.send();
}

feed.onload = function() {
	var jsonObject = JSON.parse(feed.responseText);
	var i = 1;
	while (jsonObject.response[i]) {
		textheader = drawHead(jsonObject.response[i].date, jsonObject.response[i].from_id);
		textlabel = drawText(jsonObject.response[i].text);
		var addition = getAddition(jsonObject.response[i].attachments);

		$.mainlayer.add(textheader);
		$.mainlayer.add(textlabel);
		if (addition)
			$.mainlayer.add(addition);
		i++;
	}
};

function drawText(text) {
	text = text.replace(/<br>/gi, '\n');
	var textlabel = $.UI.create("Label", {
		text : text,
		classes : "feedlabel",
		textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
		width : "95%",
		color : "#000000"
	});
	return textlabel;
}



function drawHead(date, image) {
	var img;
	switch (image) {//Определяем автора
	case -54285081:
		img = "https://pp.vk.me/c421721/v421721424/6b3e/cvojeION5PU.jpg";
		text = "СЭФ - 2015";
		break;
	}
	var textheader = $.UI.create("View", {
		classes : "feedheader",
		textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
		width : "100%",
		height : 70,
		backgroundColor : "#CCCCCC"
	});
	var headtext = $.UI.create("Label", {
		text : text,
		classes : "feedheader",
		textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
		width : "100%",
		left : 70,
		top : 10,
		color : "#000"
	});
	var headimg = $.UI.create("ImageView", {
		image : img,
		height:"50",
		width:"50",
		left : 10,
		borderRadius : 25
	});
	var dt = timestamp2date(date);
	var postdate = $.UI.create("Label", {
		text : dt,
		classes : "feedheader",
		textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
		width : "100%",
		left : 70,
		top : 30,
		color : "#000"
	});
	textheader.add(headimg);
	textheader.add(headtext);
	textheader.add(postdate);
	return (textheader);
}


function getAddition(att) {
	if (att) {//Есть ли прикрепления??
		for ( j = 0; j < 10; j++) {
			if (att[j]) {
				switch (att[j].type) {
				case 'photo':
					//Если есть прикрепленное фото
					var addition = $.UI.create("ImageView", {
						image : att[j].photo.src_big,
						width : "95%"

					});
					break;
				}
			}
		}
	}
	return addition;
}

/*
*
*	date layer
*
*
*/

var speakers = Titanium.Network.createHTTPClient();

function doSpeakers() {
	speakers.open("GET", "http://ittckursk.ru/sef/speakers.php");
	speakers.send();
}

speakers.onload = function() {
	var jsonObject = JSON.parse(speakers.responseText);
	var i = 0;
	while (jsonObject[i]) {
		var img = $.UI.create("ImageView", {
		image : jsonObject[i].photo,
		classes : "feedheader",
		height : 80,
		left:5,
		top: 5
	});
	var name = $.UI.create("Label", {
		text : jsonObject[i].name,
		classes : "feedheader",
		textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
		verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		width : "100%",
		left: "80",
		height: 80,
		top: "-80",
		color : "#000",
	});
	var wdt = $.mainlayer.getWidth();
	wdt-=80;
	var desc = $.UI.create("Label", {
		text : jsonObject[i].description,
		classes : "spk-desc",
		textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
		verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		width : wdt,
		top : "-60",
		left: "80",
		height: 65,
		color : "#000"
	});
		var div = $.UI.create("View", {
		classes : "feedheader",
		height : 1,
		width: "100%",
		left:0,
		backgroundColor:"#CCC"
	});
	$.mainlayer.add(img);
	$.mainlayer.add(name);
	$.mainlayer.add(desc);
	$.mainlayer.add(div);
		i++;	
	}
};









var partners = Titanium.Network.createHTTPClient();

function doPartners() {
	partners.open("GET", "http://ittckursk.ru/sef/partners.php");
	partners.send();
}

partners.onload = function() {
	var jsonObject = JSON.parse(partners.responseText);
	var i = 0;
	while (jsonObject[i]) {
		var img = $.UI.create("ImageView", {
		image : jsonObject[i].logo,
		classes : "feedheader",
		heigth : 70,
		width: Titanium.UI.SIZE,
		top: 5
	});
	var wdt = $.mainlayer.getWidth();
	wdt-=80;
	var name = $.UI.create("Label", {
		text : jsonObject[i].name,
		classes : "feedheader",
		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		width : "100%",
		height: 80,
		top: "10",
		color : "#000",
	});
	
		var div = $.UI.create("View", {
		classes : "feedheader",
		height : 1,
		width: "100%",
		left:0,
		backgroundColor:"#CCC"
	});
	$.mainlayer.add(img);
	$.mainlayer.add(name);
	
	$.mainlayer.add(div);
		i++;	
	}
};



function doAbout() {
	
	var logo = $.UI.create("ImageView", {
	image : "/img/seflogo.png",
		classes : "feedheader",
		heigth : Titanium.UI.SIZE,
		height: "100",
		top: 5
	});
	
	var label = $.UI.create("Label", {
		text : "v. 0.1.0.4 Pulsar \n",
		classes : "feedheader",
		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		width : "100%",
		top: "10",
		color : "#000",
	});
	
	
	var img1 = $.UI.create("ImageView", {
	image : "https://pp.vk.me/c623929/v623929276/2bc76/tzNEr-C4YXY.jpg",
		classes : "feedheader",
		heigth : Titanium.UI.SIZE,
		width: 70,
		top: 5
	});
	var name1 = $.UI.create("Label", {
		text : "©2015 EightBit Edison Group",
		classes : "feedheader",
		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
		width : "100%",
		top: "10",
		color : "#000",
	});
	
		var div1 = $.UI.create("View", {
		classes : "feedheader",
		height : 1,
		width: "100%",
		left:0,
		backgroundColor:"#CCC"
	});
	
	
	
	
	var img2 = $.UI.create("ImageView", {
	image : "http://ittckursk.ru/sef/logo.png",
		classes : "feedheader",
		heigth : Titanium.UI.SIZE,
		width: 70,
		top: 5
	});
	var name2 = $.UI.create("Label", {
		text : "©2015 Юго-Западный государственный университет",
		classes : "feedheader",
		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
		width : "100%",
		top: "10",
		color : "#000",
	});
	
		var div2 = $.UI.create("View", {
		classes : "feedheader",
		height : 1,
		width: "100%",
		left:0,
		backgroundColor:"#CCC"
	});
	
	var img3 = $.UI.create("ImageView", {
	image : "http://ittckursk.ru/wp-content/uploads/2014/11/logo.jpg",
		classes : "feedheader",
		heigth : Titanium.UI.SIZE,
		width: 70,
		top: 5
	});
	var name3 = $.UI.create("Label", {
		text : "©2015 Международный центр трансфера технологий ЮЗГУ",
		classes : "feedheader",
		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
		width : "100%",
		top: "10",
		color : "#000",
	});
	
		var div3 = $.UI.create("View", {
		classes : "feedheader",
		height : 1,
		width: "100%",
		left:0,
		backgroundColor:"#CCC"
	});
	$.mainlayer.add(logo);
	$.mainlayer.add(label);
	$.mainlayer.add(div2);
	$.mainlayer.add(img2);
	$.mainlayer.add(name2);
	$.mainlayer.add(div3);
	$.mainlayer.add(img3);
	$.mainlayer.add(name3);
	$.mainlayer.add(div1);
	$.mainlayer.add(img1);
	$.mainlayer.add(name1);
}




var program = Titanium.Network.createHTTPClient();

function doProgram() {
	program.open("GET", "http://ittckursk.ru/sef/program.php");
	program.send();
}

program.onload = function() {
	var jsonObject = JSON.parse(program.responseText);
	var i = 0;
			var img = $.UI.create("ImageView", {
		image : "/img/seflogo.png",
		classes : "feedheader",
		heigth : 70,
		width: Titanium.UI.SIZE,
		top: 5
	});
$.mainlayer.add(img);
	while (jsonObject[i]) {
	var day = new Date(jsonObject[i].date);
		var time1=jsonObject[i].time;
		var time2=jsonObject[i].time2;
		time1=time1.slice(0,5);
		time2=time2.slice(0,5);
	var label1 = $.UI.create("label", {
		id:i,
		text : day.toLocaleFormat("%d.%m.%y")+" "+time1+"-"+time2,
		textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
		classes : "program-desc",
		left: 5
	});
	var label = $.UI.create("label", {
		id:i,
		text : jsonObject[i].name,
		textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
		classes : "feedheader",
		left: 5
	});
	if (i%2){
	var ch = $.UI.create("View", {
		id:i,
		width:"100%",
		layout:"vertical",
		height:100
	});
	}
	else{
		var ch = $.UI.create("View", {
		id:i,
		width:"100%",
		backgroundColor:"#CCC",
		layout:"vertical",
		height:100
	});
	}
	
	ch.addEventListener('click', function(e)
{
sobButt(e.source.id);
});
	ch.add(label);
	ch.add(label1);
	$.mainlayer.add(ch);
		i++;	
	}
};



var sob = Titanium.Network.createHTTPClient();

function doSob(id) {
	id++;
	sob.open("GET", "http://ittckursk.ru/sef/sob.php?id="+id);
	sob.send();
}

sob.onload = function() {
	var jsonObject = JSON.parse(sob.responseText);
	var label = $.UI.create("label", {
		text : jsonObject[0].name,
		textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
		classes : "feedheader",
		left: 5
	});
	var day = new Date(jsonObject[0].date);
		var time1=jsonObject[0].time;
		var time2=jsonObject[0].time2;
		time1=time1.slice(0,5);
		time2=time2.slice(0,5);
	var label1 = $.UI.create("label", {
		text : day.toLocaleFormat("%d.%m.%y")+" "+time1+"-"+time2,
		textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
		classes : "program-desc",
		left: 5
	});
	var label2 = $.UI.create("label", {
		text : jsonObject[0].place,
		textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
		classes : "program-desc",
		left: 5
	});
	var label3 = $.UI.create("label", {
		text : "\n \n"+jsonObject[0].description,
		textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
		classes : "feedheader",
		left: 5
	});
	$.mainlayer.add(label);
	$.mainlayer.add(label1);
	$.mainlayer.add(label2);
	$.mainlayer.add(label3);
};







var projects = Titanium.Network.createHTTPClient();

function doProjects(id) {
	projects.open("GET", "http://ittckursk.ru/sef/projects.php?id="+id);
	projects.send();
}

projects.onload = function() {
	var jsonObject = JSON.parse(projects.responseText);
	var i = 0;
	var search = Titanium.UI.createTextField({
		returnKeyType : Titanium.UI.RETURNKEY_SEARCH,
		textAlign:Titanium.UI.TEXT_ALIGNMENT_CENTER,
		value: "Поиск проектов",
		backgroundColor:"#CCC",
		width: "100%",
		clearOnEdit: true,
		height:35,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	});
	search.addEventListener("return", function(e)
{
	$.mainlayer.removeAllChildren();
doProjects(e.source.value);
});
$.mainlayer.add(search);
	var img = $.UI.create("ImageView", {
		image : "/img/seflogo.png",
		classes : "feedheader",
		heigth : 70,
		width: Titanium.UI.SIZE,
		top: 5
	});
$.mainlayer.add(img);

	while (jsonObject[i]) {
	var label = $.UI.create("label", {
		id:i,
		text : jsonObject[i].project,
		textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
		classes : "feedheader",
		left: 5
	});
	var label1 = $.UI.create("label", {
		id:i,
		text : jsonObject[i].author,
		textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
		classes : "program-desc",
		left: 5
	});
	if (i%2){
	var ch = $.UI.create("View", {
		id:i,
		width:"100%",
		layout:"vertical",
		height:100
	});
	}
	else{
		var ch = $.UI.create("View", {
		id:i,
		width:"100%",
		backgroundColor:"#CCC",
		layout:"vertical",
		height:100
	});
	}
	
	ch.addEventListener('click', function(e)
{
proView(e.source.id);
});
	ch.add(label);
	ch.add(label1);
	$.mainlayer.add(ch);
		i++;	
	}
};




var pro = Titanium.Network.createHTTPClient();

function doPro(id) {
	id++;
	pro.open("GET", "http://ittckursk.ru/sef/pro.php?id="+id);
	pro.send();
}

pro.onload = function() {
	var jsonObject = JSON.parse(pro.responseText);
	var label = $.UI.create("label", {
		text : jsonObject[0].project,
		textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
		classes : "feedheader",
		left: 5
	});
	var label2 = $.UI.create("label", {
		text : jsonObject[0].author,
		textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
		classes : "program-desc",
		left: 5
	});
	var label3 = $.UI.create("label", {
		text : "\n \n"+jsonObject[0].description,
		textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
		classes : "feedheader",
		left: 5
	});
	if (jsonObject[0].photo){
	var addition = $.UI.create("ImageView", {
						image : jsonObject[0].photo,
						width : "95%"

					});
				}
	$.mainlayer.add(label);
	$.mainlayer.add(label2);
	$.mainlayer.add(label3);
	$.mainlayer.add(addition);
};









//запуск программы
	$.loginform.open();
	$.mainframe.show();
	lenta();
