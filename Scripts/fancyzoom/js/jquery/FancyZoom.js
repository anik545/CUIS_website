// FancyZoom.js - v1.1 - http://www.fancyzoom.com
//
// Copyright (c) 2008 Cabel Sasser / Panic Inc
// All rights reserved.
//
//     Requires: FancyZoomHTML.js
// Instructions: Include JS files in page, call fzSetupZoom() in onLoad. That's it!
//               Any <a href> links to images will be updated to zoom inline.
//               Add rel="nozoom" to your <a href> to disable zooming for an image.
//
// Redistribution and use of this effect in source form, with or without modification,
// are permitted provided that the following conditions are met:
//
// * USE OF SOURCE ON COMMERCIAL (FOR-PROFIT) WEBSITE REQUIRES ONE-TIME LICENSE FEE PER DOMAIN.
//   Reasonably priced! Visit www.fancyzoom.com for licensing instructions. Thanks!
//
// * Non-commercial (personal) website use is permitted without license/payment!
//
// * Redistribution of source code must retain the above copyright notice,
//   this list of conditions and the following disclaimer.
//
// * Redistribution of source code and derived works cannot be sold without specific
//   written prior permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
// LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

//
// Drupal / JQuery version by Scott Lahteine www.thinkyhead.com
// Initialization moved to FancyZoomSettings.php.js
//

// Init. Do not add anything below this line, unless it's something awesome.

var browserIsIE = $.browser.msie && $.browser.version < 8.0,
	fzWidth = 0, fzHeight = 0, fzScroll = 0, fzScrollWidth = 0, fzScrollHeight = 0,
	fzOpen = false, fzSpinFrame = 1, fzPreloading = false, fzImgPreload = $("<img/>"),
	fzAnimTimer = 0,
	fzFade = [],
	fzZooming = [], fzZoomTimer = [],
	fzOrigW = [], fzOrigH = [], fzOrigX = [], fzOrigY = [],
	fzBoxID		= "#fzBox",
	fzShadowID	= "#fzShadow",
	fzImgID		= "#fzImage",
	fzCloseID	= "#fzClose",
	fzCaption	= "#fzCaption",
	fzCaptionDiv = "#fzCapDiv";

$(function(){ fzSetupZoom() });

// fzSetupZoom: Setup The Page! Called when the document is ready.

function fzSetupZoom() {
	fzPrepZooms();
	fzInsertZoomHTML();
	zoomdiv = $(fzBoxID);
	zoomimg = $(fzImgID);
}

// Zoom: Inject Javascript functions into hrefs pointing to images, one by one!
// Skip any href that contains a rel="nozoom" tag.
// This is done at page load time via an onLoad() handler.

function fzPrepZooms() {
	$("a[@href]:not(.thickbox)")
	.filter(
		function(i) {
			var h = $(this).attr("href");
      return (h && h.search(/(.*)\.(jpg|jpeg|gif|png|bmp|tif|tiff)/gi) !== -1
        && !/(light|thick)box|nozoom/.test($(this).attr('rel')));
		}
	)
	.click(function(e) { return fzZoomClick(this,e); })
	.bind("mouseover", function(e) { fzZoomPreload(this); });
}

// Zoom: Load an image into an image object. When done loading, function sets fzPreloading to false,
// so other bits know that they can proceed with the zoom.
// Preloaded image is stored in fzImgPreload and swapped out in the zoom function.

function fzZoomPreload(from) {

	var href = $(from).attr("href"),
      isrc = fzImgPreload.attr("src");

	// Only preload if we have to, i.e. the image isn't this image already
	if (!isrc || isrc.indexOf(href.substr(href.lastIndexOf("/"))) === -1) {
		fzPreloading = true;

		// Set a function to fire when the preload is complete, setting flags along the way.		
		fzImgPreload = $("<img/>")
			.load(function() { fzPreloading = false; })
			.attr("src", href);
	}
}

// Zoom: Start the preloading animation cycle.

function fzPreloadAnimStart() {
	$("#fzSpin").css({
		left: (fzWidth / 2) + "px",
		top: ((fzHeight / 2) + fzScroll) + "px",
		visibility: "visible"
	});
	fzSpinFrame = 1;
	$("#fzSpinImage").attr("src", fzZoomImagesURI+"zoom-spin-"+fzSpinFrame+".png");
	fzAnimTimer = setInterval("fzPreloadAnim()", 100);
}

