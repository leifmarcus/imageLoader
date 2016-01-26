(function($){
    /**
    *   run $('.image').imageLoader() to reload all images
    *
    *   use images like
    *   <img class="image" src="{small src}"
    *       data-src300="{300px source}"
    *       data-src600="{600px source}"
    *       data-src900="{900px source}"
    *       ...     />
    */
    $.fn.imageLoader = function(options) {
        // set default settings:
        var settings = $.extend({
            startSize: 300,     /* the smalles image size */
            stepSize: 300,      /* the step size to the next image size */
            prefix: 'src',
            hideClass: 'hide',
            imgPath: '',
            complete: function(el, src) { return el; }
        }, options );

        var _getProps = function(el) {
            var $el = $(el);
            var width = $el.width();
            var height = $el.height();
            var ratio = window.devicePixelRatio || 1;
            return {
                el: el,
                $el: $el,
                data: $el.data(),
                bgImage: el.style.backgroundImage,
                max: Math.max(width, height) * ratio
            };
        };

        var _load = function(el, src, callback) {
            $(el).load(function() {
                el.setAttribute('draggable', true);
                if (typeof callback === 'function') { callback(el, src); }
            });
            if (el.complete) {
                el.setAttribute('draggable', true);
                if (typeof callback === 'function') { callback(el, src); }
            }
        };

        var _getImageSrc = function(props) {
            var current = settings.startSize;
            var temp = props.data[settings.prefix + current];
            var src = temp;

            while (temp !== undefined && props.max >= current) {
                current += settings.stepSize;
                temp = props.data[settings.prefix + current];
                if (temp !== undefined) {
                    src = temp;
                }
            }

            return settings.imgPath + src;
        };

        var _handleWrapper = function(el) {
            var props = _getProps(el);
            var src = _getImageSrc(props);

            if (props.bgImage !== '') {
                el.style.backgroundImage = 'url("' + src + '")';
            } else {
                var $img = props.$el.find('img:eq(0)');
                if ($img.length > 0) {
                    _load($img.get(0), src, settings.complete);
                    $img.attr('src', src);
                }
            }
        };

        var _handleImage = function(el) {
            var props = _getProps(el);
            var src = _getImageSrc(props);
            _load(el, src, settings.complete);
            props.$el.attr('src', src);
        };

        var _loadImage = function(i, el) {
            if (el.tagName.toLowerCase() === "img") {
                _handleImage(el);
            } else {
                _handleWrapper(el);
            }

        };
        return this.each(_loadImage);
    };
}(jQuery));
