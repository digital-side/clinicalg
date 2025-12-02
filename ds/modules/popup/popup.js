var DSLib = DSLib || {};
(function () {
    //private section---------------------------------------
    const C_MID = "ds-modal-id"
    const C_MCloseID = "ds-modal-close"

    function log(text) {
        if (console) {
            console.log(text);
        }
    }

    function error(error, text) {
        if (console) {
            console.error(error);
        }
    }

    function applyDisplay(idOrClassName, displayStr) {
        var display = displayStr || 'block';
        var item = document.getElementById(idOrClassName);
        if (item) {
            //log("aplicando a id: " + idOrClassName + ".style.display = " + display);
            item.style.display = display;
        } else {
            var items = document.getElementsByClassName(idOrClassName);
            if (items) {
                //log("aplicando a clase(" + items.length + " items): " + idOrClassName + ".style.display = " + display);
                var nodesArray = [].slice.call(items);
                nodesArray.forEach(function (value, index, array) {
                    nodesArray[index].style.display = display;
                });
            }
        }
    }

    function get_modal(modal_id) {
        var m_id = modal_id || C_MID;
        // Get the modal
        var modal = document.getElementById(m_id);
        return modal;
    }

    function open_modal(modal_id) {
        var modal = get_modal(modal_id);
        modal.style.display = "block";
        // modal.style.zIndex="-1"
    }

    function close_modal(modal_id) {
        var modal = get_modal(modal_id);
        modal.style.display = "none";
    }

    function add_close_event_listener(modal_id) {
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName(C_MCloseID)[0];
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            //modal.style.display = "none";
            close_modal(modal_id);
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            var modal = get_modal(modal_id);
            if (event.target == modal) {
                //modal.style.display = "none";
                close_modal(modal_id);
            }
        }
    }

    function add_open_event_listener(modal_id) {
        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");
        // When the user clicks the button, open the modal
        btn.onclick = function () {
            modal.style.display = "block";
        }
    }


    //public section---------------------------------------
    this.log = function (text) {
        log(text);
    };

    this.show = function (idOrClassName) {
        applyDisplay(idOrClassName);
    };

    this.hide = function (idOrClassName) {
        applyDisplay(idOrClassName, "none");
    };
    this.addCloseEventListener = function (modal_id) {
        add_close_event_listener(modal_id);
    };

    this.eventUtils = (function () {
        //eventUtils.addListener(document.body,"click", listener)
        var addListener = null, removeListener = null;
        if (typeof window.addEventListener === 'function') {
            addListener = function (element, eventName, listenerFunction) {
                element.addEventListener(eventName, listenerFunction, false);
            };
            removeListener = function (element, eventName, listenerFunction) {
                element.removeEventListener(eventName, listenerFunction, false);
            };
        } else if (typeof document.attachEvent === 'function') { // IE
            addListener = function (element, eventName, listenerFunction) {
                element.attachEvent('on' + eventName, listenerFunction);
            };
            removeListener = function (element, eventName, listenerFunction) {
                element.detachEvent('on' + eventName, listenerFunction);
            };
        } else { // older browsers
            addListener = function (element, eventName, listenerFunction) {
                element['on' + eventName] = listenerFunction;
            };
            removeListener = function (element, eventName, listenerFunction) {
                element['on' + eventName] = null;//????
            };
        }
        return {
            "addListener": addListener,
            "removeListener": removeListener
        }
    })();
}).apply(DSLib);
DSLib.addCloseEventListener();