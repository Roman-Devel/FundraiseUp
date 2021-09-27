import './styles/main.scss'

const rangeSize = document.getElementById("rangeSize"),
	  trackSize = document.querySelector('.trackSize'),
	  rangeRadius = document.getElementById("rangeRadius"),
	  trackRadius = document.querySelector('.trackRadius')

rangeSize.addEventListener('input', () => trackSize.style.width = rangeSize.value + '%')
rangeRadius.addEventListener('input', () => trackRadius.style.width = rangeRadius.value + '%')

document.querySelector('button[type="submit"]').addEventListener('click', (event) => {
	event.preventDefault()
})

document.querySelector('button[type="reset"]').addEventListener('click', () => {
	setTimeout(() => {
		trackSize.style.width = rangeSize.value + '%'
		trackRadius.style.width = rangeRadius.value + '%'
	}, 0)
})

const sandwich = document.querySelector('.aside .sandwich'),
	  nav = document.querySelector('.aside .nav')

if (sandwich) {
	sandwich.addEventListener('click', (event) => {
		if (nav.classList.contains('nav-active')) {
			nav.classList.add('nav-passive')
			nav.classList.remove('nav-active')
			sandwich.classList.remove('sandwich-active')
		} else {
			nav.classList.add('nav-active')
			sandwich.classList.add('sandwich-active')
		}
	})
}