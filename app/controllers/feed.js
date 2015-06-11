//Ti.include("/models/feed.php");
   var jsonObject = JSON.parse(resp.responseText);

  var i=0;
  while(jsonObject.response.items[i]){
  	//Обрабатываем текст новости
  	
  	var text = jsonObject.response.items[i].text;
  text = text.replace(/<br>/gi,'\n');
  	var textlabel = $.UI.create("Label", {
    text: text,
    classes: "feedlabel",
    textAlign :Titanium.UI.TEXT_ALIGNMENT_LEFT,
    width: "95%",
    color: "#000000"
});
//Обрабатываем заголовок
var img;
switch (jsonObject.response.items[i].source_id){//Определяем автора
 case -108852:  
 	img = "http://cs608025.vk.me/v608025913/5186/uE1mF2GNEd4.jpg";
	text = "Юго-Западный государственный университет";
	break;
 case -59229048:
 	img = "http://cs619819.vk.me/v619819895/1c10d/pBubtuNDXIQ.jpg";
	text = "Подслушано ЮЗГУ";
	break;
 case -165003:
 	img = "http://cs619217.vk.me/v619217041/1a03a/Fv_oNxGw7lI.jpg";
	text = "Студпрофком ЮЗГУ (16+)";
	break;
 }
  	var textheader = $.UI.create("View", {
    classes: "feedheader",
    textAlign :Titanium.UI.TEXT_ALIGNMENT_LEFT,
    width: "100%",
    height:70,
    backgroundColor: "#1E2E40"
});
var headtext = $.UI.create("Label", {
	text: text,
    classes: "feedheader",
    textAlign :Titanium.UI.TEXT_ALIGNMENT_LEFT,
    width: "100%",
    left:70,
    top:10,
    color:"#fff"
});
var headimg = $.UI.create("ImageView", {
	image: img,
    left:10,
    borderRadius:31
});
var dt = timestamp2date(jsonObject.response.items[i].date); 
var postdate = $.UI.create("Label", {
	text: dt,
    classes: "feedheader",
    textAlign :Titanium.UI.TEXT_ALIGNMENT_LEFT,
    width: "100%",
    left:70,
    top:30,
    color:"#fff"
});

var addition="";
 if (jsonObject.response.items[i].attachments){//Есть ли прикрепления??
 for (j=0;j<10;j++){
 if (jsonObject.response.items[i].attachments[j]){
 switch (jsonObject.response.items[i].attachments[j].type){
 case 'photo': //Если есть прикрепленное фото
addition = $.UI.create("ImageView", {
	image: jsonObject.response.items[i].attachments[j].photo.src_big,
	width:"95%"
    
});
	break;
 }
 }
 }
}

textheader.add(headimg);
textheader.add(headtext);
textheader.add(postdate);
//Добавление блоков по порядку
$.feed.add(textheader);
  	$.feed.add(textlabel);
  	if (addition) $.feed.add(addition);
  	i++;
  }