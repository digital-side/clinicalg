(function () {
    "use strict";
    const C_MID = "ds-modal-id"
    const C_MCloseID = "ds-modal-close"

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
    add_close_event_listener(C_MID);
    open_modal(C_MID);
})()