// Zoom: Display and ANIMATE the jibber-jabber widget. Once fzPreloading is false, bail and zoom it up!

function fzPreloadAnim(from) {
	if (fzPreloading) {
		$("#fzSpinImage").attr("src", fzZoomImagesURI+"zoom-spin-"+fzSpinFrame+".png");
		fzSpinFrame = (fzSpinFrame % 12) + 1;
	} else {
		$("#fzSpin").css("visibility", "hidden");
		clearInterval(fzAnimTimer);
		fzAnimTimer = 0;
		fzZoomIn(preloadFrom);
	}
}

// ZOOM CLICK: We got a click! Should we do the zoom? Or wait for the preload to complete?
// todo?: Double check that fzImgPreload src = clicked src

function fzZoomClick(from, evt) {

	var shift = evt.shiftKey;

	// Check for Command / Alt key. If pressed, pass them through -- don't zoom!
	if (!evt && window.event && (window.event.metaKey || window.event.altKey)) {
		return true;
	} else if (evt && (evt.metaKey || evt.altKey)) {
		return true;
	}

	// Get Window Size

	fzWidth = $(window).width();
	fzHeight = $(window).height();
	fzScroll = $(window).scrollTop();

	// Get Document size

	fzScrollWidth = $(document).width();
	fzScrollHeight = $(document).height();

	// If preloading still, wait, and display the spinner.
	if (fzPreloading) {
		// But only display the spinner if it's not already being displayed!
		if (fzAnimTimer === 0) {
			preloadFrom = from;
			fzPreloadAnimStart();
		}
	} else {
		// Otherwise, we're loaded: do the zoom!
		fzZoomIn(from, shift);
	}

	return false;

}

// Zoom: Move an element in to endH endW, using zoomHost as a starting point.
// "from" is an object reference to the href that spawned the zoom.

function fzZoomIn(from, shift) {

	zoomimg.attr("src", $(from).attr("href"));

	// Determine the zoom settings from where we came from, the element in the <a>.
	// If there's no element in the <a>, or we can't get the width, make stuff up

  var startW, startH, offs,
	    kid = $(from).find("img")[0];

	if (kid && kid.width) {
		startW = kid.width;
		startH = kid.height;
		offs = $(kid).offset();
	} else if ($(from).width()) {
		startW = $(from).width();
		startH = $(from).height();
		offs = $(from).offset();
	} else {
		startW = 50;
		startH = 12;
		offs = $(from).offset();
	}

	var hostX = offs.left,
	    hostY = offs.top;

	// Make up for a scrolled containing div.

	if ($("#scroller").length) {
		hostX -= $("#scroller")[0].scrollLeft;
	}

	// Determine the target zoom settings from the preloaded image object

	var pre = $(fzImgPreload)[0],
	    endW = pre.width,
	    endH = pre.height;

	// Start! But only if we're not zooming already!

	if (fzZooming[fzImgID] !== true) {

		// Hide shadow and close box
		fzHideZoomExtras();

		// Setup the CAPTION, if existing. Hide it first, set the text.

		if (fzIncludeCaption) {
			$(fzCaptionDiv).css("visibility", "hidden");
			if ($(from).attr("title")) {
				// Yes, there's a caption, set it up
				$(fzCaption).html($(from).attr("title"));
			} else {
				$(fzCaption).html("");
			}
		}

		// Store original position in an array for future fzZoomOut.

		fzOrigW[fzImgID] = startW;
		fzOrigH[fzImgID] = startH;
		fzOrigX[fzImgID] = hostX;
		fzOrigY[fzImgID] = hostY;

		// Now set the starting dimensions

		zoomimg.width(startW).height(startH);
		zoomdiv.css({left:hostX+"px", top:hostY+"px"});

		// Show the zooming image container, make it invisible

		if (fzIncludeFade === 1) {
			fzSetOpacity(0, fzBoxID);
		}
		zoomdiv.css("visibility", "visible");

		// If it's too big to fit in the window, shrink the width and height to fit (with ratio).

		var sizeRatio = endW / endH;
		if (endW > fzWidth - fzMinBorder) {
			endW = fzWidth - fzMinBorder;
			endH = endW / sizeRatio;
		}
		if (endH > fzHeight - fzMinBorder) {
			endH = fzHeight - fzMinBorder;
			endW = endH * sizeRatio;
		}

		var zoomChangeX = (((fzWidth - endW) / 2) - hostX),
		    zoomChangeY = (((fzHeight - endH) / 2) - hostY) + fzScroll,
		    zoomChangeW = (endW - startW),
		    zoomChangeH = (endH - startH),
        tempSteps = fzZoomSteps * (shift ? 7 : 1),  // Shift key?
        zoomCurrent = 0,                            // Setup Zoom
        fadeCurrent = 0,                            // Setup Fade, If Requested
		    fadeAmount = fzIncludeFade ? -100 / tempSteps : 0;

		// The JQuery way to do this:
//		$(fzBoxID).animate({left:parseInt(hostX+zoomChangeX,10)+"px", top:parseInt(hostY+zoomChangeY,10)+"px"});
//		$(fzImgID).animate({width: endW+"px", height: endH+"px"}, "normal", "", function(){fzZoomDoneIn(fzBoxID)});

		// Do It!

		fzZoomTimer[fzImgID] = setInterval("fzZoomElement('"+fzBoxID+"', '"+fzImgID+"', "+zoomCurrent+", "+startW+", "+zoomChangeW+", "+startH+", "+zoomChangeH+", "+hostX+", "+zoomChangeX+", "+hostY+", "+zoomChangeY+", "+tempSteps+", "+fzIncludeFade+", "+fadeAmount+", 'fzZoomDoneIn(fzBoxID)')", fzZoomTime);
		fzZooming[fzImgID] = true;
	}
}

