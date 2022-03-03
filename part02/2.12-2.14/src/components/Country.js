import Temperature from './Temperature';

const Country = (props) => {
  const languages = [];
  for (const [abbreviation, language] of Object.entries(props.languages)) {
    languages.push(language);
  }

  return (
    <div key={props.cca2}>
      <h1 key="name">{props.name}</h1>
      <p key="capital">capital {props.capital}</p>
      <p key="area">area {props.area}</p>
      <h2 key="languages">languages</h2>
      <ul key="language-list">
        {
          languages.map(language => (<li key={language.slice(0,4)}>{language}</li>))
        }
      </ul>
      <img src={props.flag} key="flag" height="100" />
      <h2 key="weather">Weather in {props.capital}</h2>
      <Temperature capital={props.capital} cca2={props.cca2} />
    </div>
  )
  }

  export default Country;