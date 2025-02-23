import React from "react";
import { useTable } from "react-table";

const AcademicTable = () => {
  const data = React.useMemo(
    () => [
      {
        periodo: "NIVELACIÓN DE CARRERA FEBRERO 2025",
        area: "CIENCIAS E INGENIERÍAS",
        programa: "ELECTRÓNICA Y AUTOMATIZACIÓN",
        promedio: "0.00",
        estado: "ACTIVO",
      },
      {
        periodo: "NIVELACIÓN DE CARRERA FEBRERO 2025",
        area: "CIENCIAS E INGENIERÍAS",
        programa: "GEOLOGÍA",
        promedio: "0.00",
        estado: "ACTIVO",
      },
      {
        periodo: "NIVELACIÓN DE CARRERA FEBRERO 2025",
        area: "CIENCIAS E INGENIERÍAS",
        programa: "INGENIERÍA CIVIL",
        promedio: "0.00",
        estado: "ACTIVO",
      },
      // Agregar más filas según sea necesario
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      { Header: "Período Académico", accessor: "periodo" },
      { Header: "Área de Conocimiento", accessor: "area" },
      { Header: "Programa Académico", accessor: "programa" },
      { Header: "Promedio Aprobación", accessor: "promedio" },
      { Header: "Estado Asociación", accessor: "estado" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="p-4">
      <table {...getTableProps()} className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="border border-gray-400 px-4 py-2 text-left">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-100">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="border border-gray-400 px-4 py-2">
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