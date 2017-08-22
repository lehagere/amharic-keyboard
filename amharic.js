var keys = Array();
    keys[104]=4613;
    keys[108]=4621;
    keys[72]=4629;
    keys[109]=4637;
    keys[83]=4645;
    keys[114]=4653;
    keys[115]=4661;
    keys[120]=4669;
    keys[75]=4677;
    keys[98]=4709;
    keys[118]=4717;
    keys[116]=4725;
    keys[99]=4733;
    keys[110]=4757;
    keys[71]=4765;
    keys[65]=4773;
    keys[107]=4781;
    keys[119]=4813;
    keys[88]=4821;
    keys[122]=4829;
    keys[74]=4837;
    keys[89]=4845;
    keys[100]=4853;
    keys[106]=4869;
    keys[103]=4877;
    keys[84]=4901;
    keys[67]=4909;
    keys[80]=4917;
    keys[113]=4925;
    keys[81]=4933;
    keys[102]=4941;
    keys[112]=4949;

function _do(v1){
	//$("#"+v1).css("font-size","9pt");
	//$("#"+v1).css("background-color","#EEE");
    /*document.getElementById(v1.toString()).style.fontSize="9pt";
    document.getElementById(v1.toString()).style.backgroundColor="#EEE";*/
}

function undo(){
	//$(".key").css({'backgroundColor':'#DDD'});
	//$(".key").css({'fontSize':'12pt'});
}

function key(e,elem){
	var input;
	var loc;

	try{

		var r=elem.getAttribute("type");
		if(r=='textarea'){
			input=elem.innerHTML;
			loc=doGetCaretPosition(elem);
		}
		else{
			input=elem.value;//holds the actual value inside the element
			loc=getSelectionStart(elem);//retrives the location of the cursor
		}
	}catch(Exc){
		input=elem.innerHTML;
		loc=doGetCaretPosition(elem);
		
	}

	var c=e.charCode?e.charCode:e.which?e.which:e.keyCode;
	var v=String.fromCharCode(c);//gets the character that has been pressed
	var v1=v.toLowerCase();//changes it to lower case

	var value=input;//holdes that value to be stored

	
	if(v==' '){//adds a space if space bar has been pressed
		value=input.substring(0,loc)+" "+input.substring(loc,input.length);
		loc=loc+1;
	}
	else if(v=='a' || v=='e' || v=='i' || v=='o' || v=='u' || v=='y'){//changes the previous letter if one of the following has been pressed

		if(jQuery.inArray(input.charCodeAt(loc-1),keys)!=-1){
			value=input.substring(0,loc-1)+String.fromCharCode(input.charCodeAt(loc-1)+getIndex(v))+input.substring(loc,input.length);//splits the word into two words and updates the letter which is on the left side of the cursor
		}
		_do(v1);
		setTimeout(undo,100);
	}
	else if(keys[c]!=null){
		
		var value1=keys[c];//retives the letter from the associative array

		value=input.substring(0,loc)+String.fromCharCode(value1)+input.substring(loc,input.length);
		loc=loc+1;

		_do(v1);
		setTimeout(undo,100);
	}
	else{
		return true;
	}

	try{
		var r1=elem.getAttribute("type");
		if(r1=='textarea'){
			elem.innerHTML=value;
		}
		else{
			elem.value=value;
		}
	}catch(exp){
		elem.innerHTML=value;
	}
	setCaretPosition(elem,loc);

	return false;
}

function getIndex(index){
	switch(index){
		case  'y': return -1;
		case  'e': return -5;
		case  'o': return 1;
		case  'u': return -4
		case  'i': return -3
		case  'a': return -2;
		default : return 0;
	}
}

function getSelectionStart(o) {//get caret position for input text
	if (o.createTextRange) {
		var r = document.selection.createRange().duplicate()
		r.moveEnd('character', o.value.length)
		if (r.text == '') return o.value.length
		return o.value.lastIndexOf(r.text)
	} else return o.selectionStart
}

