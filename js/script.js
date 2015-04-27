// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
    }
  });

  function dragMoveListener (event) {
	
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
	
	$('.resize-drag').each(function( index ) {
	  //alert($( this ).css("background-position"));
	  
	  var posText = $( this ).css("background-position");
	  posText = posText.split(" ").join("");
	  posText = posText.split("px");
	  
	  var nexBackgroundX = -parseInt($( this ).attr('data-x'));
	  var nexBackgroundY = -parseInt($( this ).attr('data-y'));
	  
	  $( this ).css("background-position",nexBackgroundX+"px "+nexBackgroundY+"px");
	});
  }

  // this is used later in the resizing demo
window.dragMoveListener = dragMoveListener;

interact('.resize-drag')
  .draggable({
    onmove: window.dragMoveListener
  })
  .resizable({
    edges: { left: false, right: true, bottom: true, top: false }
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;
	
	//alert(target.getAttribute('id'));
	
	var below = false;
	var newYPos = 0;
	
	minHeight = 2*parseInt($("#"+target.getAttribute('id')).css("border-width").split("px")[0]);
	
	
	$('.resize-drag').each(function( index ) {
	  //alert($( this ).css("background-position"));
	  if (below &&  $("#"+target.getAttribute('id')).outerHeight()>10) {
	  
	    var offset = $( this ).offset();
		
		var shiftVal = Math.min($("#"+target.getAttribute('id')).outerHeight()-minHeight,(-1)*event.deltaRect.height);
		
		console.log($("#"+target.getAttribute('id')).outerHeight()-minHeight+" or "+(-1)*event.deltaRect.height);
		newYPos = offset.top - event.deltaRect.height;
		//console.log(event.deltaRect.height);
		$( this ).offset({ top: newYPos, left: offset.left });
		//alert($( this ).offset().top);
	  }
	  
	  
	  if ($( this ).attr('id')==target.getAttribute('id')) {
		below = true;
	  }
	});

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    //target.textContent = event.rect.width + '×' + event.rect.height;
  });
  
function createCanvases() {
  //Do stuff to make canvases
	var canvasHead = document.createElement('canvas');
	canvasHead.id     = "headLayer";
	canvasHead.width  = $("#head").outerWidth();
	canvasHead.height = $("#head").outerHeight();
	
	var canvasBody = document.createElement('canvas');
	canvasBody.id     = "bodyLayer";
	canvasBody.width  = $("#body").outerWidth();
	canvasBody.height = $("#body").outerHeight();
	
	var canvasPants = document.createElement('canvas');
	canvasPants.id     = "pantsLayer";
	canvasPants.width  = $("#pants").outerWidth();
	canvasPants.height = $("#pants").outerHeight();
	
	var canvasShoes = document.createElement('canvas');
	canvasShoes.id     = "shoesLayer";
	canvasShoes.width  = $("#shoes").outerWidth();
	canvasShoes.height = $("#shoes").outerHeight();
	
	contextHead = canvasHead.getContext('2d');
	contextBody = canvasBody.getContext('2d');
	contextPants = canvasPants.getContext('2d');
	contextShoes = canvasShoes.getContext('2d');
	  
	var baseHeadImage = new Image();
	baseHeadImage.src = 'images/disney.jpg';
	baseHeadImage.onload = function(){
		//alert($("#head").offset().top+parseInt($("#head").attr('data-y')));
		contextHead.drawImage(
			baseHeadImage, 
			$("#head").offset().left, 
			$("#head").offset().top, 
			$("#head").outerWidth(),
			$("#head").outerHeight(),
			0,
			0,
			$("#head").outerWidth(),
			$("#head").outerHeight()
			);
			
		contextBody.drawImage(
			baseHeadImage, 
			$("#body").offset().left, 
			$("#body").offset().top, 
			$("#body").outerWidth(),
			$("#body").outerHeight(),
			0,
			0,
			$("#body").outerWidth(),
			$("#body").outerHeight()
			);
		
		contextPants.drawImage(
			baseHeadImage, 
			$("#pants").offset().left, 
			$("#pants").offset().top, 
			$("#pants").outerWidth(),
			$("#pants").outerHeight(),
			0,
			0,
			$("#pants").outerWidth(),
			$("#pants").outerHeight()
			);
		
		contextShoes.drawImage(
			baseHeadImage, 
			$("#shoes").offset().left, 
			$("#shoes").offset().top, 
			$("#shoes").outerWidth(),
			$("#shoes").outerHeight(),
			0,
			0,
			$("#shoes").outerWidth(),
			$("#shoes").outerHeight()
			);
	}
	
	
	
	$(".resize-container").hide(1000);
	
	$(".wrap").append(canvasHead);
	$(".wrap").append(canvasBody);
	$(".wrap").append(canvasPants);
	$(".wrap").append(canvasShoes);
}

function loadApp() {
  var $submitButton = $('button.submit-clothes');
  $submitButton.click(createCanvases);
}

$(loadApp);