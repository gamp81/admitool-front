import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import "../../../style/vistasAdmin.css"
import CrearPrograma from '../programa/crearprograma';
const ListaProgramas= ()=> {
    const [data,setData] = useState([]);
    const [openModal,setOpenModal]= useState(false);
    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData = () =>{
        const dataObject = {
            0: { id: 1, nombre: "CIENCIAS E INGENIERÍAS", order: 1, professionalCareers: null },
            1: { id: 2, nombre: "CIENCIAS E INGENIERÍAS APLICADAS GRUPO I", order: 2, professionalCareers: null },
            2: { id: 3, nombre: "ARTE", order: 3, professionalCareers: null },
            3: { id: 4, nombre: "EDUCACION COMERCIAL", order: 4, professionalCareers: null }
        };
       /*  setData(Object.values(dataObject) || []); */
        /* setData(Object.values(dataObject));
        console.log("datos traidos : ",dataObject); */
        console.log("datos data : ",data);
        fetch("https://localhost:7016/api/KnowledgeArea/GetAll",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
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
        ()=>[
            { Header: "ID", accessor: "id" },
            { Header: "Nombre", accessor: "name" },
            { Header: "Modalidad", accessor: "order" },
            { Header: "Area Conocimiento", accessor: "descripcion" },
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
          <h3 className="me-auto">Programas Academicos</h3>  
          <button className="nuevo" onClick={()=>setOpenModal(true)} >Nuevo Programa</button>
          <CrearPrograma open={openModal} onClose={()=>setOpenModal(false)} onProgramaCreated={handleNewPrograma}/>
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

export default ListaProgramas ;