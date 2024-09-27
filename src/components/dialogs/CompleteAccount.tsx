import { gql } from "@apollo/client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  BuildingOffice2Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import unwrap from "ts-unwrap";
import * as yup from "yup";
import client from "../../clients/graphql";
import {
  CompleteMutationVariables,
  useCompleteMutation,
  useRefreshTokenMutation,
} from "../../types/graphql";
import { passwordRegex } from "../../utils/constants";
import { setAccessToken } from "../../utils/token-storage";
import { GlossyButton, SubmitButton } from "../Buttons";
import { FriendsIcon, InstagramIcon, TiktokIcon, YoutubeIcon } from "../Icons";
import { GridSelect } from "../Select";
import { InputField } from "../TextFields";

gql`
  mutation Complete($params: CompleteParams!) {
    complete(params: $params)
  }

  mutation RefreshToken {
    refreshAccessToken {
      token
    }
  }
`;

export const purposeOptions = [
  { value: "Personal user", icon: "😊" },
  { value: "Student", icon: "👨‍🎓" },
  { value: "Content Creator", icon: "🎬" },
  { value: "Marketer or Advertiser", icon: "📈" },
  { value: "Corporate Trainer ", icon: "🧑‍💼" },
  { value: "Other..." },
];
export const familiarityOptions = [
  { value: "Search engine", icon: <MagnifyingGlassIcon /> },
  { value: "TikTok", icon: <TiktokIcon /> },
  { value: "Youtube", icon: <YoutubeIcon /> },
  { value: "Instagram", icon: <InstagramIcon /> },
  { value: "From a friend", icon: <FriendsIcon /> },
  { value: "From work", icon: <BuildingOffice2Icon /> },
];
export const ageOptions = [
  { value: "0 - 17" },
  { value: "18 - 24" },
  { value: "24 - 34" },
  { value: "35 - 44" },
  { value: "45 - 54" },
  { value: "55 - 64" },
  { value: "65+" },
];

const schema = yup.object().shape({
  purpose: yup
    .string()
    .oneOf(purposeOptions.map((item) => item.value))
    .required(),
  familiarity: yup
    .string()
    .oneOf(familiarityOptions.map((item) => item.value))
    .required(),
  age: yup
    .string()
    .oneOf(ageOptions.map((item) => item.value))
    .required(),
  name: yup.string().trim().required("Name cannot be empty."),
  password: yup
    .string()
    .trim()
    .matches(
      passwordRegex,
      "Your password must start with a letter, contain one number and be 6 characters or longer.",
    )
    .required("Password cannot be empty."),
  rePassword: yup
    .string()
    .trim()
    .equals(
      [yup.ref("password")],
      "Your passwords don't match. Please try again.",
    )
    .required("Reentered password cannot be empty."),
});

type FormFields = yup.InferType<typeof schema>;

type StepsProps = {
  step: number;
  form: UseFormReturn<FormFields>;
  loading: boolean;
  handleCancel: () => void;
  handleNext: () => void;
};

