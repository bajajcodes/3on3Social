import { People as PeopleCard } from "../people/People";

function PeopleCards({ peoples, isRowWise = false }) {
  return (
    <div>
      {peoples.length > 0 &&
        peoples.map((people) => (
          <PeopleCard key={people.uid} info={people} isRowWise={isRowWise} />
        ))}
    </div>
  );
}

export { PeopleCards };
