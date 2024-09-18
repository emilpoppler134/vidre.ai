type ExploreSectionProps = {
  setOpen: () => void;
};

const ExploreSection: React.FC<ExploreSectionProps> = ({ setOpen }) => {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-3xl sm:flex sm:flex-col sm:items-center">
        <h2 className="text-base font-semibold leading-8 text-primary-600 sm:text-center">
          Explore
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl sm:text-center">
          Everything you need to create engaging scripts!
        </p>
        <p className="mt-6 mb-8 text-lg leading-8 text-gray-600 sm:text-center">
          Our AI uses the HRC framework to create scripts tailored for
          short-form content, designed to stand out and go viral. Create an
          account today and enjoy free voiceovers at no cost!
        </p>
        <button
          onClick={setOpen}
          className="sm:mx-auto rounded-md bg-primary-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          Get started
        </button>
      </div>
    </div>
  );
};

export default ExploreSection;
