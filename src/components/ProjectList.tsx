import { FolderIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { Project } from "../types/graphql";
import EmptyState from "./EmptyState";
import ProjectItem from "./ProjectItem";

type ProjectListProps = {
  projects: Array<Project>;
  onRemove: (id: string) => void;
};

const ProjectList: React.FC<ProjectListProps> = ({ projects, onRemove }) => {
  const navigate = useNavigate();

  return (
    <>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-8 pb-10">
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              onRemove={onRemove}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FolderIcon />}
          title="No projects"
          description="Get started by creating a new project."
          buttonTitle="New project"
          onPress={() => navigate("/new-project")}
        />
      )}
    </>
  );
};

export default ProjectList;
