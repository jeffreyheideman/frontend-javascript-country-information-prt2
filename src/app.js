import axios from "axios";

const inputField = document.getElementById("input-field")
const countryArticle = document.getElementById("country-article")
const submitForm = document.getElementById("submit-form")
const errorMessage = document.getElementById("error-message")



const ENDPOINT = "https://restcountries.com/v2/name/"
const FIELDS = "?fields=name,capital,flags,currencies,subregion,population,languages"
async function fetchCountry() {
    try {
        const response = await axios.get(`${ENDPOINT}${inputField.value}${FIELDS}`)
        const data = response.data
        const country = response.data[0].name
        const population = response.data[0].population
        const subArea = response.data[0].subregion
        const flag = response.data[0].flags.png
        const capital = response.data[0].capital
        const currencies = response.data[0].currencies
        const languages = response.data[0].languages.name
        console.log(data)
        countryArticle.innerHTML = `<img class="flag" src="${flag}" alt="flag of the country" width="50px"><h3>${country}</h3>
        <p>${country} is situated in ${subArea}. It has a population of ${population} people.</p>
        <p>The capital is ${ capital } ${ displayCurrencies(currencies) }</p>`
    } catch (e) {
        console.error(e)
        countryArticle.innerHTML = ``
        errorMessage.innerHTML = `<p>The country does not exist.</p>`
    }
}



function displayCurrencies(currencies) {
    if (currencies.length === 1) {
        return `and you can pay with ${ currencies[0].name }'s`
    } else if (currencies.length === 2) {
        return `and you can pay with ${ currencies[0].name }'s and ${ currencies[1].name }'s`
    }

}

submitForm.addEventListener("submit", (event) => {
    event.preventDefault()
    errorMessage.innerHTML = ``
    fetchCountry(inputField.value)
    inputField.value = ""

})

// function displayLanguages(languages) {
//     if (languages.length <= 1) {
//         return `They speak ${languages[0].name}`
//     } else if (languages.length === 2) {
//         return `They speak ${languages[0]} and ${languages[1]}`
//     } else if (languages.length >= 3) {
//         let nextLanguage = `They speak ${languages[0].name}, `
//
//         for (let i = 1; i < languages.length; i++) {
//             return nextLanguage + languages[i]
//
//         }
//     }
// }
//

