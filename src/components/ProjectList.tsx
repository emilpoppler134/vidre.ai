import { Project } from "../types/graphql";
import ProjectItem from "./ProjectItem";

type ProjectListProps = {
  projects: Array<Project>;
};

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-8 pb-10">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
