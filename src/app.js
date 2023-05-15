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
        const languages = response.data[0].languages
        console.log(data)
        countryArticle.innerHTML = `<div class="title-wrapper"><img class="flag" src="${flag}" alt="flag of the country" width="40px"><h3 class="country-title" >${country}</h3></div>
        <p>${country} is situated in ${subArea}. It has a population of ${population} people.</p>
        <p>The capital is ${ capital } ${ displayCurrencies(currencies) }</p>
        <p>${displayAllLanguages(languages)}</p>`
        countryArticle.style.display = "block";
    } catch (e) {
        console.error(e)
        countryArticle.innerHTML = ``
        errorMessage.innerHTML = `<p>The country does not exist.</p>`
        countryArticle.style.display = "none";
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

function displayAllLanguages(languages) {
    const numLanguages = languages.length

    if (numLanguages === 1) {
        return `They speak ${languages[0].name}`
    } else if (numLanguages === 2) {
        return `They speak ${languages[0].name} and ${languages[1].name}.`
    } else {
        let languageString = "They speak ";

        for (let i = 0; i < numLanguages - 1; i++) {
            languageString += languages[i].name + ", "
        }
        languageString += "and " + languages[numLanguages - 1].name;
        return languageString
    }
}

