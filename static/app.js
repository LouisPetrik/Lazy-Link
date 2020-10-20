// was noch rein muss: ein globales objekt für jeden lazy-link und
// dessen entsprechende seite, deren html gefetcht wurde.

// { linkIndex: 0, htmlContent: ''} objekt wo alle links und content gespeichert sind.
let pages = []

let aboutPage

// die eigentliche funktion zum getten des codes
function preload(linkIndex, route) {
	console.log('ID: ', linkIndex, route)
	fetch(`${route}`)
		.then(function (response) {
			// The API call was successful!
			return response.text()
		})
		.then(function (html) {
			// This is the HTML from our response as a text string

			pages.push({ linkIndex: linkIndex, htmlContent: html })
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

let testVar = ''

let listOfLazyLinks = []
const linkEl = document.getElementsByTagName('a')
for (let i = 0; i < linkEl.length; i++) {
	if (linkEl[i].getAttribute('lazylink') !== null) {
		// hier sollten wir den linkID und route getten und in die preload funktion passen
		preload(i, linkEl[i].getAttribute('href'))

		console.log('Should lazy:', linkEl[i])

		// das verlassen der seite verhindern:
		linkEl[i].addEventListener('click', (event) => {
			console.log('if in for')
			// when clicking on the link, to avoid the loading:
			event.preventDefault()
			console.log(linkEl[i], ' was pressed')
			// changes the URL without reloading:s
			window.history.pushState('', '', linkEl[i].getAttribute('href'))

			// get the needed page from the pags object:
			console.log('pages in event', pages)
			let correctPage = pages.filter((obj) => {
				return obj.linkIndex === i
			})

			// re-write the page with the fetched html from the fitting page
			document.write(correctPage[0].htmlContent)
		})
	}
}

window.onhashchange = function () {
	console.log('somethings wrong i can feel it')
}
