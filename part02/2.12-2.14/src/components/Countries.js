import { useState } from 'react';
import Country from './Country';

const Countries = (props) => {
    const list = (
        props.list
            .filter(country => country.name.common.includes(props.filter))
    );

    const [showSingle, setShowSingle] = useState(false);
    const [countriesToShow, setCountriesToShow] = useState(list);

    const showSingleCountry = (countryName) => {
        setShowSingle(true);
        setCountriesToShow(list.filter(country => country.name.common === countryName));
    }
    
    if (list.length === 0) {
        return (
            <div>
                No matches!
            </div>
        )
    } else if (list.length === 1) {
        return (
            <div>
                {
                    list
                        .map(country => (
                            <Country
                                name={country.name.common}
                                capital={country.capital}
                                area={country.area}
                                languages={country.languages}
                                cca2={country.cca2}
                                flag={country.flags.svg}
                            />
                        )
                    )
                }
            </div>
        )
    } else if (list.length <= 10 && list.length > 0) {
        if (showSingle) {
            return (
                <div>
                    {
                        countriesToShow
                            .map(country => (
                                <Country
                                    name={country.name.common}
                                    capital={country.capital}
                                    area={country.area}
                                    languages={country.languages}
                                    cca2={country.cca2}
                                    flag={country.flags.svg}
                                />
                            )
                        )
                    }
                    <button onClick={() => setShowSingle(!showSingle)}>show all</button>
                </div>
            )
        }

        return (
            list
                .map(country => (
                    <div key={country.cca2}>
                        {country.name.common}
                        <button onClick={() => showSingleCountry(country.name.common)}>show</button>
                    </div>
                )
            )
        )
    } else {
        return (
            <div>
                Too many matches, specify another filter!
            </div>
        )
    }
}

export default Countries;