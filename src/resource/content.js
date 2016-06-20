function parseContent (data) {
	 return data.replace(/\<br\/?\>/g,"</p><p>").replace(/\&nbsp;/g,"").replace(/<(\w+)><\/(\w+)>/g,"");
}

function parseImg (imgs) {
	 var _s = "";
	 for (var i = imgs.length - 1; i >= 0; i--) {
	   	_s += imgs[i] ? `<img src="${imgs[i]}">` : "";
	 }
	 return _s;  
}

export default {
	url: (tp,newsid) => `http://api.dagoogle.cn/news/single-news?callback=?&tableNum=${tp}&news_id=${newsid}`,
	parse:function (data) {
		 var d = data.data;
		 return {
		 	title: d["title"],
		 	time: d["edit_time"],
		 	origin: d["source"],
		 	image: [d["top_image"]],
		 	content: parseContent(d["content"]) || parseImg([d["text_image1"],d["text_image0"],d["top_image"]])+'<p>'+d["digest"]+'...</p>'
		 } 
	}
}