

function onSubmit() {
    try {
        validateForm()
        calculate()
    } catch(e) {
        console.error(e.message)
    } finally {
        return false
    }
}

function validateForm() {
    cleanValidationErrors()
    let isValid = true

    document.querySelectorAll(".input-container").forEach((container) => {
        const input = container.querySelector("input")
        const [isExtraValidationOk, message] = validateType(input)
        if(input.value !== "" && isExtraValidationOk) return

        isValid = false
        container.querySelector("input").classList.add("error")            
        if(input.value === "") {
            const tag = container.querySelector("label").innerHTML
            container.querySelector(".error-message").innerHTML = `${tag} requerido`
        } else {
            container.querySelector(".error-message").innerHTML = message    
        }
    })

    if(!isValid) throw new Error("Hay un error en el form")
}

function validateType(input) {
    const type = input.getAttribute("type")
    switch(type) {
        case "email":
            return [validarEmail(input.value), "Email inválido"]
        case "number": 
            return validateNumber(input.value)
        default:
            return [true, ""]
    }
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email);
}

function validateNumber(num) {
    num = Number(num)
    let isValid = true
    let message = ""
    if(num <= 0) {
        isValid = false
        message = "Tiene que ser más grande que 0"
    }
    if(num !== Math.floor(num)) {
        isValid = false
        if(message !== "") {
            message += " y tiene que ser un número entero"
        } else {
            message = "Tiene que ser un número entero"
        }
    }
    return [isValid, message]
}

// function validateNumber(num) {
//     num = Number(num)
//     if(num <= 0) return [false, "Tiene que ser más grande que 0"]
//     if(num !== Math.floor(num)) return [false, "Tiene que ser un número entero"]
//     return [true, ""]
// }

function cleanValidationErrors() {
    document.querySelectorAll("input").forEach((input) => {
        input.classList.remove("error")
    })
    document.querySelectorAll(".error-message").forEach((errorField) => {
        errorField.innerHTML = ""
    })

}

function calculate() {
    const cantidad = parseInt(document.querySelector("#cantidad input").value)
    document.querySelector("#result span").innerHTML = (cantidad * 5000).toString()
}