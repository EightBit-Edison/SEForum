var feed = Titanium.Network.createHTTPClient();
feed.onload = function() {
	makeItSo(this);
};
 
feed.open("GET","https://api.vk.com/method/newsfeed.get?filters=post&source_ids=-59229048,-108852,-165003&count=20&access_token=78212a6b4c3f7c0f55eea2ba2f3545c1d154672d28f7cad6caef89eba9393520423987df477bb7cee30f9");
feed.send();