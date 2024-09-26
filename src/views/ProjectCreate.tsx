import { gql } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import client from "../clients/graphql";
import GradientBackground from "../components/GradientBackground";
import Layout from "../components/Layout";
import ConfigurationStep from "../components/sections/ConfigurationStep";
import TopicStep from "../components/sections/TopicStep";
import {
  ConfigurationAlternatives,
  CreateProjectMutationVariables,
  useCreateProjectMutation,
  useGetConfigurationsQuery,
} from "../types/graphql";

gql`
  query GetConfigurations {
    me {
      id
      type
    }

    configurations {
      hooks {
        id
        value
        description
      }
      retentions {
        id
        value
        description
      }
      callToActions {
        id
        value
        description
      }
    }
  }

  mutation CreateProject($topic: String!, $config: CreateConfigParams!) {
    createProject(topic: $topic, config: $config) {
      id
      topic
      result
    }
  }
`;

const schema = yup.object().shape({
  topic: yup.string().required("This field is required."),
  retention: yup.string().required("This field is required."),
  hook: yup.string().required("This field is required."),
  callToAction: yup.string().required("This field is required."),
});

export type FormFields = yup.InferType<typeof schema>;

type StepProps = {
  configurations: ConfigurationAlternatives | undefined;
  form: UseFormReturn<FormFields>;
  loading: boolean;
  step: number;
  changeStep: (value: number | ((prev: number) => number)) => void;
};

const Steps: React.FC<StepProps> = ({
  configurations,
  form,
  loading,
  step,
  changeStep,
}) => {
  switch (step) {
    case 1: {
      return <TopicStep form={form} changeStep={changeStep} />;
    }

    case 2: {
      return (
        <ConfigurationStep
          configurations={configurations}
          form={form}
          loading={loading}
          changeStep={changeStep}
        />
      );
    }

    default: {
      return <span>Something went wrong</span>;
    }
  }
};

export default function ProjectCreate() {
  const navigate = useNavigate();

  const { data } = useGetConfigurationsQuery();
  const [create, { loading }] = useCreateProjectMutation();

  const [step, setStep] = useState<number>(1);

  const form = useForm<FormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      topic: "",
      hook: "",
      retention: "",
      callToAction: "",
    },
  });

  const handleCreate = async (params: FormFields) => {
    const variables: CreateProjectMutationVariables = {
      topic: params.topic,
      config: {
        hook: params.hook,
        retention: params.retention,
        callToAction: params.callToAction,
      },
    };

    try {
      const { data } = await create({ variables });
      await client.refetchQueries({ include: ["ListProjects"] });
      navigate(`/projects/${data?.createProject.id}`);
    } catch {}
  };

  const changeStep = (value: number | ((prev: number) => number)) => {
    setStep(value);
  };

  return (
    <Layout>
      <form onSubmit={form.handleSubmit(handleCreate)} className="h-full">
        <div className="relative w-full h-full flex flex-col items-center">
          <div className="left-0 lg:left-72 top-0 fixed w-full h-full bg-gray-900 -z-50"></div>
          <div className="fixed left-0 lg:left-72 top-0 w-full h-full -z-50">
            <GradientBackground />
          </div>
          <div className="w-full h-full px-4 sm:max-w-xl md:max-w-3xl xl:max-w-4xl">
            <Steps
              step={step}
              changeStep={changeStep}
              configurations={data?.configurations}
              form={form}
              loading={loading}
            />
          </div>
        </div>
      </form>
    </Layout>
  );
}
