
// EXAMPLES: open modal based on href locations
//<a href="/localhost/noHtmlHeaders.html" class="modal">click to open modal</a> 
//$('.modal').modalbox();

// EXAMPLES: open modal with same page
//<a href="#" class="shareEmail">same modal</a> 
//$('.shareEmail').modalbox({isEmail:true, url: '/localhost/test.html'});

// click on element with classname 'shareEmail' or 'modal', overlay will be appended to body and popup with yahoo's web site.

(function ($) {

    var simpleoverlay = modalbox = loading = seoName = null;

    // $.fn is the object we add our custom functions to
    $.fn.modalbox = function (options) {
        this.each(function () {
            var o = $.extend({ }, $.modalbox.defaults, options || { }),
                obj = $(this);
            if (o.url) {
                var href = o.url;
            } else {
                var href = $(this).attr('href');
            }

            obj.click(function () {
                createOverlay(href);
                if (o.isEmail) { seoName = obj.closest('.media-column').find('.seoName').attr('id'); }
                return false;
            })
        });
    };

    function insert(data) {
        var boxContent = modalbox.append(data).find('div:first').hide();
        $('#modalbox .loading').hide();
        boxContent.fadeIn();

        if (seoName) { GLGInc.emailPopup(seoName); }

        $('.close', boxContent).click(function () {
            $.modalbox.closeOverlay();
            return false;
        })
    }

    function createOverlay(url) {
        simpleoverlay = $('<div id="simpleoverlay"></div>').appendTo('body'),
        modalbox = $('<div id="modalbox"><span class="loading"></span></div>').appendTo('body');
        $.post(url, function (data) {
            insert(data);
        });
    };

    // Public Variables and Methods
    $.modalbox = {
        defaults: {
            isEmail: false,
            url: ''
        },

        closeOverlay: function () {
            simpleoverlay.fadeOut().remove();
            modalbox.fadeOut().remove();
        },

        autoOpen: function (url) {
            createOverlay(url);
        }
    };

})(jQuery);

