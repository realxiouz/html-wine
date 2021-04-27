/*
	[DESTOON B2B System] Copyright (c) 2008-2020 www.destoon.com
	This is NOT a freeware, use is subject to license.txt
*/
function dslide(id, time) {
	if($('#'+id).length == 0) return;
	if($('#'+id).html().indexOf('<ul') != -1) return;
	if(!time) time = 5000;
	var _this = this;
	this.w = $('#'+id).width();
	this.h = $('#'+id).height();
	this.c = 0;
	this.src = [];
	this.url = [];
	this.alt = [];
	this.tar = [];
	$('#'+id).find('a').each(function(i) {
		_this.src.push($(this).find('img')[0].src);
		_this.alt.push($(this).find('img')[0].alt);
		_this.url.push(this.href);
		_this.tar.push(this.target);
	});
	if(!this.src[0]) return;
	this.max = this.src.length;
	this.htm = '<ul id="'+id+'_ul" style="position:relative;width:'+this.w*(this.max+1)+'px;height:'+this.h+'px;z-index:1;overflow:hidden;">';
	for(var i = 0; i < this.max; i++) {
		this.htm += '<li style="float:left;"><a href="'+this.url[i]+'" target="'+this.tar[i]+'"><img src="'+this.src[i]+'" width="'+this.w+'" height="'+this.h+'"/></a></li>';
	}
	this.htm += '</ul>';
	if(this.alt[0]) this.htm += '<div id="'+id+'_alt" style="width:'+(this.w-32)+'px;height:32px;line-height:32px;overflow:hidden;z-index:3;position:absolute;margin-top:-'+this.h+'px;padding:0 16px;color:#FFFFFF;background:#384349;filter:Alpha(Opacity=60);opacity:0.6;font-size:14px;">'+this.alt[0]+'</div>';
	this.htm += '<div style="width:'+this.w+'px;height:20px;overflow:hidden;z-index:4;position:absolute;margin-top:-30px;text-align:center;padding-left:6px;cursor:pointer;">';
	for(var i = 0; i < this.max; i++) {
		this.htm += '<span id="'+id+'_no_'+i+'" style="display:inline-block;width:16px;height:6px;margin-right:6px;'+(i == this.c ? 'background:#007AFF;' : 'background:#EEEEEE;')+'"></span>';
	}
	this.htm += '</div>';
	$('#'+id).html(this.htm);
	if(this.max == 1) return;
	this.t;
	this.p = 0;
	$('#'+id).mouseover(function() {_this.p=1;});
	$('#'+id).mouseout(function() {_this.p=0;});
	$('#'+id).find('span').each(function(i) {
		$(this).mouseover(function() {
			_this.slide(i);
		});
	});
	this.slide = function(o) {
		if(o == this.c) return;
		if(o < 0 || o >= this.max) return;
		if(o == 0 && this.c == this.max - 1) {
			$('#'+id+'_ul').append($('#'+id+'_ul li:first').clone());
			$('#'+id+'_ul').animate({'left':-this.w*this.max},500,function() {
				$('#'+id+'_ul').css('left','0');
				$('#'+id+'_ul li:last').remove();
			});
		} else {
			$('#'+id+'_ul').animate({'left':-o*this.w},500);
		}
		$('#'+id+'_no_'+this.c).css('background','#FFFFFF');
		$('#'+id+'_no_'+o).css('background','#007AFF');
		if(this.alt[0]) $('#'+id+'_alt').html(this.alt[o]);
		this.c = o;
	}
	this.start = function() {
		if(this.p) return;
		if(this.c == this.max - 1) {
			this.slide(0);
		} else {
			this.slide(this.c+1);
		}
	}
	this.t = setInterval(function() {_this.start();}, time);
	return true;
}