const PeopleTableHeader = () => {
  return (
    <>
      <th>Name</th>
      <th>Birthdate</th>
      <th>Height</th>
      <th>Mass</th>
      <th>Species</th>
      <th>Homeworld</th>
    </>
  );
};

const FilmsTableHeader = () => {
  return (
    <>
      <th>Title</th>
      <th>Episode #</th>
      <th>Director</th>
      <th>Producer</th>
      <th>Release Date</th>
    </>
  );
};

const VehiclesTableHeader = () => {
  return (
    <>
      <th>Name</th>
      <th>Model</th>
      <th>Class</th>
      <th>Manufacturer</th>
      <th>Length</th>
      <th>Max Speed</th>
    </>
  );
};

const SpeciesTableHeader = () => {
  return (
    <>
      <th>Name</th>
      <th>Class</th>
      <th>Designation</th>
      <th>Language</th>
      <th>Homeworld</th>
    </>
  );
};

const PlanetsTableHeader = () => {
  return (
    <>
      <th>Name</th>
      <th>Rotation Period</th>
      <th>Orbital Period</th>
      <th>Diameter</th>
      <th>Climate</th>
      <th>Gravity</th>
    </>
  );
};

const TableHeader = (props) => {
  switch (props.type) {
    case "people":
      return <PeopleTableHeader />;
    case "films":
      return <FilmsTableHeader />;
    case "starships":
    case "vehicles":
      return <VehiclesTableHeader />;
    case "species":
      return <SpeciesTableHeader />;
    case "planets":
      return <PlanetsTableHeader />;
    default:
  }
};

export default TableHeader;
