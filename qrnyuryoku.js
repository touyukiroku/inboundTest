$(function(){
    var qrtext = "ここにQRコード化したいテキストを入力";
    var utf8qrtext = unescape(encodeURIComponent(qrtext));
    $("#img-qr").html("");
    $("#img-qr").qrcode({text:utf8qrtext}); 
});

