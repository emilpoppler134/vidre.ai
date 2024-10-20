import { gql } from "@apollo/client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  DocumentDuplicateIcon,
  EllipsisVerticalIcon,
  MicrophoneIcon,
  PencilSquareIcon,
  SparklesIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import client from "../clients/graphql";
import ActivityIndicator from "../components/ActivityIndicator";
import AudioPlayer from "../components/AudioPlayer";
import Breadcrumb from "../components/Breadcrumb";
import {
  Button,
  ButtonGroup,
  GradientButton,
  OutlineButton,
  SubmitButton,
} from "../components/Buttons";
import ConfirmModal from "../components/dialogs/ConfirmModal";
import DangerModal from "../components/dialogs/DangerModal";
import VoiceModal from "../components/dialogs/VoiceModal";
import Layout from "../components/Layout";
import TextArea from "../components/TextArea";
import Warning from "../components/Warning";
import usePlayer from "../hooks/usePlayer";
import useWarnings from "../hooks/useWarnings";
import {
  GenerateSpeechMutationVariables,
  GetProjectQuery,
  RemoveProjectMutationVariables,
  UpdateProjectMutationVariables,
  useGenerateSpeechMutation,
  useGetProjectQuery,
  useRemoveProjectMutation,
  UserType,
  useUpdateProjectMutation,
} from "../types/graphql";
import {
  formatExpiryDate,
  formatUnixDateTime,
} from "../utils/format-timestamp";

gql`
  fragment ProjectFields on Project {
    id
    topic
    config {
      hook {
        value
        id
      }
      retention {
        id
        value
      }
      callToAction {
        id
        value
      }
    }
    result
    name
    script
    speech {
      id
      voice {
        description
        gradient
        name
        id
      }
      created
      expires
    }
    timestamp
  }

  query GetProject($projectId: String) {
    me {
      id
      type
    }

    voices {
      id
      name
      description
      gradient
      sample {
        duration
      }
    }

    project(id: $projectId) {
      ...ProjectFields
    }
  }

  mutation GenerateSpeech($projectId: String, $voiceId: String!) {
    generateSpeech(projectId: $projectId, voiceId: $voiceId) {
      ...ProjectFields
    }
  }

  mutation UpdateProject($projectId: String, $params: UpdateParams!) {
    updateProject(id: $projectId, params: $params) {
      ...ProjectFields
    }
  }

  mutation RemoveProject($projectId: String) {
    removeProject(id: $projectId)
  }
`;

const nameSchema = yup.object().shape({
  name: yup.string().trim().required("This field cannot be empty."),
});
const scriptSchema = yup.object().shape({
  script: yup.string().trim().required("This field cannot be empty."),
});
const generateSchema = yup.object().shape({
  voiceId: yup.string().trim().required("This field cannot be empty."),
});

type NameFormFields = yup.InferType<typeof nameSchema>;
type ScriptFormFields = yup.InferType<typeof scriptSchema>;
type GenerateFormFields = yup.InferType<typeof generateSchema>;

