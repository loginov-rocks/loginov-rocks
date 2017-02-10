function count(site) {
    var req;
    var url = 'count.php';
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        req.open('POST', url, true);
        req.setRequestHeader('Method', 'POST ' + url + ' HTTP/1.1');
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send('site=' + site);
    }
    else if (window.ActiveXObject) {
        req = new ActiveXObject('Microsoft.XMLHTTP');
        if (req) {
            req.open('POST', url, true);
            req.setRequestHeader('Method', 'POST ' + url + ' HTTP/1.1');
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            req.send('site=' + site);
        }
    }
}
