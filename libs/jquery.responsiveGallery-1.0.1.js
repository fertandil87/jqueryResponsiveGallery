var ResponsiveGallery = function(){
    
    var _self = this;
    var item0 = null;
    var item1 = null;
    var item2 = null;
    var maxItems = 0;
    var container = $('#demo');
    var itemsPerLine = 3;
    
    this.items = {};
    
    this.getMaxItems = function(){
        maxItems = $('.item',container).length;
    };
       
    this.getLineItems = function(start,finish){
        for(var k = start; k < finish; k++){
            if ($('.item',container).get(k) ){            
                var item = $('.item',container).get(k);
                this.items[k] = {
                    'src'           : $('img',item).attr('src'),
                    'height'        : item.offsetHeight,
                    'width'         : item.offsetWidth,
                    'bottomPosition': item.offsetTop+item.offsetHeight,
                    'topPosition'   : item.offsetTop,
                    'leftPosition'  : item.offsetLeft,
                    'rightPosition' : item.offsetLeft+item.offsetWidth
                };
                $(item).remove();
            }
        }    
    };
    this.generateItem = function(src,top,left){
        var li = $('<div class="item2" style="top:'+top+'px;left:'+left+'px;"></div>').html('<img src="'+src+'" />');
        $('#demo').append(li);
    };
    this.parseItems2 = function(){
        this.getMaxItems();
        for(var i = 0; i < maxItems; i+= itemsPerLine){
            this.getLineItems(i, i+itemsPerLine);
            for(var j = 0; j < itemsPerLine; j++){
                if( i == 0)
                    this.generateItem(this.items[i+j].src,0, this.items[i+j].leftPosition);
                else{
                    this.generateItem(
                    this.items[i+j].src,
                    this.items[i+j-itemsPerLine].bottomPosition,
                    this.items[i+j].leftPosition);
                }
            }
            this.getLineItems(i, i+itemsPerLine);
        }
        console.log(this.items);

    };
    
    this.parseItems = function(){
        this.getMaxItems();
        this.getLineItems(0, itemsPerLine);
        if(maxItems > itemsPerLine){
            for(var i = itemsPerLine; i < maxItems; i+= itemsPerLine){
                this.getLineItems(i, i+itemsPerLine);
                for(var j = 0; j < itemsPerLine; j++){
                    var img = $('img',this.items[i+j].item);
                    $(img).css('margin-top',this.items[i+j-itemsPerLine].bottomPosition - this.items[i+j].topPosition +'px');
                    this.items[i+j].bottomPosition = this.items[i+j].item.offsetHeight + this.items[i+j].item.offsetTop;
                }
                
            }
            
        }
        console.log(this.items);
    };
    this.init = function(){
        $('img',container).imagesLoaded(function($images, $proper, $broken){
            _self.parseItems2();
        });            
    }
};

gallery = new ResponsiveGallery();
gallery.init();