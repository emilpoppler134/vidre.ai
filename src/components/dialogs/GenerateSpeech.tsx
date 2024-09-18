import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { SparklesIcon } from "@heroicons/react/20/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Voice } from "../../types/graphql";
import { ButtonGroup, Colorfull, OutlineButton } from "../Buttons";
import VoiceSelect from "../VoiceSelect";

type GenerateSpeechProps = {
  voices: Array<Voice>;
  onSubmit: ({ voiceId }: FormFields) => void;
  open: boolean;
  onClose: () => void;
};

const generateSchema = yup.object().shape({
  voiceId: yup.string().trim().required("This field cannot be empty."),
});

type FormFields = yup.InferType<typeof generateSchema>;

const GenerateSpeech: React.FC<GenerateSpeechProps> = ({
  voices,
  onSubmit,
  open,
  onClose,
}) => {
  const form = useForm<FormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(generateSchema),
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog className="relative z-50" open={open} onClose={handleClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform w-full rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Generate speech
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Choose a voice for your speech</p>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <VoiceSelect form={form} name="voiceId" items={voices} />
            </div>
            <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
              <ButtonGroup className="mt-5">
                <Colorfull
                  onPress={form.handleSubmit(onSubmit)}
                  disabled={form.watch("voiceId", undefined) === undefined}
                >
                  <SparklesIcon />
                  Generate
                </Colorfull>
                <OutlineButton onPress={handleClose}>Cancel</OutlineButton>
              </ButtonGroup>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default GenerateSpeech;
