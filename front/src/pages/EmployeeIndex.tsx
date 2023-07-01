import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { deleteEmployee, indexEmployees } from "../api/employeeApi";
import Message from "../components/Message";

const EmployeeIndex = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [employees, setEmployees] = useState<any[]>([]);
  const [message, setMessage] = useState<object | null>(null);

  useEffect(() => {
    indexEmployees().then((response) => {
      setEmployees(response.data.data);
      setIsLoading(false);
    });
  }, []);

  const onDeleteEmployee = (id: number) => {
    if (!window.confirm("¿Estas seguro de eliminar este empleado?")) return;

    deleteEmployee(id)
      .then((response) => {
        const newEmployees = employees.filter((employee) => {
          return employee.id != id;
        });

        setEmployees(newEmployees);
        setMessage({
          error: false,
          message: response.data.message,
        });
      })
      .catch((error) => {
        setMessage({
          error: true,
          message: error.response.data.message,
        });
      });
  };

  return (
    <div className="container">
      {message && <Message message={message} />}
      <div className="row mt-3">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="row justify-content-between">
                <div className="col-auto">
                  <h4>Lista de empleados</h4>
                </div>
                <div className="col-auto">
                  <Link className="btn btn-sm btn-success" to="/employee">
                    Registrar empleado
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Correo</th>
                          <th>Puesto</th>
                          <th># Habilidades</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="tbody">
                        {isLoading ? (
                          <IsLoadingRow />
                        ) : (
                          employees.map((employee) => {
                            return (
                              <EmployeeRow
                                key={employee.id}
                                employee={employee}
                                onDeleteEmployee={onDeleteEmployee}
                              />
                            );
                          })
                        )}

                        {employees.length == 0 && !isLoading && (
                          <tr>
                            <td colSpan={6}>
                              <h5 className="text-center">
                                No hay empleados registrados
                              </h5>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmployeeRow = ({
  employee,
  onDeleteEmployee,
}: {
  employee: any;
  onDeleteEmployee: (id: number) => void;
}) => {
  return (
    <tr>
      <td>{employee.id}</td>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.position}</td>
      <td>
        {employee.skills_count +
          ` Habilidad${employee.skills_count > 1 ? "es" : ""}`}
      </td>
      <td>
        <div className="d-flex gap-1">
          <Link
            to={`employee/${employee.id}`}
            className="btn btn-sm btn-primary"
          >
            <AiOutlineEye />
            Ver datos
          </Link>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDeleteEmployee(employee.id)}
          >
            <MdDelete />
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};

const IsLoadingRow = () => {
  return (
    <tr>
      <td colSpan={5}>
        <h5 className="text-center">Cargando empleados...</h5>
      </td>
    </tr>
  );
};

export default EmployeeIndex;
