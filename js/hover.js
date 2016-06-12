;(function (window,undefined){
    function Hotspot(){
    	this.init();
    }

    Hotspot.prototype = {
    	init :function(){
          this.onHotspotHover();
    	},
         //定位点显示隐藏
    	onHotspotHover:function(){
    		var hotSports = this.$$('Hotspot'),
    		    len = hotSports.length,
    		    i,
    		    that = this,
    		    currDetiaImg;
    		for(i=0;i<len;i++){
    			currDetiaImg = that.$$('detailImg',hotSports[i])[0];
    			currDetiaImg.timer = null;
    			currDetiaImg.alpha = 0;
    			hotSports[i].onmouseover = function(e){
    				that.doTransform(that.$$('detailImg',this)[0],100);
    				that.$$('hotSpotSpan',this)[0].style.display = 'none';
    			}
    			hotSports[i].onmouseout = function(e){
    				that.doTransform(that.$$('detailImg',this)[0],0);
    				that.$$('hotSpotSpan',this)[0].style.display = 'block';
    			}
    		}
    	},
        //细节图展开

        doTransform:function(me,alpha){
            var times = 0;
            if (alpha == 100) {
               times = 5;
            }else{
            	times = -5;
            }
            me.style.display = 'block';
            clearInterval(me.timer);
            me.timer = setInterval(functioin(){
                 if (me.alpha == alpha) {
                 	clearInterval(me.timer);
                 	if (alpha == 0) {
                 		me.style.display = 'none';
                 	}else{
                 		me.alpha += times;
                 		me.style.opacity = me.alpha/100;
                 		me.style.filter = 'alpha(opacity:'+me.alpha+')';//兼容ie
                 	}
                 }
            },30);
        },
    	$$: function(clsName,ele){
    		if (document.getElementByClassName) {
    			return (ele || document).getElementByClassName(clsName);
    		}else{
    			var nodes = (ele || document).getElementsByTagName('*'),
    			    eles = [],
    			    len = nodes.length,
    			    i,
    			    j,
    			    currNode,
    			    clsNames,
    			    clsLen;
    			for(i=0;i<len;i++){
    				currNode = nodes[i];
    				clsNames = currNode.clsName.split(' ');
    				clsLen = clsNames.length;
    				for(j=0;j<clsLen;j++){
    					if (clsNames[j] == clsName) {
    						eles.push(currNode);
    						break;
    					}
    				}
    			}
    			return eles;
    		}
    	}
    }

    new Hotspot();
})(window);