export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { playerRef, playerInfo, playerConfig } = usePlayer();
  const { warnings, setWarnings, clearWarnings } = useWarnings();

  const [editScript, setEditScript] = useState<boolean>(false);
  const [voiceSelectOpen, setVoiceSelectOpen] = useState<boolean>(false);
  const [generateSpeechOpen, setGenerateSpeechOpen] = useState<boolean>(false);
  const [removeOpen, setRemoveOpen] = useState<boolean>(false);

  const { data, loading } = useGetProjectQuery({
    variables: { projectId: id },
  });

  const [generate, { loading: generateLoading }] = useGenerateSpeechMutation();
  const [updateName, { loading: updateNameLoading }] =
    useUpdateProjectMutation();
  const [updateScript, { loading: updateScriptLoading }] =
    useUpdateProjectMutation();
  const [remove, { loading: removeLoading }] = useRemoveProjectMutation();

  const nameForm = useForm<NameFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(nameSchema),
  });
  const scriptForm = useForm<ScriptFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(scriptSchema),
  });
  const generateForm = useForm<GenerateFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(generateSchema),
  });

  const resetForms = (data: GetProjectQuery | undefined) => {
    if (data === undefined) return;

    nameForm.reset({
      name: data.project.name === null ? undefined : data.project.name,
    });
    scriptForm.reset({
      script: data.project.script === null ? undefined : data.project.script,
    });
    generateForm.reset({
      voiceId: data.voices[0].id,
    });
  };

  useEffect(() => resetForms(data), [data]);

  const handleScriptUpdate = async (params: ScriptFormFields) => {
    try {
      const variables: UpdateProjectMutationVariables = {
        projectId: id,
        params,
      };
      await updateScript({ variables });
      setEditScript(false);
    } catch {}
  };

  const handleGenerate = async (params: {
    voiceId: GenerateSpeechMutationVariables["voiceId"];
  }) => {
    setGenerateSpeechOpen(false);

    try {
      const variables: GenerateSpeechMutationVariables = {
        projectId: id,
        voiceId: params.voiceId,
      };
      await generate({ variables });

      await client.refetchQueries({ include: ["GetLayoutInfo"] });
    } catch {}
  };

  const handleRemove = async () => {
    try {
      const variables: RemoveProjectMutationVariables = {
        projectId: id,
      };
      await remove({ variables });

      navigate("/projects", { replace: true });
    } catch {}
  };

  const handleCopy = async () => {
    try {
      const content = scriptForm.getValues("script");
      await navigator.clipboard.writeText(content);
    } catch {}
  };

  const handleOpenGenerateSpeechDialog = () => {
    if (data?.me.type === undefined) return;
    if (data.me.type === UserType.Guest) {
      setWarnings("You need to complete your account to generate speeches.");
      return;
    }

    setGenerateSpeechOpen(true);
  };

  const selectedVoice = data?.voices.find(
    (item) => item.id === generateForm.getValues("voiceId"),
  );

  const breadcrumb = [
    { name: "Projects", href: "/projects" },
    { name: data?.project.name, href: `/projects/${data?.project.id}` },
  ];

  if (loading) {
    return (
      <Layout>
        <ActivityIndicator />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col min-h-full bg-gray-100">
        <div className="px-8 bg-white border-b border-gray-200">
          <Breadcrumb items={breadcrumb} />

          <div className="flex items-center justify-between pt-4 pb-5">
            <div>
              <h3 className="text-xl font-semibold leading-6 text-gray-900">
                {data?.project.name}
              </h3>
              <p className="mt-1 truncate text-sm text-gray-500">
                Topic: {data?.project.topic}
              </p>
            </div>
            <div className="flex items-center">
              <Menu as="div">
                <MenuButton className="p-1 rounded-lg cursor-default hover:bg-black/5 transition-colors">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className="w-52 origin-top-right rounded-xl border border-white/5 bg-drowdown p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                  <MenuItem>
                    <button
                      onClick={() => setRemoveOpen(true)}
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 cursor-default select-none"
                    >
                      <TrashIcon className="size-4 fill-white/75" />
                      Delete
                      <kbd className="ml-auto hidden font-sans text-xs text-white/75 group-data-[focus]:inline">
                        ⌘D
                      </kbd>
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
        <div className="flex-1 px-8 xl:grid xl:grid-cols-4">
          <div className="flex flex-col py-8 space-y-8 xl:col-span-3 xl:pr-8">
            <div className="flex-1 flex flex-col gap-2 p-4 rounded-lg bg-white shadow">
              <div className="flex items-center justify-between">
                <span className="block text-gray-700 text-lg font-medium">
                  Script
                </span>
                <Button onPress={handleCopy}>
                  <DocumentDuplicateIcon />
                </Button>
              </div>

              {editScript ? (
                <>
                  <TextArea
                    form={scriptForm}
                    name="script"
                    placeholder="Write your script here..."
                    autoFocus
                  />
                  <ButtonGroup>
                    <SubmitButton
                      onPress={scriptForm.handleSubmit(handleScriptUpdate)}
                      loading={updateScriptLoading}
                    >
                      Save
                    </SubmitButton>
                    <OutlineButton
                      onPress={() => {
                        scriptForm.reset();
                        setEditScript(false);
                      }}
                    >
                      Cancel
                    </OutlineButton>
                  </ButtonGroup>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setEditScript(true)}
                    className="flex-1 w-full flex items-start justify-start py-3 px-2 rounded-md border-2 border-dotted border-transparent hover:border-gray-200 transition-colors cursor-pointer"
                  >
                    <span className="prose max-w-none text-left">
                      {data?.project.script}
                    </span>
                  </button>
                  <ButtonGroup>
                    <OutlineButton onPress={() => setEditScript(true)}>
                      <PencilSquareIcon />
                      Edit
                    </OutlineButton>
                    <GradientButton onPress={handleOpenGenerateSpeechDialog}>
                      <SparklesIcon />
                      Generate speech
                    </GradientButton>
                    <Button onPress={() => setVoiceSelectOpen(true)}>
                      <span
                        style={
                          selectedVoice && {
                            backgroundImage: selectedVoice.gradient ?? "none",
                          }
                        }
                        className="rounded-full w-5 h-5"
                      ></span>
                      <p className="text-sm text-gray-800">
                        {selectedVoice?.name}
                      </p>
                    </Button>
                  </ButtonGroup>
                </>
              )}
            </div>

            <div className="min-h-52 relative flex flex-col p-4 rounded-lg bg-white shadow">
              <span className="block text-gray-700 text-lg font-medium">
                Speech
              </span>

              {generateLoading ? (
                <ActivityIndicator />
              ) : data?.project.speech === null ? (
                <div className="flex-1 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                  <div className="flex flex-col items-center justify-center">
                    <MicrophoneIcon className="mx-auto h-8 w-8 text-gray-400" />

                    <h3 className="mt-2 text-sm font-semibold text-gray-900">
                      No Speech
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 text-center">
                      Get started by creating a new speech.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col pt-4">
                  <div className="flex-1 flex flex-col gap-2">
                    <span className="text-gray-700">
                      <span>Expires in</span>
                      <span className="ml-2 font-semibold">
                        {formatExpiryDate(data?.project.speech?.expires ?? 0)}
                      </span>
                    </span>
                    <span className="text-gray-700">
                      <span>Created</span>
                      <span className="ml-2">
                        {formatUnixDateTime(data?.project.speech?.created)}
                      </span>
                    </span>
                  </div>

                  <AudioPlayer
                    speech={data?.project.speech}
                    playerRef={playerRef}
                    playerInfo={playerInfo}
                    playerConfig={playerConfig}
                  />
                </div>
              )}
            </div>
          </div>
          <aside className="pb-8 xl:pt-8">
            <div className="h-full p-4 rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 pb-6">
                <span className="block text-gray-700 text-lg font-medium pb-8">
                  Configuration
                </span>

                <div className="flex flex-col gap-8">
                  <div>
                    <span className="block text-sm font-medium text-gray-500">
                      Hook
                    </span>
                    <span className="block mt-1 text-sm text-gray-900">
                      {data?.project.config?.hook?.value}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">
                      Retention
                    </span>
                    <span className="block mt-1 text-sm text-gray-900">
                      {data?.project.config?.retention?.value}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="block text-sm font-medium text-gray-500">
                      Call to action
                    </span>
                    <span className="block mt-1 text-sm text-gray-900">
                      {data?.project.config?.callToAction?.value}
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <span className="block text-sm font-medium text-gray-500">
                  Created
                </span>
                <span className="block mt-1 text-sm text-gray-900">
                  {formatUnixDateTime(data?.project.timestamp)}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <VoiceModal
        open={voiceSelectOpen}
        onClose={() => setVoiceSelectOpen(false)}
        voices={data?.voices}
        name="voiceId"
        form={generateForm}
      />

      <DangerModal
        open={removeOpen}
        onClose={() => setRemoveOpen(false)}
        onSubmit={handleRemove}
        loading={removeLoading}
        title="Remove project"
        description="Are you sure you want to remove this project? This action cannot be undone."
        buttonTitle="Remove"
      />

      <ConfirmModal
        open={generateSpeechOpen}
        onClose={() => setGenerateSpeechOpen(false)}
        onSubmit={generateForm.handleSubmit(handleGenerate)}
        title="Generate speech"
        description="Are you sure you want to generate a speech?"
        buttonTitle="Generate"
      />

      <Warning errors={warnings} onClose={clearWarnings} />
    </Layout>
  );
}
