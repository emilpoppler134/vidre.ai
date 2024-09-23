import { gql } from "@apollo/client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
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
import { ButtonGroup, OutlineButton, SubmitButton } from "../Buttons";
import PasswordField from "../PasswordField";
import Radio from "../Radio";
import Select from "../Select";
import TextField from "../TextField";

type CompleteAccountProps = {
  open: boolean;
  onClose: () => void;
};

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

const purposeOptions: string[] = [
  "Just for fun!",
  "Not sure yet",
  "Eventually for work",
];
const workOptions: string[] = [
  "Content Creator",
  "Marketing and Advertising",
  "Education",
  "E-commerce",
  "Corporate Training and Development",
  "Other",
];
const launchOptions: string[] = [
  "Yes, Im on the waitlist!",
  "I've heard about it.",
  "No, but now I do!",
];
const wishlistOptions: Array<{ bool: boolean; label: string }> = [
  { bool: true, label: "Yes" },
  { bool: false, label: "No" },
];

const schema = yup.object().shape({
  name: yup.string().required("This field is required."),
  age: yup.string().required("This field is required."),
  purpose: yup.string().required("This field is required."),
  work: yup.string().nullable(),
  familiarity: yup.string().required("This field is required."),
  wishlist: yup.boolean().required("This field is required."),
  password: yup
    .string()
    .trim()
    .matches(
      passwordRegex,
      "Your password must start with a letter, contain one number and be 6 characters or longer.",
    )
    .required("This field is required."),
  rePassword: yup
    .string()
    .trim()
    .equals(
      [yup.ref("password")],
      "Your passwords don't match. Please try again.",
    )
    .required("This field is required."),
});

type FormFields = yup.InferType<typeof schema>;

const CompleteAccount: React.FC<CompleteAccountProps> = ({ open, onClose }) => {
  const [complete, { loading }] = useCompleteMutation();
  const [refreshToken] = useRefreshTokenMutation();

  const form = useForm<FormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(schema),
  });

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

  const handleClose = () => {
    form.reset();
    onClose();
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
            className="relative transform w-full rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Complete your account
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>To get full access to our services.</p>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Full name
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <TextField
                    name="name"
                    key="name"
                    title="Full Name"
                    form={form}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Age
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <TextField name="age" key="age" title="Age" form={form} />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <p className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Purpose of using the script generator
                </p>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <Select
                    name="purpose"
                    key="purpose"
                    form={form}
                    options={purposeOptions}
                  />
                </div>
              </div>

              {form.watch("purpose") !== "Eventually for work" ? null : (
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <p className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                    What's your field?
                  </p>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <Select
                      key="work"
                      name="work"
                      form={form}
                      options={workOptions}
                    />
                  </div>
                </div>
              )}

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <p className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Are you aware that we're launching a text-to-video AI
                  specifically for short-form content?
                </p>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <Select
                    key="familiarity"
                    name="familiarity"
                    form={form}
                    options={launchOptions}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <p className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Add my account to the waitlist!
                </p>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <Radio
                    key="wishlist"
                    name="wishlist"
                    form={form}
                    options={wishlistOptions}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Password
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <PasswordField
                    key="password"
                    name="password"
                    form={form}
                    title="Password"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Reenter Password
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <PasswordField
                    key="rePassword"
                    name="rePassword"
                    form={form}
                    title="Reenter Password"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
              <ButtonGroup className="mt-5">
                <SubmitButton
                  onPress={form.handleSubmit(handleComplete)}
                  loading={loading}
                >
                  Submit
                </SubmitButton>
                <OutlineButton onPress={handleClose}>Cancel</OutlineButton>
              </ButtonGroup>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default CompleteAccount;
