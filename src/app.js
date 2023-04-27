import axios from "axios";

const countryArticle = document.getElementById("country-article")


async function fetchCountry() {
    try {
        const response = await axios.get("https://restcountries.com/v2/all?fields=name,capital,flags,currencies,subregion,population")
        const countries = response.data
        console.log(countries)
        countryArticle.innerText = ``
    }
    catch ( e ) {
        console.error( e )
    }
}

fetchCountry()