function fzHideZoomExtras() {
	if ($(fzShadowID).length) {
		$(fzShadowID).css("visibility", "hidden");
	} else if (!browserIsIE) {

		// Wipe timer if shadow is fading in still
		if (fzFade[fzImgID] && fzFade[fzImgID].active) {
			clearInterval(fzFade[fzImgID].timer);
			fzFade[fzImgID].active = false;
			fzFade[fzImgID].timer = false;
		}

		$(fzImgID).css("-webkit-box-shadow", fzShadowSettings + "0.0)");
	}

	if (fzShowCloseBox) {
		$(fzCloseID).css("visibility", "hidden");
	}

	if (fzIncludeCaption) {
		$(fzCaptionDiv).css("visibility", "hidden");
	}
}

// Zoom it back out.

function fzZoomOut(from, evt) {

	// Get shift key status.
	// IE events don't seem to get passed through the function, so grab it from the window.

	var tempSteps = fzZoomSteps * (evt.shiftKey ? 7 : 1);

	// Check to see if something is happening/open

	if (fzZooming[fzImgID] !== true) {

		// First, get rid of the shadow, close box, and caption
		fzHideZoomExtras();

/*		if (fzIncludeCaption && $(fzCaption).html() !== "") {
			fzFadeElementSetup(fzCaptionDiv, 100, 0, 5, 1);
		}
*/
		// Now, figure out where we came from, to get back there

		var startX = parseInt(zoomdiv.css("left"), 10),
		    startY = parseInt(zoomdiv.css("top"), 10),
		    startW = zoomimg.width(),
		    startH = zoomimg.height(),
		    zoomChangeX = fzOrigX[fzImgID] - startX,
		    zoomChangeY = fzOrigY[fzImgID] - startY,
		    zoomChangeW = fzOrigW[fzImgID] - startW,
		    zoomChangeH = fzOrigH[fzImgID] - startH,
		    zoomCurrent = 0,		// Setup Zoom
    		fadeCurrent = 0,    // Setup Fade, If Requested
    		fadeAmount = (fzIncludeFade === 1) ? (100 / tempSteps) : 0;

		// Do It!
		fzZoomTimer[fzImgID] = setInterval("fzZoomElement('"+fzBoxID+"', '"+fzImgID+"', "+zoomCurrent+", "+startW+", "+zoomChangeW+", "+startH+", "+zoomChangeH+", "+startX+", "+zoomChangeX+", "+startY+", "+zoomChangeY+", "+tempSteps+", "+fzIncludeFade+", "+fadeAmount+", 'fzZoomDone(fzBoxID, fzImgID)')", fzZoomTime);
		fzZooming[fzImgID] = true;
	}
}

// Finished Zooming In

