import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import axios from 'axios';
import APIOptions from './api'

const Search = ({onSearchChange}) => {
    const [search,setSearch] = useState(null);

    const handleOnChange = searchData =>{
        setSearch(searchData);
        onSearchChange(searchData)
    }

    const loadOptions = async inputValue =>{
        return await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${inputValue}`,APIOptions)
            .then(res=>{
                return{
                    options: res.data.data.map(city=>{
                        return {
                            value:`${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`
                        }
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return(
        <>
            <AsyncPaginate
                placeholder='Search for city'
                debounceTimeout={600}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadOptions}
                className = 'searchBar'
            />
        </>
    )
}

export default Search;