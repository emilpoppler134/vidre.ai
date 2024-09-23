import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import useWarnings from "../../hooks/useWarnings";
import { Project } from "../../types/graphql";
import { Button, SubmitButton } from "../Buttons";
import Warning from "../Warning";

type ResultStepProps = {
  project: Project | null | undefined;
  isGuest: boolean;
};

const ResultStep: React.FC<ResultStepProps> = ({ project, isGuest }) => {
  const navigate = useNavigate();
  const { warnings, pushWarning, clearWarnings } = useWarnings();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(project?.result ?? "");
    } catch {}
  };

  const handleViewInProjects = () => {
    if (isGuest) {
      clearWarnings();
      pushWarning(
        "You need to complete your account to view the project page.",
      );
      return;
    }

    navigate(`/projects/${project?.id}`);
  };

  return (
    <div className="min-h-full flex justify-center items-center">
      <div className="flex flex-col px-4 sm:px-16 py-8 w-full max-w-2xl rounded-lg bg-white">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-3xl py-2">
            Topic: {project?.topic}
          </span>
          <Button onPress={handleCopy}>
            <DocumentDuplicateIcon />
          </Button>
        </div>
        <span className="prose max-w-none text-left mt-4">
          {project?.result}
        </span>

        <SubmitButton onPress={handleViewInProjects} className="mt-12">
          View in projects
        </SubmitButton>
      </div>

      <Warning errors={warnings} />
    </div>
  );
};

export default ResultStep;
