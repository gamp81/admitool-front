import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import "../../../style/vistasAdmin.css"
import CrearCurso from '../cursos/crearcurso';
const ListaCursos= ()=> {
    const apiUrl = process.env.REACT_APP_API_ADMIN ;
    const [data,setData] = useState([]);
    const [reco,setReco] = useState([]);
    const [openModal,setOpenModal]= useState(false);
    useEffect(()=>{
        fetchData();
        fetchrReco();
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
    const fetchrReco = () =>{
        
        console.log("datos data : ",data);
        fetch(`${apiUrl}AsignacionCurso/recomendacion-cursos`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(response=>response.json())
        .then(result=>{
          console.log("datos traidos : ",result);
          console.log("datos traidos reco: ",result[0].materias[0]);
          setReco(Object.values(result)|| []);
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
        <div className="overflow-x-auto p-2">
      <table className="w-auto text-xs border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Área de Conocimiento</th>
            <th className="border px-4 py-2">Carreras</th>
            <th className="border px-4 py-2">Materia</th>
            <th className="border px-4 py-2">Estudiantes</th>
            <th className="border px-4 py-2">Cursos Recomendados</th>
            <th className="border px-4 py-2">Cursos Creados</th>
            <th className="border px-4 py-2">Cursos Faltantes</th>
            <th className="border px-4 py-2">Capacidad Sugerida</th>
          </tr>
        </thead>
        <tbody>
          {reco.map((area, index) =>
            area.materias.map((materia, mIndex) => (
              <tr key={`${index}-${mIndex}`} className="border">
                <td className="border px-4 py-2">
                  {mIndex === 0 ? area.areaConocimiento : ""}
                </td>
                <td className="border px-4 py-2">
                  {mIndex === 0 ? area.carreras.join(", ") : ""}
                </td>
                <td className="border px-4 py-2">{materia.materia}</td>
                <td className="border px-4 py-2">{materia.estudiantes}</td>
                <td className="border px-4 py-2">{materia.cursosRecomendados}</td>
                <td className="border px-4 py-2">{materia.cursosCreados}</td>
                <td className="border px-4 py-2">{materia.cursosFaltantes}</td>
                <td className="border px-4 py-2">{materia.capacidadSugerida}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
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