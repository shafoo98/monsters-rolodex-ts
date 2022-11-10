import "./App.css";
import { useState, useEffect, ChangeEvent } from "react";

import { fetchData } from "./utils/data.utils";

import SearchBox from "./components/search-box/search-box-component";
import CardList from "./components/card-list/card.component";

export interface Monster {
  id: string;
  name: string;
  email: string;
}

function App() {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await fetchData<Monster[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setMonsters(users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredMonsters(
      monsters.filter((monster) =>
        monster.name.toLowerCase().includes(searchBoxValue.toLowerCase())
      )
    );
  }, [monsters, searchBoxValue]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchBoxValue(e.target.value);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        placeholder="search monsters"
        onChangeHandler={onSearchChange}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}

export default App;
