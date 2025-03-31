import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import "../../../style/vistasAdmin.css"
import CrearMateria from '../materias/crearmateria';
import CrearMateriaArea from '../materias/crearmateriaarea';
const ListaMaterias= ()=> {
    const apiUrl = process.env.REACT_APP_API_ADMIN ;
    const [data,setData] = useState([]);
    const [openModal,setOpenModal]= useState(false);
    const [openModal2,setOpenModal2]= useState(false);
    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData = () =>{
        
        console.log("datos data : ",data);
        fetch(`${apiUrl}MateriaArea`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(response=>response.json())
        .then(result=>{
          console.log("datos traidos : ",result);
          console.log("datos traidos : ",result[0]);
          setData(Object.values(result)|| []);
          //console.log("datos traidos : Object.values(result.listData)",Object.values(result.listData));
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
        ()=>[
            { Header: "ID", accessor: "id" },
            { Header: "Nombre", accessor: "materiaNombre" },
            { Header: "Cursos", accessor: "cursos" },
            { Header: "Area Conocimiento", accessor: "areaNombre" },
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
        ],[]
    );
    const handleNewPrograma=()=>{
        fetchData();
    };
    const handleNewArea=()=>{
        fetchData();
    };
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });
    
    return (  
        <div className="container p-4">
        <div className="header">
          <h3 className="me-auto">Materias Academicas</h3>  
          <button className="nuevo" onClick={()=>setOpenModal(true)} >Nuevo Materia</button>
          <CrearMateria open={openModal} onClose={()=>setOpenModal(false)} onProgramaCreated={handleNewPrograma}/>
          <button className="nuevo" onClick={()=>setOpenModal2(true)} >Materia/Area</button>
          <CrearMateriaArea open={openModal2} onClose={()=>setOpenModal2(false)} onProgramaCreated={handleNewArea}/>
        </div>
        <table {...getTableProps()} border="1" className="tableLista">
        <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} className="tableLista">
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
}

export default ListaMaterias ;