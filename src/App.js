import './App.css';
import React, { useCallback, useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';




function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearch] = useState("");
  const [selectedData, setSelectedData] = useState({});


  const generateData = useCallback(() => {
    const data = [];
    for (let i = 0; i < 50000; i++) {
      const item = {
        id: i,
        active: true,
        firstName: 'Lorem ' + i,
        lastName: 'Laura ' + i
      };
      data.push(item);
    }
    const listData = [{ id: "Id", firstName: "first Name", lastName: "last Name", active: true }, ...data].filter((list) => searchTerm ? list.firstName.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) : true)
    setData(listData);
  }, [searchTerm])

  useEffect(() => {
    generateData()
  }, [generateData])


  const Row = ({ index, style, isScrolling }) => {
    return (
      <div key={data[index].id} className={data[index].id === "Id" ? "header" : ""} style={{
        ...style,
        border: "1px solid #ccc",
        cursor: "pointer",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "3rem",
          padding: "0.5rem",
          alignItems: "center",
        }}
        >
          <div>{data[index].id}</div>
          <div>{data[index].firstName}</div>
          <div>{data[index].lastName}</div>

          {
            data[index].id === "Id"
              ?
              "Action" :
              <button className='view' onClick={() => setSelectedData(data[index])}>Get</button>
          }
        </div>
      </div >
    )
  }


  const renderData = () => {
    return <FixedSizeList
      height={600}
      className={"list__container"}
      itemCount={data.length}
      itemSize={50}
      useIsScrolling
    >
      {Row}
    </FixedSizeList>
  }

  return (
    <div className='app__container'>
      <div className={"container"}>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "0.5rem" }}>
          <span>Data length : {data.length}</span>
          <input type={"text"} onChange={(event) => setSearch(event.target.value)} className="search__name" placeholder='Search First Name' />
        </div>
        {renderData()}
        {
          Object.keys(selectedData).length ?
            <div style={{ width: "50vw", paddingTop: "1rem" }}>
              <code>
                {JSON.stringify(selectedData)}
              </code>
            </div> : null
        }
      </div>
    </div>
  );
}

export default App;
