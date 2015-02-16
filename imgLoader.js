var ImgLoader = (function(){
    ImgLoader = function(_src,_obj){
        var THIS = this;
        var imgURL = _src;
        var ImgCompleteFlg=false;
        var errorCount = 0;
        var MaxErrorCount = _obj.MaxErrorCount||10;
        var width=0;
        var height=0;
        var complete = _obj.complete||function(){return false;};
        var ErrorHD = _obj.errorHD||function(){return false;};

        this.load = function(){
            var _img = new Image();
            $(_img).load(function(){
                $(_img).width(this.width)
                $(_img).height(this.height)
                setImgWidth(this.width);
                setImgHeight(this.height);
                setImgComplete(true);
                THIS.src = _img.src;
                THIS.target =$(_img);
                complete(THIS);
            });
            $(_img).error(function(){
                errorCount++;
                if(MaxErrorCount<errorCount){
                    ErrorHD(THIS)
                }else{
                    THIS.load()
                };
            });
            _img.src = imgURL+ "?" + new Date().getTime();
        }

        var setImgComplete = function(_flg){
            ImgCompleteFlg = _flg;
        };

        var setImgWidth = function(_w){
            width = _w;
        }

        var setImgHeight = function(_h){
            height = _h;
        }

        this.width = function(){
            return width;
        }

        this.height = function(){
            return height;
        }

        this.getImgComplete = function(){
            return ImgCompleteFlg;
        };
    }
    return ImgLoader;
})();