function doGetCaretPosition (ctrl) {//get caret position for textarea
	var CaretPos = 0;	// IE Support
	if (document.selection) {
		ctrl.focus ();
		var Sel = document.selection.createRange ();
		Sel.moveStart ('character', -ctrl.value.length);
		CaretPos=ctrl.value.lastIndexOf(Sel.text);
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0')
		CaretPos = ctrl.selectionStart;

	return (CaretPos);
}
function setCaretPosition(ctrl, pos){//set caret position for textarea
	if(ctrl.setSelectionRange)
	{
		ctrl.focus();
		ctrl.setSelectionRange(pos,pos);
	}
	else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

function locate(elem){//This will move the keyboard into the right location
	var temp=elem;
	var left=0,top=0;
	do{
		left+=elem.offsetLeft;
		top+=elem.offsetTop;
	}while(elem=elem.offsetParent);

	if(window.screen.width>left+794)
		$("#keyboard").css({'left':left+'px'});
	else
		$("#keyboard").css({'left':(left+temp.offsetWidth-550)+'px'});
	$("#keyboard").css({'top':(top+temp.clientHeight)});
}



$(document).ready(function(){
	$("body").append('<div id="keyboard"> <ul class="cf" id="qwerty"><li><a href="#" class="key c9" id="tab"><span></span></a></li><li><a href="#" class="key c81"><b>&#4933;/&#4925;</b><span>Q/q</span></a></li><li><a href="#" class="key c87"><b>&#4813;</b><span>w</span></a></li><li><a href="#" class="key c69"><b>&#4768;</b><span>e</span></a></li><li><a href="#" class="key c82"><b>&#4653;</b><span>r</span></a></li><li><a href="#" class="key c84"><b>&#4901;/&#4725;</b><span>T/t</span></a></li><li><a href="#" class="key c89"><b>&#4845;/&#4772;</b><span>Y/y</span></a></li><li><a href="#" class="key c85"><b>&#4769;</b><span>u</span></a></li><li><a href="#" class="key c73"><b>&#4770;</b><span>i</span></a></li><li><a href="#" class="key c79"><b>&#4774;</b><span>o</span></a></li><li><a href="#" class="key c80"><b>&#4917;/&#4949;</b><span>P/p</span></a></li><li><a href="#" class="key c219 alt"><b></b><span></span></a></li><li><a href="#" class="key c221 alt"><b></b><span></span></a></li><li><a href="#" class="key c220 alt"><b></b><span></span></a></li></ul><ul class="cf" id="asdfg"><li><a href="#" class="key c20 alt" id="caps"><b></b><span></span></a></li><li><a href="#" class="key c65"><b>&#4773;/&#4771;</b><span>A/a</span></a></li><li><a href="#" class="key c83"><b>&#4645;/&#4661;</b><span>S/s</span></a></li><li><a href="#" class="key c68"><b>&#4853;</b><span>d</span></a></li><li><a href="#" class="key c70"><b>&#4941;</b><span>f</span></a></li><li><a href="#" class="key c71"><b>&#4765;/&#4877;</b><span>G/g</span></a></li><li><a href="#" class="key c72"><b>&#4613;/&#4629;</b><span>H/h</span></a></li><li><a href="#" class="key c74"><b>&#4837;/&#4869;</b><span>J/j</span></a></li><li><a href="#" class="key c75"><b>&#4677;/&#4781;</b><span>K/k</span></a></li><li><a href="#" class="key c76"><b>&#4621;</b><span>l</span></a></li><li><a href="#" class="key c186 alt"><b></b><span></span></a></li><li><a href="#" class="key c222 alt"><b></b><span></span></a></li><li><a href="#" class="key c13 alt" id="enter"><span></span></a></li></ul><ul class="cf" id="zxcvb"><li><a href="#" class="key c16 shiftleft"><span></span></a></li><li><a href="#" class="key c90"><b>&#4829;</b><span>z</span></a></li><li><a href="#" class="key c88"><b>&#4821;/&#4669;</b><span>X/x</span></a></li><li><a href="#" class="key c67"><b>&#4909;/&#4733;</b><span>C/c</span></a></li><li><a href="#" class="key c86"><b>&#4717;</b><span>v</span></a></li><li><a href="#" class="key c66"><b>&#4709;</b><span>b</span></a></li><li><a href="#" class="key c78"><b>&#4757;</b><span>n</span></a></li><li><a href="#" class="key c77"><b>&#4637</b><span>m</span></a></li><li><a href="#" class="key c188 alt"><b></b><span></span></a></li><li><a href="#" class="key c190 alt"><b></b><span></span></a></li><li><a href="#" class="key c191 alt"><b></b><span></span></a></li><li><a href="#" class="key c16 shiftright"><span></span></a></li></ul></div>');

	$(".amharic-keyboard").blur(function(){
		$("#keyboard").fadeTo(500,0);
		$("#keyboard").hide();
	});
	$(".amharic-keyboard").focus(function(){
		// console.log( $('#keyboard') );
		locate(this);
		$('#keyboard').css({'visibility':'visible'});
		$('#keyboard').fadeTo(500,1.0);
	});
});
