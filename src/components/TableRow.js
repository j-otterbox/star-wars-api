const PeopleTableRow = (props) => {
  return (
    <tr>
      <td>{props.data.name}</td>
      <td>{props.data.birth_year}</td>
      <td>{props.data.height} cm</td>
      <td>{props.data.mass} kg</td>
      <td>{props.data.species}</td>
      <td>{props.data.homeworld}</td>
    </tr>
  );
};

const FilmsTableRow = (props) => {
  return (
    <tr>
      <td>{props.data.title}</td>
      <td>{props.data.episode_id}</td>
      <td>{props.data.director}</td>
      <td>{props.data.producer}</td>
      <td>{props.data.release_date}</td>
    </tr>
  );
};

const VehiclesTableRow = (props) => {
  return (
    <tr>
      <td>{props.data.name}</td>
      <td>{props.data.model}</td>
      <td>{props.data.vehicle_class || props.data.starship_class}</td>
      <td>{props.data.manufacturer}</td>
      <td>{props.data.length} m </td>
      <td>{props.data.max_atmosphering_speed} km/h</td>
    </tr>
  );
};

const SpeciesTableRow = (props) => {
  return (
    <tr>
      <td>{props.data.name}</td>
      <td>{props.data.classification}</td>
      <td>{props.data.designation}</td>
      <td>{props.data.language}</td>
      <td>{props.data.homeworld}</td>
    </tr>
  );
};

const PlanetsTableRow = (props) => {
  return (
    <tr>
      <td>{props.data.name}</td>
      <td>{props.data.rotation_period} hrs</td>
      <td>{props.data.orbital_period} days</td>
      <td>{props.data.diameter} km</td>
      <td>{props.data.climate}</td>
      <td>{props.data.gravity}</td>
    </tr>
  );
};

const TableRow = (props) => {
  switch (props.type) {
    case "people":
      return <PeopleTableRow data={props.data} />;
    case "films":
      return <FilmsTableRow data={props.data} />;
    case "starships":
    case "vehicles":
      return <VehiclesTableRow data={props.data} />;
    case "species":
      return <SpeciesTableRow data={props.data} />;
    case "planets":
      return <PlanetsTableRow data={props.data} />;
    default:
  }
};

export default TableRow;
