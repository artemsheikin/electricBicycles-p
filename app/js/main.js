document.addEventListener('DOMContentLoaded', () => {
	// Инициализация карты
	async function initMap() {
		// Дожидаемся готовности ymaps3
		await ymaps3.ready

		const {
			YMap,
			YMapDefaultSchemeLayer,
			YMapDefaultFeaturesLayer,
			YMapMarker,
		} = ymaps3

		// Получаем контейнер для карты
		const mapContainer = document.getElementsByClassName('map__map')[0]

		if (!mapContainer) {
			console.error('Элемент с классом "map__map" не найден.')
			return
		}

		// Создаем карту с центром в заданных координатах
		const map = new YMap(mapContainer, {
			location: {
				center: [37.568641, 55.720005],
				zoom: 15,
			},
		})

		// Загружаем кастомизацию из JSON
		try {
			const response = await fetch('../../customization.json') // Указываем путь к файлу
			if (!response.ok) throw new Error('Ошибка загрузки JSON файла')
			const jsonData = await response.json()

			// Создаем слой с кастомизацией
			const layer = new YMapDefaultSchemeLayer({
				theme: 'dark', // Тема карты
				customization: jsonData, // Добавляем загруженную кастомизацию
			})

			// Создаем слой с функциональностью карты
			const featuresLayer = new YMapDefaultFeaturesLayer()
			map.addChild(featuresLayer)

			// Добавляем слой на карту
			map.addChild(layer)
			console.log('Карта успешно загружена с кастомизацией.')
		} catch (error) {
			console.error('Ошибка при загрузке JSON:', error)
		}

		// Создаем кастомный маркер
		const markerContent = document.createElement('div')
		markerContent.className = 'map__marker'
		markerContent.style.width = '112px'
		markerContent.style.height = '138px'
		markerContent.style.backgroundImage = "url('../../../images/icons/map.svg')"
		markerContent.style.backgroundSize = 'contain'
		markerContent.style.backgroundRepeat = 'no-repeat'

		const marker = new YMapMarker(
			{ coordinates: [37.568852, 55.72369] },
			markerContent
		)

		// Добавляем маркер на карту
		map.addChild(marker)
	}

	initMap() // Запускаем инициализацию карты

	// Обработчик кнопки меню
	const menuBtn = document.querySelector('.menu__btn')
	const menuBox = document.querySelector('.menu__box')

	// Переключение активности меню
	if (menuBtn && menuBox) {
		menuBtn.addEventListener('click', () => {
			menuBox.classList.toggle('active')
		})
	} else {
		console.log('Кнопка или меню не найдены')
	}

	const swiper1 = new Swiper('.partnersSwiper', {
		slidesPerView: 6, // Количество видимых слайдов
		centeredSlides: true, // Центральное выравнивание активного слайда
		spaceBetween: 30, // Расстояние между слайдами
		grabCursor: true, // Курсор в виде "руки" при наведении
		loop: true, // Бесконечная прокрутка
		autoplay: {
			delay: 2000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true, // Остановка при наведении мыши
		},
		breakpoints: {
			320: {
				slidesPerView: 1, // Количество видимых слайдов на экранах до 576px
				spaceBetween: 0, // Расстояние между слайдами на экранах до 576px
			},
			576: {
				slidesPerView: 3, // Количество видимых слайдов на экранах до 576px
				spaceBetween: 40, // Расстояние между слайдами на экранах до 576px
			},
			768: {
				slidesPerView: 4, // Количество видимых слайдов на экранах до 768px
			},
			1024: {
				slidesPerView: 5, // Количество видимых слайдов на экранах до 1024px
			},
			1400: {
				slidesPerView: 6, // Количество видимых слайдов на экранах до 1400px
			},
		},
	})

	const swiper2 = new Swiper('.mySwiper', {
		slidesPerView: 1,
		spaceBetween: 30,
		keyboard: {
			enabled: true,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	})

	const swiper3 = new Swiper('.equipmentSwiper', {
		slidesPerView: 3, // По умолчанию показывать 3 слайда
		spaceBetween: 40, // Отступы между слайдами
		slidesPerGroup: 1, // Листать по одной карточке
		keyboard: {
			enabled: true,
		},
		navigation: {
			nextEl: '.equipment-swiper__button-next',
			prevEl: '.equipment-swiper__button-prev',
		},
		breakpoints: {
			320: {
				// Экраны от 320px
				slidesPerView: 1,
				spaceBetween: 20,
			},
			576: {
				// Экраны от 576px
				slidesPerView: 2,
				spaceBetween: 30,
			},
			1024: {
				// Экраны от 1024px
				slidesPerView: 3,
				spaceBetween: 40,
			},
		},
	})

	const swiper4 = new Swiper('.reviewsSwiper', {
		slidesPerView: 4,
		spaceBetween: 40,
		loop: true, // Включите, если хотите бесконечный цикл
		slidesOffsetBefore: 230, // Отступ от левого края обёртки
		snapGrid: true, // Слайды возвращаются к ближайшему положению
		autoplay: {
			delay: 2000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true, // Остановка при наведении мыши
		},
		breakpoints: {
			1720: {
				slidesPerView: 4,
				spaceBetween: 40,
				slidesOffsetBefore: 230,
			},
			1400: {
				slidesPerView: 4,
				spaceBetween: 40,
				slidesOffsetBefore: 230,
			},
			1240: {
				slidesPerView: 3,
				spaceBetween: 20,
				slidesOffsetBefore: 0,
				autoplay: false, // Отключаем автопрокрутку для экранов больше 1240px
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 10,
				slidesOffsetBefore: 0,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 10,
				slidesOffsetBefore: 0,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 10,
				slidesOffsetBefore: 0,
			},
			330: {
				slidesPerView: 1,
				spaceBetween: 10,
				slidesOffsetBefore: 0,
			},
		},
	})
	// Работа с видео
	const video = document.getElementById('custom-player')
	const img = document.querySelector('.presentation__img')

	// Прогресс-бар
	const progressBar = document.getElementById('progress-bar')

	// Обработка событий play и pause
	video.addEventListener('play', () => {
		img.style.display = 'none' // Прячем обложку при воспроизведении
		document.getElementById('custom-play').style.display = 'none' // Скрываем кнопку play
		document.getElementById('custom-pause').style.display = 'block' // Показываем кнопку pause
	})

	video.addEventListener('pause', () => {
		img.style.display = 'block' // Показываем обложку при паузе
		document.getElementById('custom-play').style.display = 'block' // Показываем кнопку play
		document.getElementById('custom-pause').style.display = 'none' // Скрываем кнопку pause
	})

	// Обновление прогресс-бара
	video.addEventListener('timeupdate', () => {
		const progress = (video.currentTime / video.duration) * 100
		progressBar.value = progress // Обновляем значение прогресс-бара
	})

	// Перемещение по прогресс-бару
	progressBar.addEventListener('input', () => {
		const time = (progressBar.value / 100) * video.duration
		video.currentTime = time // Устанавливаем новое время видео
	})

	// Обработчики для кнопок play и pause
	const customPlayBtn = document.getElementById('custom-play')
	const customPauseBtn = document.getElementById('custom-pause')

	// Скрытие стандартных элементов управления для видео
	video.controls = false // Отключаем стандартные элементы управления

	if (customPlayBtn) {
		customPlayBtn.addEventListener('click', () => {
			video.play()
		})
	}

	if (customPauseBtn) {
		customPauseBtn.addEventListener('click', () => {
			video.pause()
		})
	}

	// Добавляем обработчик клика по видео
	video.addEventListener('click', () => {
		if (video.paused) {
			video.play() // Воспроизведение видео при клике
		} else {
			video.pause() // Пауза при клике
		}
	})

	// Добавляем обработчик нажатия пробела
	document.addEventListener('keydown', (event) => {
		if (event.key === ' ' || event.key === 'Spacebar') {
			// Проверяем, был ли нажат пробел
			if (video.paused) {
				video.play() // Воспроизведение видео при нажатии пробела
			} else {
				video.pause() // Пауза при нажатии пробела
			}
			event.preventDefault() // Предотвращаем выполнение стандартного действия для пробела (например, прокрутка страницы)
		}
	})

	// Обработчик поиска
	function search() {
		const query = document.querySelector('.search-input').value
		console.log('Ищем: ' + query)
		// Ваш код для обработки поиска
	}

	// Проверяем наличие элемента перед добавлением обработчика
	const searchInput = document.querySelector('.search-input')
	if (searchInput) {
		searchInput.addEventListener('input', search)
	} else {
		console.error('Элемент с классом .search-input не найден')
	}

	// Обработчик кнопки поиска
	const searchButton = document.querySelector('.header__userNav-item--search')
	const searchContainer = document.querySelector('.search-container')

	document
		.querySelector('.header__userNav-item--search')
		.addEventListener('click', () => {
			const target = document.querySelector('.search-container') // Находим другой элемент
			target.classList.toggle('search-container--active') // Добавляем класс
		})
	/* выпадающий список в футоре */
	/* Когда пользователь нажимает на кнопку,
переключение между скрытием и отображением раскрывающегося содержимого */
	document
		.querySelectorAll('.footer-bottom__title--script')
		.forEach((title) => {
			title.addEventListener('click', (e) => {
				// Останавливаем дальнейшее распространение события, чтобы не сработал глобальный обработчик
				e.stopPropagation()

				// Ищем ближайший список, который должен открыться при клике
				const catalogList = title.nextElementSibling // Список идет сразу после заголовка

				// Если это список, то переключаем класс 'show'
				if (
					catalogList &&
					catalogList.classList.contains('footer-bottom__catalog-list')
				) {
					catalogList.classList.toggle('show')
				}

				// Для других элементов, например для блока "Для клиента"
				const clientList = title.nextElementSibling
				if (
					clientList &&
					clientList.classList.contains('footer-bottom__client-list')
				) {
					clientList.classList.toggle('show')
				}
			})
		})

	// Глобальный обработчик кликов по документу
	document.addEventListener('click', () => {
		// Закрываем все списки
		document
			.querySelectorAll(
				'.footer-bottom__catalog-list, .footer-bottom__client-list'
			)
			.forEach((list) => {
				list.classList.remove('show')
			})
	})

	/* // Закройте выпадающее меню, если пользователь щелкает за его пределами
	window.onclick = function (event) {
		if (!event.target.matches('.dropbtn')) {
			var dropdowns = document.getElementsByClassName('dropdown-content')
			var i
			for (i = 0; i < dropdowns.length; i++) {
				var openDropdown = dropdowns[i]
				if (openDropdown.classList.contains('show')) {
					openDropdown.classList.remove('show')
				}
			}
		}
	} */
})

// Проверяем размер экрана при загрузке страницы
checkScreenWidth()

// Проверяем размер экрана при изменении окна
window.addEventListener('resize', checkScreenWidth)

document.addEventListener('DOMContentLoaded', function () {
	const menuLinks = document.querySelectorAll('.header__menu-item')

	if (menuLinks.length > 0) {
		menuLinks.forEach((link) => {
			link.addEventListener('click', function (event) {
				event.preventDefault() // предотвращаем стандартное поведение ссылки

				// Находим следующий элемент (выпадающий список)
				const dropdown = this.nextElementSibling

				// Проверяем, есть ли выпадающий список
				if (dropdown && dropdown.classList.contains('dropdown-list')) {
					// Если выпадающий список есть, добавляем/удаляем класс на элемент
					this.classList.toggle('header__menu-item--active')

					// Переключаем класс на выпадающем списке
					dropdown.classList.toggle('dropdown-list--active')

					// Переключаем класс на SVG-иконке
					const svgIcon = this.querySelector('.header__menu-svg')
					if (svgIcon) {
						svgIcon.classList.toggle('header__menu-svg--active')
					}

					// Закрываем другие выпадающие списки, если они открыты
					menuLinks.forEach((otherLink) => {
						if (otherLink !== this) {
							const otherDropdown = otherLink.nextElementSibling
							const otherSvgIcon = otherLink.querySelector('.header__menu-svg')
							const otherLinkSvgIcon =
								otherDropdown &&
								otherDropdown.classList.contains('dropdown-list') &&
								otherDropdown.classList.contains('dropdown-list--active')
									? otherSvgIcon
									: null

							otherLink.classList.remove('header__menu-item--active')
							if (
								otherDropdown &&
								otherDropdown.classList.contains('dropdown-list')
							) {
								otherDropdown.classList.remove('dropdown-list--active')
							}

							if (otherLinkSvgIcon) {
								otherLinkSvgIcon.classList.remove('header__menu-svg--active')
							}
						}
					})
				}
			})
		})
	} else {
		console.log('Нет элементов с классом .header__menu-item')
	}
})

/* media */
function checkScreenWidth() {
	const screenWidth = window.innerWidth

	if (screenWidth <= 576) {
		const burger = document.querySelector('.burger__input')
		const body = document.body

		burger.addEventListener('click', () => {
			console.log('Меню кликнуто') // Проверка срабатывания события
			body.classList.toggle('no-scroll')
		})
	} else {
		// Скрипт продолжает работать на большем разрешении
		console.log('Скрипт активен')
		// Ваш код для работы на больших разрешениях
	}
}
