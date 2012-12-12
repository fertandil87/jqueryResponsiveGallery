var ResponsiveGallery = function(){
    
    var _self = this;

    var maxItems = 0;
    var container = $('#demo');
    var itemsPerLine = 3;
    var marginBotton = 2;
    var maxHeight = 0;
    
    this.items = {};
    
    this.getMaxItems = function(){
        maxItems = $('.item',container).length;
    };
    
    this.getAbsoluteElementPosition = function(element) {

        element = $(element).get(0);

        if (!element) return 0;

        var y = 0;
        while (element.offsetParent) {
            y += element.offsetTop;
            element = element.offsetParent;
        }
        return y;
    }
    this.getLineItems = function(start,finish){
        for(var k = start; k < finish; k++){
            if ($('.item',container).get(k) ){            
                var item = $('.item',container).get(k);
                var height = $('img',item).height();
                var img = $('img',item).get(0);
                var topPosition = this.getAbsoluteElementPosition(img);
                var bottomPosition = topPosition+height;
                this.items[k] = {
                    'item'          : item,
                    'height'        : height,
                    'bottomPosition': bottomPosition,
                    'topPosition'   : topPosition
                }
            }
        }    
    };
    
    this.parseItems = function(){
        this.getMaxItems();
        this.getLineItems(0, itemsPerLine);
        if(maxItems > itemsPerLine){
            for(var i = itemsPerLine; i < maxItems; i+= itemsPerLine){
                this.getLineItems(i, i+itemsPerLine);
                for(var j = 0; j < itemsPerLine; j++){
                    var antImg = $('img',this.items[i+j-itemsPerLine].item);
                    var img = $('img',this.items[i+j].item);
                    $(img).css('margin-top',(this.items[i+j].topPosition - this.items[i+j-itemsPerLine].bottomPosition ) *-1 +marginBotton +'px');
                    if((this.items[i+j-itemsPerLine].bottomPosition + this.items[i+j].height) > maxHeight)
                        maxHeight = this.items[i+j-itemsPerLine].bottomPosition + this.items[i+j].height;
                }
                this.getLineItems(i, i+itemsPerLine);
            }
            
        }
        console.log(this.items);
    };
    this.setContainerHeight = function(){
        $(container).css('height',maxHeight+'px');
    };
    this.resetMargins = function(){
        $('img',container).css('margin-top','0px');
        maxHeight = 0;
    };
    this.init = function(){
        $('img',container).imagesLoaded(function($images, $proper, $broken){
            _self.parseItems();
            _self.setContainerHeight();
            $(window).resize(function() {
                _self.resetMargins();
                _self.parseItems();
                _self.setContainerHeight();
            });
        });
    };
};

gallery = new ResponsiveGallery();
gallery.init();