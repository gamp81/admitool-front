import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import "../../../style/vistasAdmin.css"
import CrearCurso from '../cursos/crearcurso';
const ListaCursos= ()=> {
    const apiUrl = process.env.REACT_APP_API_ADMIN ;
    const [data,setData] = useState([]);
    const [openModal,setOpenModal]= useState(false);
    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData = () =>{
        
        console.log("datos data : ",data);
        fetch(`${apiUrl}Curso`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(response=>response.json())
        .then(result=>{
          console.log("datos traidos : ",result);
          console.log("datos traidos : ",result[0]);
          setData(Object.values(result)|| []);
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
        ()=>[
            { Header: "ID", accessor: "id" },
            { Header: "Estado", accessor: "estado" },
            { Header: "Area Conocimiento", accessor: "areaConocimiento" },
            { Header: "Periodo", accessor: "periodo" },
            { Header: "Materia", accessor: "materia" },
            { Header: "Dia", accessor: "diaSemana" },
            { Header: "Hora Inicio", accessor: "horaInicio" },
            { Header: "Profesor", accessor: "profesor" },
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
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });
    
    return (  
        <div className="container p-4">
        <div className="header">
          <h3 className="me-auto">Cursos</h3>  
          <button className="nuevo" onClick={()=>setOpenModal(true)} >Nuevo Curso</button>
          <CrearCurso open={openModal} onClose={()=>setOpenModal(false)} onProgramaCreated={handleNewPrograma}/>
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

export default ListaCursos ;