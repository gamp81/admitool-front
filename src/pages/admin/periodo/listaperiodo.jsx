import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import "../../../style/vistasAdmin.css"
import CrearPeriodo from '../periodo/crearperiodo';
import CrearPeriodoCarrera from '../periodo/crearperiodoCarrera';
   import {useNavigate} from "react-router-dom"
const ListaPeriodo= ()=> {
    const navigate = useNavigate();
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
        fetch(`${apiUrl}Periodo`,{
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
    const handlePeriodoCarrera=()=>{
        console.log("navigate periodo carrera:");
        navigate("/AdminPeriodosCarreras")
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
            { Header: "Descripcion", accessor: "descripcion" },
            { Header: "Año", accessor: "anio" },
            { 
                Header: "Fecha Vigencia Inicio", 
                accessor: "fechaVigenciaDesde",
                Cell: ({ value }) => formatDate(value)
            },
            { Header: "Fecha Vigencia Fin", accessor: "fechaVigenciaHasta",Cell: ({ value }) => formatDate(value) },
            { Header: "Fecha Registro", accessor: "fechaRegistro",Cell: ({ value }) => formatDate(value) },
            { Header: "Estado", accessor: "estado" },
            { Header: "Tipo", accessor: "tipo" },
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
          <h3 className="me-auto">Periodos Academicos</h3>  
          <button className="nuevo" onClick={()=>setOpenModal(true)} >Nuevo Periodo</button>
          <CrearPeriodo open={openModal} onClose={()=>setOpenModal(false)} onProgramaCreated={handleNewPrograma}/>
          <button className="nuevo" onClick={()=>handlePeriodoCarrera()} >Carreras / Periodo</button>
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

export default ListaPeriodo ;