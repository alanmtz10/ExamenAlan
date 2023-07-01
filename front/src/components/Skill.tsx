import { useState } from "react";
import { MdDelete } from "react-icons/md";

const Skill = ({
  skill,
  index,
  createMode,
  onSkillChange,
  onDelete,
}: {
  skill: object;
  index: number;
  createMode: boolean;
  onSkillChange: (index: number, key: string, value: any) => void;
  onDelete: (index: number) => void;
}) => {
  // @ts-ignore
  const [skillLevel, setSkillLevel] = useState(skill.level ?? 1);

  return (
    <>
      <div className="card">
        <div className="card-footer">
          <div className="row justify-content-between align-items-center">
            <div className="col-auto">
              <h6>Habilidad #{index + 1}</h6>
            </div>
            <div className="col-auto">
              {createMode && (
                <button
                  className="btn btn-sm btn-danger"
                  type="button"
                  // @ts-ignore
                  onClick={() => onDelete(skill.id)}
                >
                  <MdDelete /> Eliminar
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6 form-group">
              <label className="form-label">Nombre</label>
              <input
                className="form-control"
                type="text"
                // @ts-ignore
                value={skill.name}
                onChange={(e) => {
                  // @ts-ignore
                  onSkillChange(skill.id, "name", e.target.value);
                }}
              />
            </div>
            <div className="col-6 form-group">
              <label className="form-label">Calificacion: {skillLevel}</label>
              <input
                className="form-range"
                type="range"
                min="1"
                max="5"
                value={skillLevel}
                name="skillName[]"
                onChange={(e) => {
                  setSkillLevel(parseInt(e.target.value));
                  // @ts-ignore
                  onSkillChange(skill.id, "level", parseInt(e.target.value));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skill;
