import { useEffect, useState } from "react";
import {
  AiOutlineHome,
  AiOutlineOrderedList,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsCalendarDate, BsFillPersonFill } from "react-icons/bs";
import { FiSave } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";
import { TbHierarchy3 } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { showEmployee, storeEmployee } from "../api/employeeApi";
import Message from "../components/Message";
import Skill from "../components/Skill";
import employeeScheme from "../validations/employee";

const EmployeRegister = () => {
  const [message, setMessage] = useState<object | null>(null);
  const [skills, setSkills] = useState<any>([]);
  const [employee, setEmployee] = useState<any>({});
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    showEmployee(parseInt(id)).then((response) => {
      setEmployee(response.data.data);
      setSkills(response.data.data.skills);
    });
  }, []);

  const addSkill = () => {
    setSkills([
      ...skills,
      {
        id: new Date().getTime(),
        name: "",
        level: 1,
      },
    ]);
  };

  const saveEmployee = async () => {
    try {
      const validateData = employeeScheme.validateSync({
        ...employee,
        skills,
      });

      storeEmployee(validateData)
        .then((response) => {
          setMessage({
            error: false,
            message: response.data.message,
          });

          setEmployee({});
          setSkills([]);
        })
        .catch((error) => {
          setMessage({
            error: true,
            message: error.response.data.message ?? "Unkown error",
          });
        });
    } catch (error: any) {
      setMessage({
        error: true,
        message: error.message,
      });
    }
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="row justify-content-between align-items-center">
                <div className="col-auto">
                  <h4>Registro de empleado</h4>
                </div>
                <div className="col-auto">
                  <Link className="btn btn-sm btn-success" to="/">
                    <span className="icon me-1">
                      <AiOutlineOrderedList />
                    </span>
                    Lista de empleados
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body">
              {message && <Message message={message} />}
              <div className={`row ${message ? "" : "mt-5"}`}>
                <div className="col-12">
                  <form action="">
                    <div className="row">
                      <div className="col-4">
                        <div className="input-group mb-3">
                          <label className="input-group-text">
                            <span className="icon me-1">
                              <BsFillPersonFill />
                            </span>
                            Nombre
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={employee.name ?? ""}
                            onChange={(e) => {
                              setEmployee({
                                ...employee,
                                name: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="input-group mb-3">
                          <label className="input-group-text">
                            <span className="icon me-1">
                              <MdAlternateEmail />
                            </span>
                            Correo electronico
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            value={employee.email ?? ""}
                            onChange={(e) => {
                              setEmployee({
                                ...employee,
                                email: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="input-group mb-3">
                          <label className="input-group-text">
                            <span className="icon me-1">
                              <TbHierarchy3 />
                            </span>
                            Puesto
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={employee.position ?? ""}
                            onChange={(e) => {
                              setEmployee({
                                ...employee,
                                position: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="input-group mb-3">
                          <label className="input-group-text">
                            <span className="icon me-1">
                              <BsCalendarDate />
                            </span>
                            Fecha de nacimiento
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            value={employee.birthdate ?? ""}
                            onChange={(e) => {
                              setEmployee({
                                ...employee,
                                birthdate: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-group mb-3">
                          <label className="input-group-text">
                            <span className="icon me-1">
                              <AiOutlineHome />
                            </span>
                            Domicilio
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={employee.home ?? ""}
                            onChange={(e) => {
                              setEmployee({
                                ...employee,
                                home: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="row justify-content-end">
                      {!id && (
                        <div className="col-auto">
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={addSkill}
                          >
                            <AiOutlinePlus /> Agregar habilidad
                          </button>
                        </div>
                      )}
                    </div>
                    <br />
                    <div className="d-flex flex-column gap-3">
                      {skills.map((skill: object, index: number) => {
                        return (
                          <Skill
                            // @ts-ignore
                            createMode={!id}
                            key={skill.id}
                            index={index}
                            skill={skill}
                            onSkillChange={(i, key, value) => {
                              const newSkills = skills.map(
                                (skill: object, index: number) => {
                                  // @ts-ignore
                                  if (skill.id != i) return skill;

                                  return {
                                    ...skill,
                                    [key]: value,
                                  };
                                }
                              );

                              setSkills(newSkills);
                            }}
                            onDelete={(i) => {
                              const newSkills = skills.filter(
                                (skill: object, index: number) => {
                                  // @ts-ignore
                                  return skill.id != i;
                                }
                              );

                              console.log("newSkills", newSkills);

                              setSkills(newSkills);
                            }}
                          />
                        );
                      })}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {!id && (
              <div className="card-footer">
                <div className="row">
                  <div className="col-auto">
                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={saveEmployee}
                    >
                      <FiSave /> Guardar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeRegister;
