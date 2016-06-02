function strcmp(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
}

function natcmp(a, b) {
    var x = [], y = [];

    a[0].replace(/(\d+)|(\D+)/g, function($0, $1, $2) { x.push([$1 || 0, $2]) })
    b[0].replace(/(\d+)|(\D+)/g, function($0, $1, $2) { y.push([$1 || 0, $2]) })

    while(x.length && y.length) {
        var xx = x.shift();
        var yy = y.shift();
        var nn = (yy[0]-xx[0]) || strcmp(yy[1],xx[1]);
        if(nn) return nn;
    }

    if(x.length) return -1;
    if(y.length) return +1;

    return 0;
}