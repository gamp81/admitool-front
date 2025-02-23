import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import "../../../style/areas.css"
import CrearArea from '../area/create';

const AcademicTable = () => {
const [data,setData] = useState([]);
const [openModal,setOpenModal]= useState(false);
  useEffect(()=>{
    fetchData();
  },[]);
  const fetchData = ()=>{
    fetch("https://localhost:7016/api/KnowledgeArea/GetAll",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        /* "Authorization": `Bearer ${token}` */
      }
    }).then(response=>response.json())
    .then(result=>{
      console.log("datos traidos : ",result.listData);
      console.log("datos traidos : ",result.listData[0].name);
      setData(Object.values(result.listData)|| []);
      console.log("datos traidos : Object.values(result.listData)",Object.values(result.listData));
    }).catch(error=>console.log("Error al obtener los datos",error));
  }
  const handleEdit = (row) => {
    console.log("Modificar:", row);
    // Aquí puedes abrir un modal o navegar a la pantalla de edición
};

const handleDelete = (row) => {
    console.log("Eliminar:", row);
    // Aquí puedes realizar la lógica de eliminación
};

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Nombre", accessor: "name" },
      { Header: "Orden", accessor: "order" },
      {
        Header: "Acciones",
        accessor: "actions",
        Cell: ({ row }) => (
            <div className="">
                <button onClick={() => handleEdit(row.original)} className="modificar" >
                    Modificar
                </button>
                <button onClick={() => handleDelete(row.original)} className="eliminar">
                    Eliminar
                </button>
            </div>
        ),
    }
    ],
    []
  );
  const handleNewArea = () => {
    fetchData(); // Recargar la lista desde el backend después de agregar un registro
};

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="container p-4">
      <div className="header">
        <h3 className="me-auto">Areas de Conocimiento</h3>  
        <button className="nuevo"  onClick={()=>setOpenModal(true)}>Nueva Area</button>  
        <CrearArea open={openModal} onClose={()=>setOpenModal(false)} onAreaCreated={handleNewArea} />
      </div>
      <table {...getTableProps()} border="1" className="tableCrear">
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} className="tableCrear">
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()} style={{ padding: "10px" }}>
                                    {cell.render("Cell")}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  );
};

export default AcademicTable;