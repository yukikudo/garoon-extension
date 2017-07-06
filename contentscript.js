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

    /**
     * カーソル移動の対象としたいリンク一覧を取得
     */
    var getUnreads = function() {
        console.debug("getUnreads");
        // 未読
        // /cbgrn/grn/image/cybozu/bulletin20.gif?20170330.text
        var $bulletin = $("a[href^='/cgi-bin/cbgrn/grn.cgi/bulletin/view']");
        var unreadLinks = $bulletin.find(".bold").parent();
        // 更新掲示板は画像で決まる
        var modifiedLinks = $bulletin.find("img[src*='bulletin20_u.gif']").parent();
        // TODO: 掲示板以外：スケジュールも対象にしたいかも

        // 対象となるリンク先を全マージ
        $links = $.merge(modifiedLinks, unreadLinks); 

        // 暫定で色をつける
        $links.css("backgroundColor", "#FCC");
        return $links;
    };

    /**
     * j キーを押した時のショートカット動作
     * 次の未読リンクへ移動
     */
    var inputJ = function() {
        // TODO: 実装
        console.log("j pressed");
    };
    /**
     * k キーを押した時のショートカット動作
     * 前の未読リンクへ移動
     */
    var inputK = function() {
        // TODO: 実装
        console.log("k pressed");
    };

    /**
     * o キーを押した時の実装
     * リンク先をロードして表示する
     */
    var inputO = function() {
        console.log("o pressed");
    };

    /**
     * m キーを押した時の実装
     * 会議室先を取得してスケジュールにロードする
     * ※ 画面読み込み時にロードしても良いかも
     */
    var inputM = function() {
        // TODO: リンクじゃないのにappendしている部分があるように見えるので要調査
        console.log("load meeting room");
        $meetings = $("a[href^='/cgi-bin/cbgrn/grn.cgi/schedule/view']");
        $meetings.each(function(){
            // スケジュール表内のイベントには画像がない
            var $obj = $(this);
            if ($obj.has("img").length === 0) {
                $.ajax({
                    url: $(this).attr("href")
                })
                .done(function(data) {
                    //  <span class="facility-grn"><a ...>会議室名</a></span>
                    $html = $(data);
                    var room = "[場所：" + $html.find(".facility-grn").text() + "]";
                    $obj.append(room);
                });
            }
        });
    };


    var unreads = [];

    // start main logic //
    var main = function() {
        var links = getUnreads();
        $(document).on("keydown", null, "j", inputJ);
        $(document).on("keydown", null, "k", inputK);
        $(document).on("keydown", null, "o", inputO);
        // 会議室読み込みは初回呼び出し時でもいいかも
        $(document).on("keydown", null, "m", inputM);
        // rキーはただのリロード
        $(document).on("keydown", null, "r", function() {
            location.reload()
        });
    };

    // start
    main();
})(grn);