function fzZoomDoneIn(zoomID, theID) {

	// Note that it's open

	fzOpen = true;
	zoomdiv = $(zoomID);

	// Position the table shadow behind the zoomed in image, and display it

	var shbox = $(fzShadowID);
	if (shbox.length) {

		fzSetOpacity(0, fzShadowID);

		var shadowLeft = parseInt(zoomdiv.css("left"), 10) - 13,
		    shadowTop = parseInt(zoomdiv.css("top"), 10) - 8,
		    shadowWidth = zoomdiv[0].offsetWidth + 26,
		    shadowHeight = zoomdiv[0].offsetHeight + 26;

		shbox.width(shadowWidth).height(shadowHeight).css({left:shadowLeft+"px", top:shadowTop+"px", visibility:"visible"});
		fzFadeElementSetup(fzShadowID, 0, 100, 5);

	} else if (!browserIsIE) {
		// Or, do a fade of the modern shadow
		fzFadeElementSetup(fzImgID, 0, .8, 5, 0, "shadow");
	}

	// Position and display the CAPTION, if existing

	if (fzIncludeCaption && $(fzCaption).html() !== "") {
		var zoomcapd = $(fzCaptionDiv);
//		if (!browserIsIE) fzSetOpacity(0, fzCaptionDiv);
		zoomcapd.css({
			top: parseInt(zoomdiv.css("top"), 10) + (zoomdiv[0].offsetHeight + 15) + "px",
			left: (fzWidth / 2) - (zoomcapd[0].offsetWidth / 2) + "px",
			visibility: "visible"
		});
//		if (!browserIsIE) fzFadeElementSetup(fzCaptionDiv, 0, 100, 5);
	}

	// Display Close Box (fade it if it's not IE)
	if (fzShowCloseBox) {
		if (browserIsIE) {
			$(fzCloseID).css("visibility", "visible");
		} else {
			fzSetOpacity(0, fzCloseID);
			$(fzCloseID).css("visibility", "visible");	// .fadeTo(500, 1);
			fzFadeElementSetup(fzCloseID, 0, 100, 5);
		}
	}

	// Get keypresses
	$(document).keypress(function(e){ if (e.keyCode === 27) {fzZoomOut(this,e);} });
}

// Finished Zooming Out

function fzZoomDone(zoomID, theID) {

	// No longer open

	fzOpen = false;

	// Clear stuff out, clean up

	fzOrigH[theID] = fzOrigW[theID] = "";
	$(zoomID).css("visibility", "hidden");
	fzZooming[theID] === false;

	// Stop getting keypresses

	$(document).unbind("keypress");

}

// Actually zoom the element

function fzZoomElement(zoomID, theID, zoomCurrent, zoomStartW, zoomChangeW, zoomStartH, zoomChangeH, zoomStartX, zoomChangeX, zoomStartY, zoomChangeY, zoomSteps, includeFade, fadeAmount, execWhenDone) {

	// console.log("Zooming Step #"+zoomCurrent+ " of "+zoomSteps+" (zoom " + zoomStartW + "/" + zoomChangeW + ") (zoom " + zoomStartH + "/" + zoomChangeH + ")  (zoom " + zoomStartX + "/" + zoomChangeX + ")  (zoom " + zoomStartY + "/" + zoomChangeY + ") Fade: "+fadeAmount);

	// Test if we're done, or if we continue

	if (zoomCurrent === (zoomSteps + 1)) {
		fzZooming[theID] = false;
		clearInterval(fzZoomTimer[theID]);

		if (execWhenDone !== "") {
			eval(execWhenDone);
		}
	} else {

		// Do the Fade!

		if (includeFade === 1) {
			var fade = zoomCurrent * fadeAmount;
			fzSetOpacity((fadeAmount < 0) ? Math.abs(fade) : 100 - fade, zoomID);
		}

		// Calculate this step's difference, and move it!

		var moveW = fzCubicInOut(zoomCurrent, zoomStartW, zoomChangeW, zoomSteps),
		    moveH = fzCubicInOut(zoomCurrent, zoomStartH, zoomChangeH, zoomSteps),
		    moveX = fzCubicInOut(zoomCurrent, zoomStartX, zoomChangeX, zoomSteps),
		    moveY = fzCubicInOut(zoomCurrent, zoomStartY, zoomChangeY, zoomSteps);

		$(zoomID).css({left:Math.floor(moveX)+"px",top:Math.floor(moveY)+"px"});
		zoomimg.width(Math.floor(moveW)).height(Math.floor(moveH));

		clearInterval(fzZoomTimer[theID]);
		fzZoomTimer[theID] = setInterval("fzZoomElement('"+zoomID+"', '"+theID+"', "+(zoomCurrent+1)+", "+zoomStartW+", "+zoomChangeW+", "+zoomStartH+", "+zoomChangeH+", "+zoomStartX+", "+zoomChangeX+", "+zoomStartY+", "+zoomChangeY+", "+zoomSteps+", "+includeFade+", "+fadeAmount+", '"+execWhenDone+"')", fzZoomTime);
	}
}

