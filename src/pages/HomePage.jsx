import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



function HomePage() {

    const [ countryInfo, setCountryInfo ] = useState(null)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const response = await axios.get('https://ih-countries-api.herokuapp.com/countries')
            console.log('aquí debería recibir la lista de países procedente de la API', response)
            setCountryInfo(response.data)
            // console.log('Aquí deberían llegar las banderas', countryInfo.alpha2Code)
        } catch (error) {
            console.log(error)
        }
    }

    if (countryInfo === null) {
        return <h3>... buscando</h3>
      }
     
    return (
<>
    <div className='container' style={{maxHeight: '90vh'}} overflow= {{scroll}}>
        <h1 style={{fontSize: '24px'}}>WikiCountries: Your Guide to the World</h1>
    </div>

    {countryInfo.map((eachCountry, i) => {
        return (
    <div key={i} className="list-group">
        <Link to={`${eachCountry.alpha3Code}`}>
            <img src={`https://flagpedia.net/data/flags/icon/72x54/${eachCountry.alpha2Code.toLowerCase()}.png`} width={50} />
            <p className="list-group-item list-group-item-action">{eachCountry.name.official}</p>
        </Link> 
    </div> 
        )
    })}
   
</>
    
   
)}

export default HomePage;
