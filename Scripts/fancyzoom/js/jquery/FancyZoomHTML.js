// FancyZoomHTML.js - v1.0
// Used to draw necessary HTML elements for FancyZoom
//
// Copyright (c) 2008 Cabel Sasser / Panic Inc
// All rights reserved.
//
// JQuery conversion by Scott Lahteine, Thinkyhead
//

function fzInsertZoomHTML() {

	var body = $("body")[0];

	// WAIT SPINNER
	$("<div/>")
	.attr("id", "fzSpin")
	.css({position:"absolute",left:"10px",top:"10px",visibility:"hidden",zIndex:525})
	.append($("<img/>")
		.attr({id:"fzSpinImage", src:fzZoomImagesURI+"zoom-spin-1.png"})
	)
	.prependTo(body);

	// ZOOM IMAGE
	$("<div/>")
	.attr("id", "fzBox")
	.css({position:"absolute",left:"10px",top:"10px",visibility:"hidden",background:"#FFF",zIndex:499})
	.append($("<img/>")
		.attr({src:fzZoomImagesURI+"spacer.gif",id:"fzImage",border:0})
		.css({display:"block",width:"10px",height:"10px",cursor:"pointer","-webkit-box-shadow":fzShadowSettings+"0.0)"})
		.bind("click",function(e){fzZoomOut(this,e);return false})
	)
	.prependTo(body);

	// CLOSE BOX
	if (fzShowCloseBox) {
		$("<div/>")
		.attr("id","fzClose")
		.css({position:"absolute",visibility:"hidden"})
		.css(browserIsIE ? {left:"-1px",top:"0px"} : {left:"-15px",top:"-15px"})
		.append($("<img/>")
			.attr({src:fzZoomImagesURI+"closebox.png",width:30,height:30,border:0})
			.css("cursor","pointer")
			.bind("click",function(e){fzZoomOut(this,e);return false})
		)
		.appendTo($("#fzBox"));
	}

	// SHADOW
	if (!browserIsIE && !$("#fzImage").css("-webkit-box-shadow")) {

		$("<div/>")
		.attr("id", "fzShadow").width(100).height(100)
		.css({position:"absolute",left:"50px",top:"50px",visibility:"hidden",zIndex:498})
		.append($("<table/>")
			.css({margin:"0",padding:"0",direction:"ltr"})
			.attr({border:0,width:"100%",height:"100%",cellpadding:0,cellspacing:0,dir:"LTR"})
			.append($("<tbody/>").css("border","0")
				.append($("<tr/>").css("border","0").height(25)
					.append($("<td/>").css({border:"0",padding:"0"}).width(27)
						.append($("<img/>")
							.attr({src:fzZoomImagesURI+"zoom-shadow1.png",width:27,height:25})
							.css("display","block")
						)
					)
					.append($("<td/>").css({border:"0",padding:"0"})
						.attr("background",fzZoomImagesURI+"zoom-shadow2.png")
						.append($("<img/>")
							.attr({src:fzZoomImagesURI+"spacer.gif",width:1,height:1})
							.css("display","block")
						)
					)
					.append($("<td/>").css({border:"0",padding:"0"}).width(27)
						.append($("<img/>")
							.attr({src:fzZoomImagesURI+"zoom-shadow3.png",width:27,height:25})
							.css("display","block")
						)
					)
				)
				.append($("<tr/>").css("border","0")
					.append($("<td/>").css({border:"0",padding:"0"})
						.attr("background",fzZoomImagesURI+"zoom-shadow4.png")
						.append($("<img/>")
							.attr({src:fzZoomImagesURI+"spacer.gif",height:1,width:1})
							.css("display","block")
						)
					)
					.append($("<td/>").css({border:"0",padding:"0"})
						.attr("bgcolor","white")
						.append($("<img/>")
							.attr({src:fzZoomImagesURI+"spacer.gif",height:1,width:1})
							.css("display","block")
						)
					)
					.append($("<td/>").css({border:"0",padding:"0"})
						.attr("background",fzZoomImagesURI+"zoom-shadow5.png")
						.append($("<img/>")
							.attr({src:fzZoomImagesURI+"spacer.gif",height:1,width:1})
							.css("display","block")
						)
					)
				)
				.append($("<tr/>").css("border","0").height(26)
					.append($("<td/>").css({border:"0",padding:"0"}).width(27)
						.append($("<img/>")
							.attr({src:fzZoomImagesURI+"zoom-shadow6.png",width:27,height:26})
							.css("display","block")
						)
					)
					.append($("<td/>").css({border:"0",padding:"0"})
						.attr("background",fzZoomImagesURI+"zoom-shadow7.png")
						.append($("<img/>")
							.attr({src:fzZoomImagesURI+"spacer.gif",height:1,width:1})
							.css("display","block")
						)
					)
					.append($("<td/>").css({border:"0",padding:"0"}).width(27)
						.append($("<img/>")
							.attr({src:fzZoomImagesURI+"zoom-shadow8.png",width:27,height:26})
							.css("display","block")
						)
					)
				)
			)
		)
		.prependTo(body);
	}

	// CAPTION
	if (fzIncludeCaption) {

		$("<div/>")
		.attr("id","fzCapDiv")
		.css({position:"absolute",visibility:"hidden",margin:"0 auto",zIndex:501})
		.append($("<table/>")
			.css({margin:"0",padding:"0",direction:"ltr"})
			.attr({border:0,cellPadding:0,cellSpacing:0,dir:"LTR"})
			.append($("<tbody/>").css("border","0")
				.append($("<tr/>").css("border","0")
					.append($("<td/>").css({border:"0",padding:"0"})
						.attr("align","right")
						.append($("<img/>")
							.attr({src:fzZoomImagesURI+"zoom-caption-l.png",width:13,height:26})
							.css("display","block")
						)
					)
					.append($("<td/>").css({border:"0",padding:"0"})
						.attr({background:fzZoomImagesURI+"zoom-caption-fill.png",id:"fzCaption",valign:"middle"})
						.css({fontSize:"14px",fontFamily:"Helvetica",fontWeight:"bold",color:"#ffffff",textShadow:"0px 2px 4px #000000",whiteSpace:"nowrap"})
					)
					.append($("<td/>").css({border:"0",padding:"0"})
						.append($("<img/>")
							.attr({src:fzZoomImagesURI+"zoom-caption-r.png",width:13,height:26})
							.css("display","block")
						)
					)
				)
			)
		)
		.prependTo(body);
	}
}
