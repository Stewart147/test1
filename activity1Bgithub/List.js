 const List = (props) => {
    const objectVar = props.objectVar;
    const name = props.name;

    return (
        <div className="list">
            <h2> { name } </h2>
            {objectVar.map((obj) => (
                <div className="wrap" key={obj.id}>
                  <h2>{obj.name}</h2>
                  <p>Role: {obj.role}</p>
                </div>
            )) }
        </div>
    );
}

export default List; 