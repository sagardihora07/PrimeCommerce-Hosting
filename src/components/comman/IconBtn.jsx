export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center ${
        outline
          ? "border border-yellow-500 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600"
          : "bg-aqua-500 text-gray-700 hover:bg-gradient-to-br hover:from-green-400 hover:to-aqua-800 shadow-md"
      } cursor-pointer gap-x-2 rounded-full py-2 px-4 font-semibold transition duration-300 ease-in-out ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}
