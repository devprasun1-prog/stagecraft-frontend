function getQueryParam(key){
	return new URLSearchParams(window.location.search).get(key);
}
function generateID() {
	return Math.rendom().toSTring(36).slice(2,10);
}