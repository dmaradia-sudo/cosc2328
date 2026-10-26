// HW7 – COSC 2328 – Professor McCurry
// Implemented by: [Diego Maradiaga]

function PokemonCard(props) {
  return (
    <div className="pokemon-card">
      <img src={"https://placehold.co/150x150/4FC3F7/333333?text=" + props.name} />
      <h2>{props.name}</h2>
      <p className="letters">{props.name.length} letters</p>
    </div>
  );
}

function PokemonRoster(props) {
  return (
    <div className="roster">
      {props.pokemon.map(function (p) {
        return <PokemonCard key={p.name} name={p.name} />;
      })}
    </div>
  );
}

function App(props) {
  return (
    <div>
      <h1 className="app-header">
        {`Showing ${props.roster.length} short-named Pokemon, shortest name first`}
      </h1>
      <PokemonRoster pokemon={props.roster} />
    </div>
  );
}

async function loadRoster() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();

    const shortNames = data.results.filter(function (p) {
      return p.name.length <= 6;
    });

    const sortedArray = shortNames.sort(function (a, b) {
      return a.name.length - b.name.length;
    });

    const root = ReactDOM.createRoot(document.querySelector("#root"));
    root.render(<App roster={sortedArray} />);
  } catch (error) {
    document.querySelector("#root").innerHTML =
      '<p class="error-message">Something went wrong loading the roster. Please try again.</p>';
  }
}

loadRoster();