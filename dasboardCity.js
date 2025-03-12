// In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:

const usersEndPoint = 'https://boolean-spec-frontend.vercel.app/freetestapi/users'

// Nome completo della città e paese da  /destinations?search=[query]
// (result.name, result.country, nelle nuove proprietà city e country).

// Il meteo attuale da /weathers?search={query}
// (result.temperature e result.weather_description nella nuove proprietà temperature e weather).

// Il nome dell’aeroporto principale da /airports?search={query}
// (result.name nella nuova proprietà airport).

// Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.


// Note del docente
// Scrivi la funzione getDashboardData(query), che deve:
// Essere asincrona (async).
// Utilizzare Promise.all() per eseguire più richieste in parallelo.
// Restituire una Promise che risolve un oggetto contenente i dati aggregati.
// Stampare i dati in console in un messaggio ben formattato.
// Testa la funzione con la query "london"

async function call(url) {
    const result = await fetch(url)
    const data = await result.json()
    return data
}

async function getDashboardData(query) {
    const promise1 = call(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`)
    const promise2 = call(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`)
    const promise3 = call(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`)

    const result = await Promise.all([promise1, promise2, promise3])
    console.log(result)

    return {
        city: result[0][0].name,
        country: result[0][0].country,
        temperature: result[1][0].temperature,
        weather: result[1][0].weather_description,
        airport: result[2][0].name
    }
}

(async () => {
    const dashboardCity = await getDashboardData('london')
    console.log(`${dashboardCity.city} is in ${dashboardCity.country}. 
    Today there are ${dashboardCity.temperature} degrees and the weather is ${dashboardCity.weather}.
    The main airport is ${dashboardCity.airport}.`)
})()