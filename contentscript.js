try {
    console.debug("extension start");
    grn;
} catch(e) {
    console.debug("initialize garoon");
    grn = {};
}
(function() {
    console.log("content script is loaded, you can use $");
    // define functions //
    /**
     * hoge("test") -> logging hoge test
     */
    var hoge = function(arg) {
        console.info("hoge", arg);
    };

    var getUnreads = function() {
        var links = $("a[href^='/cgi-bin/cbgrn/grn.cgi/bulletin/view']").find(".bold").parent();
        console.log(links);
    };
    var inputJ = function() {
        console.log("j pressed");
    };
    var inputK = function() {
        console.log("k pressed");
    };
    var inputO = function() {
        console.log("o pressed");
    };
    var inputM = function() {
        console.log("load meeting room");
    };
    var unreads = [];

    // start main logic //
    var links = getUnreads();
    $(document).on("keydown", null, "j", inputJ);
    $(document).on("keydown", null, "k", inputK);
    $(document).on("keydown", null, "o", inputO);
    $(document).on("keydown", null, "m", inputM);


})(grn);

