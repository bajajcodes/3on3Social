function FormButton({ text }) {
  return (
    <button className="bg-primary-cta text-white font-semibold w-full py-2 px-4 hover:bg-complementary">
      {text}
    </button>
  );
}

export { FormButton };