const Steps: React.FC<StepsProps> = ({
  step,
  form,
  loading,
  handleCancel,
  handleNext,
}) => {
  switch (step) {
    case 1: {
      return (
        <>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">
              Which of the following roles best describes you?
            </h1>
            <span className="block mt-2 text-sm text-white/75">
              <span>
                Your feedback will help us personalize your experience.
              </span>
              <span className="ml-2 font-semibold text-white">
                Select 1 only.
              </span>
            </span>
          </div>

          <div className="flex-1">
            <GridSelect
              key="purpose"
              form={form}
              name="purpose"
              options={purposeOptions}
            />
          </div>

          <div className="flex justify-end">
            <div className="flex items-center gap-4">
              <GlossyButton onPress={handleCancel} className="px-6">
                Skip
              </GlossyButton>
              <SubmitButton
                onPress={handleNext}
                className="px-6"
                disabled={form.watch("purpose") === undefined}
              >
                Next
              </SubmitButton>
            </div>
          </div>
        </>
      );
    }

    case 2: {
      return (
        <>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">
              How did you hear about Vidre.ai?
            </h1>
            <span className="block mt-2 text-sm text-white/75">
              <span>
                Your feedback will help us personalize your experience.
              </span>
              <span className="ml-2 font-semibold text-white">
                Select 1 only.
              </span>
            </span>
          </div>

          <div className="flex-1">
            <GridSelect
              key="familiarity"
              form={form}
              name="familiarity"
              options={familiarityOptions}
            />
          </div>

          <div className="flex justify-end">
            <div className="flex items-center gap-4">
              <GlossyButton onPress={handleCancel} className="px-6">
                Back
              </GlossyButton>
              <SubmitButton
                onPress={handleNext}
                className="px-6"
                disabled={form.watch("familiarity") === undefined}
              >
                Next
              </SubmitButton>
            </div>
          </div>
        </>
      );
    }

    case 3: {
      return (
        <>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">What is your age?</h1>
            <span className="block mt-2 text-sm text-white/75">
              <span>
                Your feedback will help us personalize your experience.
              </span>
              <span className="ml-2 font-semibold text-white">
                Select 1 only.
              </span>
            </span>
          </div>

          <div className="flex-1">
            <GridSelect key="age" form={form} name="age" options={ageOptions} />
          </div>

          <div className="flex justify-end">
            <div className="flex items-center gap-4">
              <GlossyButton onPress={handleCancel} className="px-6">
                Back
              </GlossyButton>
              <SubmitButton
                onPress={handleNext}
                className="px-6"
                disabled={form.watch("age") === undefined}
              >
                Next
              </SubmitButton>
            </div>
          </div>
        </>
      );
    }

    case 4: {
      return (
        <>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">
              Create your account
            </h1>
            <span className="block mt-2 text-sm text-white/75">
              <span>Fill the fields to complete your account</span>
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-6 w-full max-w-lg mx-auto">
            <InputField
              key="name"
              form={form}
              name="name"
              title="Full name"
              placeholder="John Doe"
            />

            <InputField
              key="password"
              type="password"
              form={form}
              name="password"
              title="Password"
              placeholder="********"
            />

            <InputField
              key="rePassword"
              type="password"
              form={form}
              name="rePassword"
              title="Reenter password"
              placeholder="********"
            />
          </div>

          <div className="flex justify-end">
            <div className="flex items-center gap-4">
              <GlossyButton onPress={handleCancel} className="px-6">
                Back
              </GlossyButton>
              <SubmitButton
                key="submit"
                type="submit"
                loading={loading}
                disabled={!form.formState.isValid}
                className="px-6"
              >
                Finish
              </SubmitButton>
            </div>
          </div>
        </>
      );
    }

    default: {
      return <span>Something went wrong</span>;
    }
  }
};

type CompleteAccountProps = {
  open: boolean;
  onClose: () => void;
};

const CompleteAccount: React.FC<CompleteAccountProps> = ({ open, onClose }) => {
  const [step, setStep] = useState<number>(1);

  const [complete, { loading }] = useCompleteMutation();
  const [refreshToken] = useRefreshTokenMutation();

  const form = useForm<FormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      purpose: undefined,
      familiarity: undefined,
      age: undefined,
      name: "",
      password: "",
      rePassword: "",
    },
  });

  const resetForms = () => {
    if (open) return;
    setStep(1);
    form.reset();
  };

  useEffect(() => resetForms(), [open]);

  const handleComplete = async ({ rePassword, ...params }: FormFields) => {
    const variables: CompleteMutationVariables = { params };

    try {
      await complete({ variables });

      const { data } = await refreshToken();
      const token = unwrap(data?.refreshAccessToken?.token);
      setAccessToken(token);

      client.refetchQueries({ include: ["GetLayoutInfo"] });
      onClose();
    } catch {}
  };

  const handleCancel = () => {
    if (step <= 1) {
      onClose();
      return;
    }
    setStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (step >= 4) return;
    setStep((prev) => prev + 1);
  };

  return (
    <Dialog className="relative z-50" open={open} onClose={onClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform w-full rounded-lg bg-gray-500/70 ring-2 ring-white/50 backdrop-blur-md text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="relative flex flex-col">
              <div className="flex justify-end pb-2">
                <button type="button" onClick={onClose} className="p-4 group">
                  <XMarkIcon className="w-6 h-6 text-white/80 group-hover:text-white/60 transition-colors" />
                </button>
              </div>

              <form
                onSubmit={form.handleSubmit(handleComplete)}
                className="flex-1 min-h-[460px] flex flex-col gap-8 px-6 pb-6"
              >
                <Steps
                  step={step}
                  form={form}
                  loading={loading}
                  handleCancel={handleCancel}
                  handleNext={handleNext}
                />
              </form>

              <div className="absolute bottom-6 left-6">
                <span className="flex items-center gap-2 text-md font-semibold text-white/50">
                  <span className="text-white">{step}</span>
                  <span>/</span>
                  <span>4</span>
                </span>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default CompleteAccount;
