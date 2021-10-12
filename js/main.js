document.addEventListener('DOMContentLoaded', () => {

    const navButton = document.querySelectorAll('.navbar-item'),
        containerList = document.querySelectorAll('.task-list__item'),
        forms = document.querySelectorAll('form'),
        titleInput = document.querySelector('.input-title'),
        descriptionForm = document.querySelector('.input-description'),
        navbarList = document.querySelector('.navbar-list'),
        postCard = document.querySelector('.card'),
        mainContainer = document.querySelector('.main-container'),
        colors = ['#fabbbb', '#fabbef', '#4eaef2', '#82f24e', '#e2ed66', '#ed7666',
            '#f2639f', '#254473', '#31bdbd']

    const preloader = document.createElement('div')
    preloader.classList.add('preloader')
    preloader.innerHTML = `
    <img src="../css/1475.gif">
    `
    navbarList.insertAdjacentElement('afterend',preloader)


    navButton.forEach((item, i) => {
        item.addEventListener('click', () => {
            hideContainer()
            openContainer(i)
        })
    })

    let getResource = async function (url) {
        const res = await fetch(url, {
            method: 'GET'
        })
        return await res.json()
    }


    /*class Card {
        constructor(title, description, important, parentSelector) {
            this.title = title
            this.description = description
            this.parent = document.querySelector(parentSelector)
            this.important = important
        }
        render() {
            const item = document.createElement('div')
            item.classList.add('card')
            if (this.important) {

                item.innerHTML = `
            <div class="uk-card uk-card-primary uk-card-body">
            <h3 class="uk-card-title">${this.title}</h3>
            <p>${this.description}</p>
         `
            } else {
                item.innerHTML = `
            <div class="uk-card uk-card-secondary uk-card-body">
            <h3 class="uk-card-title">${this.title}</h3>
            <p>${this.description}</p>
         `
            }
        this.parent.insertAdjacentElement('afterbegin',item)
        }
    }


    const statusMessage = document.createElement('div')
    statusMessage.classList.add('uk-alert-success')
    statusMessage.style.cssText = `
    width: 120px;
    height: 25px;
    margin: 0 auto;
    text-align: center;
    top: 50%;
    font-size: 18px;
    border-radius: 5%;
    `
    statusMessage.textContent = 'qwerty'
    document.body.append(statusMessage)
    statusMessage.remove()

    const getPosts = function () {
        getResource('http://localhost:3000/posts')
            .then(data => {
                console.log(data)
                if(data.length === 0) {
                    console.log('Список задач пуст')
                    preloader.remove()
                }else {
                    data.forEach(({title, description, important}) => {
                        new Card(title, description, important,'.main-container').render()
                        preloader.remove()
                    })
                }
            })
    }*/


    /*getPosts()*/


    let openContainer = function (i = 0) {
        containerList[i].classList.add('task-list__active')

    }
    let hideContainer = function () {
        containerList.forEach(item => {
            item.classList.remove('task-list__active')
        })
    }
    hideContainer()
    openContainer(0)


    const getPosts = function () {
        getResource('http://localhost:3000/posts')
            .then(data => {
                console.log(data)
                if (data.length === 0) {
                    console.log('Список задач пуст')
                    preloader.remove()
                } else {
                    return renderCard(data)
                }
            })
    }
    getPosts()



    const renderCard = response => {
        mainContainer.append(preloader)
        response.forEach(({
                              title,
                              description,
                              id
                          }) => {

            const card = document.createElement("div")
            card.innerHTML = `
        <div class="uk-card uk-card-primary uk-card-small uk-card-body">
        <a href="#" id="${id}"></a>
            <h3 class="uk-card-title">${title}</h3>
            <p>${description}</p>
            <span uk-icon="icon: close" class="uk-position-center-right cross"></span>
        `
            card.classList.add('card')
            preloader.remove()
            mainContainer.append(card)
            //удаляем карточку через крестик
            const cross = card.querySelector('span')
            cross.addEventListener('click', (e) => {
                e.preventDefault()

                card.classList.add('inactive')
                setTimeout(() => card.classList.add('hover'), 600)
                removePost(id)
            })
            //меняем цвет карточки
            card.addEventListener('dblclick',() => {
                const ukCard = card.querySelector('.uk-card')
                setColor(ukCard)
            })
        })
    }
    function setColor (item) {
        let color = changeColor()
        item.style.backgroundColor = color
    }
    function changeColor () {
        const index = Math.floor(Math.random() * colors.length)
        return colors[index]
    }

    const removePost = function (id) {
        deletePost(`http://localhost:3000/posts/${id}`)
            .then(data => {
                console.log(data)
            })
    }
//а ты меня заебал дядя
    const deletePost = async url => {
        const res = await fetch(url, {
            method: 'DELETE'
        })
        return await res.json()
    }



    class ExtremeCard {
        constructor(title, description, date, id, parentSelector) {
            this.title = title
            this.description = description
            this.date = date
            this.id = id
            this.parent = document.querySelector(parentSelector)
        }
        render() {
            const item = document.createElement('div')
            item.classList.add('promotion__timer', 'card')
            item.innerHTML = `
            <div class="ext-card">
            <a href="#" id="${this.id}"></a>
            <h3>${this.title}</h3>
            <span>${this.description}</span>
        
            <div class="title">Осталось времени:</div>
                <div class="timer">
                    <div class="timer__block">
                        <span id="days">12</span>
                        дней
                    </div>
                    <div class="timer__block">
                        <span id="hours">20</span>
                        часов
                    </div>
                    <div class="timer__block">
                        <span id="minutes">56</span>
                        минут
                    </div>
                    <div class="timer__block">
                        <span id="seconds">20</span>
                        секунд
                    </div>
                </div>
                </div>
            `

            let deadline = `${this.date}`

            function getTimeRemaining (endtime) {
                let t = Date.parse(endtime) - Date.parse(new Date()),
                    days = Math.floor((t / (1000 * 60 * 60 * 24))),
                    hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                    minutes = Math.floor(t / (1000 * 60) % 60),
                    seconds = Math.floor((t / 1000 ) % 60);
                return {
                    'total': t,
                    days,
                    hours,
                    minutes,
                    seconds
                };
            }
            function getZero(num) {
                if(num >= 0 && num < 10) {
                    return '0' + num
                }else {
                    return num
                }
            }

            function setClock (selector, endtime) {
                let timer = item.querySelector('.timer'),
                    days = timer.querySelector('#days'),
                    hours = timer.querySelector('#hours'),
                    minutes = timer.querySelector('#minutes'),
                    seconds = timer.querySelector('#seconds'),
                    timeInterval = setInterval(updateClock, 1000);

                updateClock()

                function updateClock () {
                    let t = getTimeRemaining(endtime)
                    days.innerHTML = getZero(t.days)
                    hours.innerHTML = getZero(t.hours)
                    minutes.innerHTML = getZero(t.minutes)
                    seconds.innerHTML = getZero(t.seconds)

                    if(t.total <= 0) {
                        clearInterval(timeInterval)
                    }
                }
            }
            setClock('.timer', deadline)

            this.parent.insertAdjacentElement('afterbegin', item)
            const card = item.querySelector('.ext-card')
            setInterval(() => setColor(card), 1000)
        }
    }
    const testFunction = function () {
        getResource('http://localhost:3000/exposts')
            .then(data => {
                data.forEach(({title, description, date, id}) => {
                    console.log(date)
                    new ExtremeCard(title, description, date, id,'.main-container').render()
                })
            })
    }
    testFunction()


    forms.forEach(item => {
        bindPostData(item)
    })
    const postResource = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: data
        })
        return await res.json()
    }

    function bindPostData(form) {
        form.addEventListener('submit', event => {
            event.preventDefault()

            const formData = new FormData(form)
            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            postResource('http://localhost:3000/posts', json)
                .then(data => {
                    const items = Object.entries(data)
                    const item = [items]
                    console.log(item)
                    renderCard(item)
                })
        })
    }


    //таймер обартного отсчета
    /*let deadline = '2021-09-30'

    function getTimeRemaining (endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor((t / 1000 ) % 60);
        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        };
    }
    function getZero(num) {
        if(num >= 0 && num < 10) {
            return '0' + num
        }else {
            return num
        }
    }

    function setClock (selector, endtime) {
        let timer = document.querySelector('.timer'),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

        updateClock()

        function updateClock () {
            let t = getTimeRemaining(endtime)
            days.innerHTML = getZero(t.days)
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)

            if(t.total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }
    setClock('.timer', deadline)*/

})