// Fade: Initialize the fade function

function fzFadeElementSetup(theID, fdStart, fdEnd, fdSteps, fdClose, fdMode) {

	// alert("Fading: "+theID+" Steps: "+fdSteps+" Mode: "+fdMode);

	if (fzFade[theID] && fzFade[theID].active === true) {
		// Already animating, queue up this command
		fzFade[theID].queue = [theID, fdStart, fdEnd, fdSteps];
	} else {
		fzFade[theID] = new Object();
		fzFade[theID].timer = setInterval("fzFadeElement('"+theID+"', 0, '"+((fdStart - fdEnd) / fdSteps)+"', '"+fdSteps+"')", 15);
		fzFade[theID].active = true;
		fzFade[theID].mode = fdMode;
		fzFade[theID].close = (fdClose === 1);
	}
}

// Fade: Do the fade. This function will call itself, modifying the parameters, so
// many instances can run concurrently. Can fade using opacity, or fade using a box-shadow.

function fzFadeElement(theID, fadeCurrent, fadeAmount, fadeSteps) {

	if (fadeCurrent === fadeSteps) {

		// We're done, so clear.

		clearInterval(fzFade[theID].timer);
		fzFade[theID].active = false;
		fzFade[theID].timer = false;

		// Should we close it once the fade is complete?

		if (fzFade[theID].close === true) {
			$(theID).css("visibility","hidden");
		}

		// Hang on.. did a command queue while we were working? If so, make it happen now

		if (fzFade[theID].queue && fzFade[theID].queue !== false) {
			fzFadeElementSetup(fzFade[theID].queue[0], fzFade[theID].queue[1], fzFade[theID].queue[2], fzFade[theID].queue[3]);
			fzFade[theID].queue = false;
		}
	} else {

		fadeCurrent++;

		var fade = fadeCurrent * fadeAmount;

		fade = (fadeAmount < 0) ? Math.abs(fade) : 100 - fade;

		// Now actually do the fade adjustment.
		if (fzFade[theID].mode === "shadow") {
			// Do a special fade on the webkit-box-shadow of the object
			$(theID).css("-webkit-box-shadow", fzShadowSettings + fade + ")");
		} else {
			// Set the opacity depending on if we're adding or subtracting (pos or neg)
			fzSetOpacity(fade, theID);
		}

		// Keep going, and send myself the updated variables
		clearInterval(fzFade[theID].timer);
		fzFade[theID].timer = setInterval("fzFadeElement('"+theID+"', '"+fadeCurrent+"', '"+fadeAmount+"', '"+fadeSteps+"')", 15);
	}
}

////////////////////////////
//
// UTILITY functions
//

// Utility: Set the opacity, compatible with a number of browsers. Value from 0 to 100.

function fzSetOpacity(opacity, theID) {

	// If it's 100, set it to 99 for Firefox (SRL: Mozilla?).

	if ($.browser.mozilla && opacity === 100) {
		opacity = 99.9999; // This is majorly awkward
	}

	// Multi-browser opacity setting:
	//						IE/Win						Safari 1.2, Firefox+Mozilla
	$(theID).css({filter:"alpha(opacity="+opacity+")", opacity:(opacity/100)});
}

// Utility: Math functions for animation calucations - From http://www.robertpenner.com/easing/
//
// t = time, b = begin, c = change, d = duration
// time = current frame, begin is fixed, change is basically finish - begin, duration is fixed (frames),

function fzCubicInOut(t, b, c, d) {
	return ((t/=d/2) < 1) ? c/2*t*t*t + b : c/2*((t-=2)*t*t + 2) + b;
}
