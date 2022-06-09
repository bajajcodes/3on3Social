import { SearchIcon } from "icons";

function SearchForm() {
  return (
    <section className=" mb-4 p-1 lg:p-4 border-2 border-solid bg-white">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-[max-content_1fr]"
      >
        <button>
          <SearchIcon />
        </button>
        <input
          className={
            "w-full font-medium placeholder:font-medium active:border-none focus:border-none active:outline-none focus:outline-none overflow-hidden text-ellipsis whitespace-nowrap"
          }
          name="search"
          type="text"
          placeholder="Search Posts, People, anything"
          required
        />
      </form>
    </section>
  );
}

export { SearchForm };
