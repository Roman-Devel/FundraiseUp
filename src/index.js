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