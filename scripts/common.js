function isLocalhostOrHttp() {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;

    const isLocalhost = hostname == 'localhost' || hostname == '127.0.0.1';
    const isHttp = protocol == 'http:';

    return isLocalhost || isHttp;
}

function getHost() {
    // const local = `${window.location.host}//${window.location.host}`
    return isLocalhostOrHttp() ? `http://localhost:12000` : `https://example.com`;
}
