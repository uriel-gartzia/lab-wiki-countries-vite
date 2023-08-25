import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CountryDetails() {

     const [ countryInfo, setCountryInfo ] = useState(null)

     const params = useParams()
     console.log('info del pais', params)

     useEffect(() => {
          getData()
     }, [params.countryId])
     

     const getData = async () => {
          try {
               const response = await axios.get(`https://ih-countries-api.herokuapp.com/countries/${params.countryId}`)
               console.log('aquí la respuesta de la llamada', response)

               setCountryInfo(response.data)
               console.log('valor del estado después de modificarlo', countryInfo.alpha2Code)
          } catch (error) {
               console.log(error)
          }
     }

     if (countryInfo === null) {
          return <h3>Loading...</h3>
     }

return(
<>
     <h3>Country Details</h3>

     <img src={`https://flagpedia.net/data/flags/icon/72x54/${countryInfo.alpha2Code.toLowerCase()}.png`} width={100} alt="flag" />
     <h2>{countryInfo.name.official}</h2>
     <p>Capital {countryInfo.capital}</p>
     <hr />
     <p>Area {countryInfo.area} km2</p>
     <p>Borders</p>
     {countryInfo.borders.map((eachBorder) => {
          return (

               <Link to={`/${eachBorder}`}>
                    <li>{eachBorder}</li>
               </Link>

               
          )
     })}



</>
     

)
   


}

export default CountryDetails;
