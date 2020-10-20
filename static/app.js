let aboutPage

// die eigentliche funktion zum getten des codes
function preload(route) {
	fetch(`${route}`)
		.then(function (response) {
			// The API call was successful!
			return response.text()
		})
		.then(function (html) {
			// This is the HTML from our response as a text string
			aboutPage = html
		})
		.then(function () {})
		.catch(function (err) {
			// There was an error
			console.warn('Something went wrong.', err)
		})
}

// hier die funktion, um das onclick auf den link abzufangen

// damit kann man das href-attribut vom ersten link getten:
// document.getElementsByTagName("a")[0].getAttribute("href")
let listOfLazyLinks = []
const linkEl = document.getElementsByTagName('a')
for (let i = 0; i < linkEl.length; i++) {
	if (linkEl[i].getAttribute('lazylink') !== null) {
		console.log('Should lazy:', linkEl[i])
		// das verlassen der seite verhindern:
		linkEl[i].addEventListener('click', (event) => {
			// when clicking on the link, to avoid the loading:
			event.preventDefault()
			console.log(linkEl[i], ' was pressed')
			// changes the URL without reloading:s
			window.history.pushState('', '', linkEl[i].getAttribute('href'))

			document.write(aboutPage)
		})
	}
}

preload('about')
