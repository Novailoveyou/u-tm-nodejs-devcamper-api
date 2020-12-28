const btnsRipple = document.querySelectorAll('.btn-ripple')
const formLabels = document.querySelectorAll('.form-ctrl__label')

const registerNow = document.getElementById('register-now')
const loginBtn = document.getElementById('login')

function addRipplesToBtns(selectedClass = null) {
  if (selectedClass !== null) {
    selectedClass.forEach((btn) => {
      btn.addEventListener('click', function (e) {
        const xClientPos = e.clientX
        const yClientPos = e.clientY

        const btnTopPos = e.target.offsetTop
        const btnLeftPos = e.target.offsetLeft

        const xInsideBtn = xClientPos - btnLeftPos
        const yInsideBtn = yClientPos - btnTopPos

        const circle = document.createElement('span')
        circle.classList.add('btn__circle')
        circle.style.top = yInsideBtn + 'px'
        circle.style.left = xInsideBtn + 'px'

        this.appendChild(circle)

        setTimeout(() => {
          circle.remove()
        }, 500)
      })
    })
  }
}

formLabels.forEach((label) => {
  label.innerHTML = label.innerText
    .split('')
    .map(
      (letter, idx) =>
        `<span class='label__letter' style='transition-delay:${
          idx * 20
        }ms'>${letter}</span>`
    )
    .join('')
})

const makeReq = async (
  method = 'GET',
  url = '/api/v1/bootcamps',
  headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body = null,
  apiURL = 'https://ipo-cp.ru'
) => {
  const config = {
    method,
    headers,
  }
  if (body !== null) {
    config.body = JSON.stringify(body)
  }
  try {
    const res = await fetch(apiURL + url, config)
    const data = await res.json()
    return data
  } catch (err) {
    return err
  }
}

const msgToClient = (req) => {
  const msgToClient = document.getElementById('msg-to-client')

  if (req.success === false) {
    if (req.error === 'Please provide an email and password') {
      req.error = 'Пожалуйста, предоставьте почту и пароль'
    } else if (req.error === 'Invalid credentials') {
      req.error = 'Неверные учётные данные'
    }

    msgToClient.innerHTML = req.error
    msgToClient.classList.add('show')
    setTimeout(() => {
      msgToClient.classList.remove('show')
    }, 3000)
  } else if (req.success === true) {
    msgToClient.innerHTML = 'Авторизация успешна'
    msgToClient.classList.add('show')
    setTimeout(() => {
      msgToClient.classList.remove('show')
    }, 3000)
  }
}

const loginUser = async (e) => {
  e.preventDefault()

  const userEmail = document.getElementById('user-email')
  const userPassword = document.getElementById('user-password')

  const req = await makeReq(
    'POST',
    '/api/v1/auth/login',
    { Accept: 'application/json', 'Content-Type': 'application/json' },
    {
      email: userEmail.value.toString(),
      password: userPassword.value.toString(),
    }
  )

  if (req.success === true) {
    localStorage.setItem('Bearer Token', `Bearer ${req.token}`)
  }

  msgToClient(req)
}

const getMe = async (e) => {
  e.preventDefault()

  const req = await makeReq('GET', '/api/v1/auth/me', {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('Bearer Token'),
  })
  console.log(req)
}

addRipplesToBtns(btnsRipple)

loginBtn.addEventListener('click', loginUser)

const test1 = document.getElementById('test1')
test1.addEventListener('click', getMe)

// data.ipo.programs
// data.vyshka.programs
// data.psycho.programs
// data.mba.programs

// data.ipo.leads
// data.vyshka.leads
// data.psycho.leads
// data.mba.leads

// data.ipo.leads
// data.vyshka.leads
// data.psycho.leads
// data.mba.leads