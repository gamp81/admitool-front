import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import "../../../style/vistasAdmin.css"

import CrearPeriodoCarrera from '../periodo/crearperiodoCarrera';
const ListaPeriodoCarrera= ()=> {
    
    const apiUrl = process.env.REACT_APP_API_ADMIN ;
    const [data,setData] = useState([]);
    const [fila,setFila] = useState({});
    const [openModal,setOpenModal]= useState(false);
    const [openModalPeriodo,setOpenModalPeriodo]= useState(false);
    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData = () =>{
        
        console.log("datos data : ",data);
        fetch(`${apiUrl}PeriodoCarrera`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(response=>response.json())
        .then(result=>{
          console.log("datos traidos : ",result);
          //console.log("datos traidos : ",result[0].name);
          setData(result|| []);
          
        }).catch(error=>console.log("Error al obtener los datos",error));
    }
    const handleEdit = (row) => {
        console.log("Modificar:", row);
        setFila(row);
        setOpenModalPeriodo(true);
        // Aquí puedes abrir un modal o navegar a la pantalla de edición
    };
    
    const handleDelete = (row) => {
        console.log("Eliminar:", row);
        // Aquí puedes realizar la lógica de eliminación
    };
    //const fechaFormateada = data.fechaRegistro.split("T")[0];
    const columns = React.useMemo(
        ()=>[
            { Header: "ID", accessor: "id" },
            { Header: "Periodo", accessor: "periodoDescripcion" },
            { Header: "Carrera", accessor: "carreraNombre" },
            { Header: "Vulnerable", accessor: "cupoVulnerable" },
            { Header: "Merito Academico", accessor: "cupoMeritoAcademico" },
            { Header: "UltimoBachiller", accessor: "cupoUltimoBachiller" },
            { Header: "General", accessor: "cupoGenera" },
            { Header: "Vulnerable Aceptado", accessor: "cupoVulnerableAceptado" },
            { Header: "M. Academico Aceptado", accessor: "cupoMeritoAcademicoAceptado" },
            { Header: "U. Bachiller Aceptado", accessor: "cupoUltimoBachillerAceptado" },
            { Header: "General Aceptado", accessor: "cupoGeneralAceptado" },
          /*   { Header: "Estado", accessor: "estado" },
            { Header: "Tipo", accessor: "tipo" }, */
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
                        {/* <button className="nuevo" onClick={()=>setOpenModalPeriodo(true)} >Nuevo Periodo</button> */}
                        {/* <button className="nuevo" onClick={()=>handleEdit(row.original)} >Nuevo Periodo</button> */}
                    </div>
                ),
            }
        ],[]
    );
    // Función para formatear la fecha
    const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    };
    const handleNewPrograma=()=>{
        fetchData();
    };
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });
    
    return (  
        <div className="container p-4">
        <div className="header">
          <h3 className="me-auto">Carreras / Periodos Academicos</h3>  
          <button className="nuevo" onClick={()=>setOpenModalPeriodo(true)} >Nuevo Carrera / Periodo</button>
          
          <CrearPeriodoCarrera row={fila} open={openModalPeriodo} onClose={()=>setOpenModalPeriodo(false)} onProgramaCreated={handleNewPrograma}/>
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

export default ListaPeriodoCarrera ;